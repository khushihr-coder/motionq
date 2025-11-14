"use client"

import { useCallback, useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    FaceMesh?: any
  }
}

type MPPoint = { x: number; y: number; z?: number }

const MOUTH_LEFT = 61
const MOUTH_RIGHT = 291
const MOUTH_TOP = 13
const MOUTH_BOTTOM = 14

let MEDIAPIPE_BASE = "https://cdn.jsdelivr.net/npm/@mediapipe"

async function loadMediaPipeUMD() {
  if (window.FaceMesh) return
  const jsDelivrBase = "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.5.1675469249"
  const unpkgBase = "https://unpkg.com/@mediapipe/face_mesh@0.5.1675469249"

  const inject = (src: string, baseForAssets: string) =>
    new Promise<void>((resolve, reject) => {
      const prevProcess = (window as any).process
      const prevRequire = (window as any).require
      const prevModule = (window as any).module
      const prevExports = (window as any).exports
      const prevDefine = (window as any).define
      ;(window as any).process = undefined
      ;(window as any).require = undefined
      ;(window as any).module = undefined
      ;(window as any).exports = undefined
      ;(window as any).define = undefined

      const s = document.createElement("script")
      s.src = src
      s.async = true
      s.defer = true
      s.crossOrigin = "anonymous"
      s.onload = () => {
        ;(window as any).process = prevProcess
        ;(window as any).require = prevRequire
        ;(window as any).module = prevModule
        ;(window as any).exports = prevExports
        ;(window as any).define = prevDefine
        MEDIAPIPE_BASE = baseForAssets.replace("/face_mesh", "")
        resolve()
      }
      s.onerror = (e) => {
        ;(window as any).process = prevProcess
        ;(window as any).require = prevRequire
        ;(window as any).module = prevModule
        ;(window as any).exports = prevExports
        ;(window as any).define = prevDefine
        reject(e)
      }
      document.head.appendChild(s)
    })

  try {
    await inject(`${jsDelivrBase}/face_mesh.js`, jsDelivrBase)
  } catch {
    await inject(`${unpkgBase}/face_mesh.js`, unpkgBase)
  }
  if (!window.FaceMesh) throw new Error("[v0] MediaPipe FaceMesh UMD not available")
}

export default function FaceMeshTracker() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const faceMeshRef = useRef<any | null>(null)
  const rafIdRef = useRef<number | null>(null)

  const [running, setRunning] = useState(false)
  const [modelReady, setModelReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        await loadMediaPipeUMD()
        if (cancelled) return
        const fm = new window.FaceMesh({
          locateFile: (file: string) => `${MEDIAPIPE_BASE}/face_mesh/${file}`,
        })
        fm.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.6,
          minTrackingConfidence: 0.6,
        })
        fm.onResults((results: any) => {
          drawResults(results)
          emitEvents(results)
        })
        faceMeshRef.current = fm
        setModelReady(true)
      } catch (e) {
        console.log("[v0] Failed to init FaceMesh UMD:", e)
      }
    })()
    return () => {
      cancelled = true
      faceMeshRef.current = null
    }
  }, [])

  const setupCamera = useCallback(async () => {
    if (!videoRef.current || !faceMeshRef.current) return
    const v = videoRef.current
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false })
      v.srcObject = stream
      v.muted = true
      await v.play()
      setRunning(true)

      const loop = async () => {
        if (!running && rafIdRef.current == null) {
          // stopped
          return
        }
        if (faceMeshRef.current && v.readyState >= 2) {
          try {
            await faceMeshRef.current.send({ image: v })
          } catch (err) {
            // swallow to keep loop going, prevents "require" env crashes
          }
        }
        rafIdRef.current = window.requestAnimationFrame(loop)
      }
      rafIdRef.current = window.requestAnimationFrame(loop)
    } catch (err) {
      console.log("[v0] getUserMedia failed:", err)
    }
  }, [running])

  const stopCamera = useCallback(() => {
    setRunning(false)
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    const v = videoRef.current
    if (v && v.srcObject) {
      ;(v.srcObject as MediaStream).getTracks().forEach((t) => t.stop())
      v.srcObject = null
    }
  }, [])

  function ensureCanvasSizeToVideo() {
    const v = videoRef.current
    const c = canvasRef.current
    if (!v || !c) return
    const vw = v.videoWidth || 640
    const vh = v.videoHeight || 480
    if (c.width !== vw || c.height !== vh) {
      c.width = vw
      c.height = vh
    }
  }

  function drawResults(results: any) {
    const c = canvasRef.current
    const ctx = c?.getContext("2d")
    if (!c || !ctx) return

    ensureCanvasSizeToVideo()
    ctx.clearRect(0, 0, c.width, c.height)

    const faces = results.multiFaceLandmarks || []
    if (!faces.length) return
    const pts = faces[0] as MPPoint[]

    ctx.fillStyle = "rgba(0, 255, 0, 0.9)"
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i]
      const x = p.x * c.width
      const y = p.y * c.height
      ctx.beginPath()
      ctx.arc(x, y, 1.4, 0, Math.PI * 2)
      ctx.fill()
    }

    // Mouth landmarks emphasized
    ctx.fillStyle = "rgba(255, 200, 0, 0.95)"
    for (const idx of [MOUTH_LEFT, MOUTH_RIGHT, MOUTH_TOP, MOUTH_BOTTOM]) {
      const p = pts[idx]
      ctx.beginPath()
      ctx.arc(p.x * c.width, p.y * c.height, 2.2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  let lastSmileAt = 0
  const SMILE_COOLDOWN_MS = 600

  function emitEvents(results: any) {
    const faces = results.multiFaceLandmarks || []
    if (!faces.length) return
    const pts = faces[0] as MPPoint[]

    try {
      window.dispatchEvent(new CustomEvent("face-landmarks", { detail: { landmarks: pts } }))
    } catch {}

    const w = dist2D(pts[MOUTH_LEFT], pts[MOUTH_RIGHT])
    const h = dist2D(pts[MOUTH_TOP], pts[MOUTH_BOTTOM])
    if (w > 0 && h > 0) {
      const ratio = w / h
      const threshold = 2.0
      const now = performance.now()
      if (ratio > threshold && now - lastSmileAt > SMILE_COOLDOWN_MS) {
        lastSmileAt = now
        try {
          window.dispatchEvent(new CustomEvent("smile-detected", { detail: { ratio } }))
        } catch {}
      }
    }
  }

  function dist2D(a?: MPPoint, b?: MPPoint) {
    if (!a || !b) return 0
    const dx = a.x - b.x
    const dy = a.y - b.y
    return Math.hypot(dx, dy)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={running ? stopCamera : setupCamera}
          className="px-3 py-2 rounded-md bg-primary text-primary-foreground"
          aria-pressed={running}
        >
          {running ? "Disable Camera" : "Enable Camera"}
        </button>
        <span className="text-sm opacity-80">{modelReady ? "Model ready" : "Loading model..."}</span>
      </div>

      <div className="relative" style={{ width: 640, height: 480 }} aria-live="polite">
        <video ref={videoRef} autoPlay playsInline muted className="w-[640px] h-[480px] bg-black" />
        <canvas ref={canvasRef} className="absolute left-0 top-0 w-[640px] h-[480px] pointer-events-none" />
      </div>
    </div>
  )
}
