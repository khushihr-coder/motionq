"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type Landmark = { x: number; y: number; z?: number }

const MP_VERSION = "0.10.0"
const BUNDLE_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}/vision_bundle.mjs`
const WASM_BASE = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}/wasm`
const MODEL_URL = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}/face_landmarker.task`

export default function FaceLandmarkerTracker() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const landmarkerRef = useRef<any>(null)
  const rafRef = useRef<number | null>(null)
  const [ready, setReady] = useState(false)
  const [running, setRunning] = useState(false)

  // Safely stop stream and loop
  const stopAll = useCallback(() => {
    setRunning(false)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    const v = videoRef.current
    if (v?.srcObject instanceof MediaStream) {
      v.srcObject.getTracks().forEach((t) => t.stop())
      v.srcObject = null
    }
  }, [])

  useEffect(() => {
    return () => {
      stopAll()
      try {
        landmarkerRef.current?.close?.()
      } catch {}
    }
  }, [stopAll])

  const ensureSizes = () => {
    const v = videoRef.current
    const c = canvasRef.current
    if (!v || !c) return
    // Match canvas to actual video size for correct scaling
    const w = v.videoWidth || 640
    const h = v.videoHeight || 480
    if (c.width !== w || c.height !== h) {
      c.width = w
      c.height = h
    }
  }

  const dist = (a: Landmark, b: Landmark) => {
    const dx = a.x - b.x
    const dy = a.y - b.y
    return Math.hypot(dx, dy)
  }

  const drawPoints = (ctx: CanvasRenderingContext2D, pts: Landmark[]) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = "rgba(0, 200, 120, 0.9)"
    const w = ctx.canvas.width
    const h = ctx.canvas.height
    const r = Math.max(1, Math.floor(Math.min(w, h) * 0.003)) // scale radius
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i]
      // FaceLandmarker returns normalized coords [0..1]
      const x = p.x * w
      const y = p.y * h
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const processLoop = useCallback(() => {
    const v = videoRef.current
    const c = canvasRef.current
    const landmarker = landmarkerRef.current
    if (!v || !c || !landmarker || !running) return

    ensureSizes()
    const now = performance.now()
    const result = landmarker.detectForVideo(v, now)

    if (result?.faceLandmarks?.length) {
      const face = result.faceLandmarks[0] as Landmark[]

      // Draw all 468 points
      const ctx = c.getContext("2d")
      if (ctx) drawPoints(ctx, face)

      // Emit 468 landmarks each frame
      window.dispatchEvent(new CustomEvent("face-landmarks", { detail: { landmarks: face } }))

      // Smile detection via mouth width-to-height ratio
      // Mouth corners: 61 (left), 291 (right); mouth vertical: 13 (upper), 14 (lower)
      const l = face[61],
        r = face[291],
        u = face[13],
        d = face[14]
      if (l && r && u && d) {
        const width = dist(l, r)
        const height = dist(u, d)
        const ratio = height > 0 ? width / height : 0
        // Simple threshold; tuned for normalized coordinates
        const SMILE_THRESHOLD = 1.8
        if (ratio > SMILE_THRESHOLD) {
          window.dispatchEvent(new CustomEvent("smile-detected", { detail: { ratio } }))
        }
      }
    }

    rafRef.current = requestAnimationFrame(processLoop)
  }, [running])

  const initModel = useCallback(async () => {
    if (landmarkerRef.current) return
    try {
      const vision = await import(/* @vite-ignore */ BUNDLE_URL)
      const fileset = await vision.FilesetResolver.forVisionTasks(WASM_BASE)
      landmarkerRef.current = await vision.FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: MODEL_URL },
        runningMode: "VIDEO",
        numFaces: 1,
        minFaceDetectionConfidence: 0.5,
        minFacePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: false,
      })
      setReady(true)
    } catch (e) {
      console.log("[v0] Failed to init FaceLandmarker:", e)
      setReady(false)
    }
  }, [])

  const startCamera = useCallback(async () => {
    stopAll()
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      })
      const v = videoRef.current!
      v.srcObject = stream
      v.playsInline = true
      v.muted = true
      await v.play()
      await initModel()
      setRunning(true)
      rafRef.current = requestAnimationFrame(processLoop)
    } catch (e) {
      console.log("[v0] Failed to start camera:", e)
    }
  }, [initModel, processLoop, stopAll])

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={startCamera}
          className="px-3 py-2 rounded-md bg-primary text-primary-foreground"
          aria-label="Enable Camera"
        >
          {running ? "Restart Camera" : "Enable Camera"}
        </button>
        <span className="text-sm text-muted-foreground">
          {ready ? "Model ready" : "Loading model on first start..."}
        </span>
      </div>

      <div className="relative" style={{ maxWidth: 640 }}>
        <video ref={videoRef} className="block rounded-md" style={{ width: "100%", height: "auto" }} />
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      </div>
    </div>
  )
}
