"use client"

import { useTranslation } from 'react-i18next';
import { useCallback, useState, useRef, useEffect } from "react"
import { Navigation } from "../../components/navigation"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import Link from "next/link"
import { Eye, Download, Camera, CameraOff, Target, RotateCcw } from "lucide-react"

// Declare MediaPipe on Window
declare global {
  interface Window {
    FaceMesh?: any
  }
}

// Calibration point interface
interface CalibrationPoint {
  x: number
  y: number
  screenX: number
  screenY: number
}

export default function DemoPage() {
  const { t } = useTranslation()
  const [isWebcamActive, setIsWebcamActive] = useState(false)
  const [webcamError, setWebcamError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mpActive, setMpActive] = useState(false)
  const [faceDetected, setFaceDetected] = useState(false)
  const [isCalibrating, setIsCalibrating] = useState(false)
  const [calibrationComplete, setCalibrationComplete] = useState(false)
  const [currentCalibrationPoint, setCurrentCalibrationPoint] = useState(0)
  const [eyeTrackingActive, setEyeTrackingActive] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const faceMeshRef = useRef<any | null>(null)
  const rafRef = useRef<number | null>(null)

  // Calibration data
  const calibrationPoints = useRef<CalibrationPoint[]>([])
  const calibrationGridPoints = [
    { x: 0.2, y: 0.2 },
    { x: 0.8, y: 0.2 },
    { x: 0.5, y: 0.5 },
    { x: 0.2, y: 0.8 },
    { x: 0.8, y: 0.8 },
  ]

  // Eye tracking parameters
  const irisHistory = useRef<{ x: number, y: number }[]>([])
  const SMOOTHING_FRAMES = 5
  const cursorDotRef = useRef<HTMLDivElement | null>(null)

  // Iris landmark indices from MediaPipe
  const LEFT_IRIS = [474, 475, 476, 477]
  const RIGHT_IRIS = [469, 470, 471, 472]

  // Get iris position from landmarks
  const getIrisPosition = (landmarks: any[]) => {
    const leftIrisX = LEFT_IRIS.reduce((sum, i) => sum + landmarks[i].x, 0) / LEFT_IRIS.length
    const leftIrisY = LEFT_IRIS.reduce((sum, i) => sum + landmarks[i].y, 0) / LEFT_IRIS.length

    const rightIrisX = RIGHT_IRIS.reduce((sum, i) => sum + landmarks[i].x, 0) / RIGHT_IRIS.length
    const rightIrisY = RIGHT_IRIS.reduce((sum, i) => sum + landmarks[i].y, 0) / RIGHT_IRIS.length

    // Average both eyes
    return {
      x: (leftIrisX + rightIrisX) / 2,
      y: (leftIrisY + rightIrisY) / 2
    }
  }

  // Smooth iris coordinates
  const smoothIrisPosition = (x: number, y: number) => {
    irisHistory.current.push({ x, y })
    if (irisHistory.current.length > SMOOTHING_FRAMES) {
      irisHistory.current.shift()
    }

    const avgX = irisHistory.current.reduce((sum, p) => sum + p.x, 0) / irisHistory.current.length
    const avgY = irisHistory.current.reduce((sum, p) => sum + p.y, 0) / irisHistory.current.length

    return { x: avgX, y: avgY }
  }

  // Map iris to screen coordinates using calibration data
  const mapIrisToScreen = (irisX: number, irisY: number) => {
    if (calibrationPoints.current.length < 5) {
      // Fallback to simple mapping if not calibrated
      return {
        x: irisX * window.innerWidth,
        y: irisY * window.innerHeight
      }
    }

    // Use calibration points for mapping
    let closestPoint = calibrationPoints.current[0]
    let minDist = Infinity

    for (const point of calibrationPoints.current) {
      const dist = Math.sqrt(
        Math.pow(point.x - irisX, 2) + Math.pow(point.y - irisY, 2)
      )
      if (dist < minDist) {
        minDist = dist
        closestPoint = point
      }
    }

    // Apply sensitivity multiplier
    const sensitivity = 2.5
    const centerX = 0.5
    const centerY = 0.5

    const offsetX = (irisX - centerX) * sensitivity
    const offsetY = (irisY - centerY) * sensitivity

    return {
      x: Math.max(0, Math.min(window.innerWidth - 1, window.innerWidth / 2 + offsetX * window.innerWidth)),
      y: Math.max(0, Math.min(window.innerHeight - 1, window.innerHeight / 2 + offsetY * window.innerHeight))
    }
  }

  // Draw face mesh
  const drawFaceMesh = useCallback((results: any) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const video = videoRef.current
    if (!video) return

    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
      setFaceDetected(false)
      if (cursorDotRef.current) {
        cursorDotRef.current.style.display = 'none'
      }
      return
    }

    const landmarks = results.multiFaceLandmarks[0]
    setFaceDetected(true)

    // Get iris position for eye tracking
    if (eyeTrackingActive && !isCalibrating) {
      const iris = getIrisPosition(landmarks)
      const smoothed = smoothIrisPosition(iris.x, iris.y)
      const screen = mapIrisToScreen(smoothed.x, smoothed.y)

      // Update cursor dot position
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${screen.x}px`
        cursorDotRef.current.style.top = `${screen.y}px`
        cursorDotRef.current.style.display = 'block'
      }
    }

    if (!isCalibrating) {
      // Draw iris landmarks (highlighted in RED)
      ctx.fillStyle = "rgba(255, 0, 0, 0.9)"
      const irisIndices = [...LEFT_IRIS, ...RIGHT_IRIS]
      for (let i of irisIndices) {
        if (landmarks[i]) {
          const point = landmarks[i]
          ctx.beginPath()
          ctx.arc(point.x * canvas.width, point.y * canvas.height, 4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw all other landmark points (GREEN)
      ctx.fillStyle = "rgba(0, 255, 0, 0.6)"
      for (let i = 0; i < landmarks.length; i++) {
        if (!irisIndices.includes(i) && landmarks[i]) {
          const point = landmarks[i]
          ctx.beginPath()
          ctx.arc(point.x * canvas.width, point.y * canvas.height, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw face oval (GREEN lines)
      ctx.strokeStyle = "rgba(0, 255, 0, 0.5)"
      ctx.lineWidth = 2

      const faceOval = [
        10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288,
        397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136,
        172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109, 10
      ]

      for (let i = 0; i < faceOval.length - 1; i++) {
        const p1 = landmarks[faceOval[i]]
        const p2 = landmarks[faceOval[i + 1]]
        if (p1 && p2) {
          ctx.beginPath()
          ctx.moveTo(p1.x * canvas.width, p1.y * canvas.height)
          ctx.lineTo(p2.x * canvas.width, p2.y * canvas.height)
          ctx.stroke()
        }
      }
    }
  }, [eyeTrackingActive, isCalibrating])

  // Start MediaPipe FaceMesh
  const startFaceMesh = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return

    if (typeof window === 'undefined' || !window.FaceMesh) {
      setWebcamError("MediaPipe library not loaded. Please refresh the page.")
      return
    }

    try {
      const faceMesh = new window.FaceMesh({
        locateFile: (file: string) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/${file}`
        }
      })

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true, // Enable iris tracking
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      })

      faceMesh.onResults(drawFaceMesh)

      faceMeshRef.current = faceMesh
      setMpActive(true)

      const processFrame = async () => {
        const video = videoRef.current
        const fm = faceMeshRef.current

        if (video && fm && video.readyState === 4) {
          try {
            await fm.send({ image: video })
          } catch (e) {}
        }

        rafRef.current = requestAnimationFrame(processFrame)
      }

      processFrame()
    } catch (error) {
      setWebcamError("Failed to start face detection")
    }
  }, [drawFaceMesh])

  // Stop FaceMesh
  const stopFaceMesh = useCallback(() => {
    setMpActive(false)
    setFaceDetected(false)
    setEyeTrackingActive(false)

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    if (faceMeshRef.current) {
      faceMeshRef.current.close()
      faceMeshRef.current = null
    }

    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
    }

    if (cursorDotRef.current) {
      cursorDotRef.current.style.display = 'none'
    }
  }, [])

  // Start calibration process
  const startCalibration = async () => {
    if (!faceDetected) {
      alert("Please make sure your face is detected before calibrating!")
      return
    }

    setIsCalibrating(true)
    setCurrentCalibrationPoint(0)
    calibrationPoints.current = []
  }

  // Record calibration point
  const recordCalibrationPoint = useCallback(() => {
    if (!faceMeshRef.current || !faceDetected) return

    const canvas = canvasRef.current
    if (!canvas) return

    const gridPoint = calibrationGridPoints[currentCalibrationPoint]

    calibrationPoints.current.push({
      x: gridPoint.x,
      y: gridPoint.y,
      screenX: gridPoint.x * window.innerWidth,
      screenY: gridPoint.y * window.innerHeight
    })

    if (currentCalibrationPoint < calibrationGridPoints.length - 1) {
      setCurrentCalibrationPoint(currentCalibrationPoint + 1)
    } else {
      setIsCalibrating(false)
      setCalibrationComplete(true)
      setEyeTrackingActive(true)
    }
  }, [currentCalibrationPoint, faceDetected])

  // Reset calibration
  const resetCalibration = () => {
    setIsCalibrating(false)
    setCalibrationComplete(false)
    setEyeTrackingActive(false)
    setCurrentCalibrationPoint(0)
    calibrationPoints.current = []
    irisHistory.current = []
  }

  // Handle camera toggle
  const handleWebcamToggle = async () => {
    if (isWebcamActive) {
      stopFaceMesh()
      resetCalibration()
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      setIsWebcamActive(false)
      setWebcamError(null)
    } else {
      setIsLoading(true)
      setWebcamError(null)

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user",
          },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          streamRef.current = stream
          setIsWebcamActive(true)

          videoRef.current.onloadedmetadata = () => {
            setTimeout(() => {
              startFaceMesh()
            }, 500)
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "NotAllowedError") {
            setWebcamError("Camera access denied. Please allow camera permissions.")
          } else if (error.name === "NotFoundError") {
            setWebcamError("No camera found. Please connect a webcam.")
          } else {
            setWebcamError("Failed to access camera.")
          }
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Auto-record calibration points
  useEffect(() => {
    if (isCalibrating && faceDetected) {
      const timer = setTimeout(() => {
        recordCalibrationPoint()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isCalibrating, currentCalibrationPoint, faceDetected, recordCalibrationPoint])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopFaceMesh()
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stopFaceMesh])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Eye tracking cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed w-4 h-4 bg-red-500 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
        style={{ display: 'none' }}
      />

      {/* Hero Section */}
      <section className="py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance" suppressHydrationWarning>
                {t('demo.hero.title')}
                <span className="text-primary"> {t('demo.hero.titleHighlight')}</span>
              </h1>
              <p className="mx-auto max-w-[800px] text-muted-foreground text-xl md:text-2xl text-pretty" suppressHydrationWarning>
                {t('demo.hero.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            
            {/* ==== DEMO VIDEO SECTION (NEW) ==== */}
            <div className="mb-8 flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4">Demo Video</h3>
              <video
                src="/assets/motionq-demo.mp4"
                controls
                className="rounded-lg border w-full max-w-2xl aspect-video bg-black"
                poster=""
              />
            </div>

            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Video Container */}
                  <div className="relative aspect-video bg-background rounded-lg border border-border/50 overflow-hidden">
                    {/* Video Feed */}
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ transform: "scaleX(-1)" }}
                    />

                    {/* FaceMesh Canvas Overlay */}
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{ transform: "scaleX(-1)" }}
                    />

                    {/* Calibration Overlay */}
                    {isCalibrating && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center space-y-4">
                          {calibrationGridPoints.map((point, index) => {
                            const screenX = point.x * 100
                            const screenY = point.y * 100
                            return (
                              <div
                                key={index}
                                className={`absolute w-8 h-8 rounded-full border-4 ${
                                  index === currentCalibrationPoint
                                    ? 'bg-red-500 border-red-600 animate-pulse'
                                    : index < currentCalibrationPoint
                                    ? 'bg-green-500 border-green-600'
                                    : 'bg-gray-400 border-gray-500'
                                }`}
                                style={{
                                  left: `${screenX}%`,
                                  top: `${screenY}%`,
                                  transform: 'translate(-50%, -50%)'
                                }}
                              />
                            )
                          })}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-4 rounded-lg">
                            <h3 className="text-2xl font-bold mb-2">Calibrating...</h3>
                            <p className="text-lg">Look at the red dot</p>
                            <p className="text-sm text-gray-300 mt-2">
                              Point {currentCalibrationPoint + 1} of {calibrationGridPoints.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Status Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {mpActive && (
                        <div className="bg-primary/90 text-primary-foreground px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          FaceMesh Active
                        </div>
                      )}
                      {faceDetected && (
                        <div className="bg-green-500/90 text-white px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                          <Eye className="w-3 h-3" />
                          Face Detected
                        </div>
                      )}
                      {eyeTrackingActive && (
                        <div className="bg-blue-500/90 text-white px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                          <Target className="w-3 h-3" />
                          Eye Tracking Active
                        </div>
                      )}
                    </div>

                    {/* Placeholder when camera is off */}
                    {!isWebcamActive && (
                      <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                        <div className="text-center space-y-4">
                          <div className="rounded-full bg-primary/10 p-4 mx-auto w-fit">
                            <Eye className="h-8 w-8 text-primary" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold" suppressHydrationWarning>
                              {t('demo.interactive.demoTitle')}
                            </h3>
                            <p className="text-muted-foreground" suppressHydrationWarning>
                              {t('demo.interactive.demoDescription')}
                            </p>
                            {webcamError && (
                              <p className="text-destructive text-sm max-w-md mx-auto">
                                {webcamError}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Camera Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      <Button
                        size="lg"
                        onClick={handleWebcamToggle}
                        disabled={isLoading}
                        className={
                          isWebcamActive
                            ? "bg-background/80 text-foreground border border-border hover:bg-background/90"
                            : ""
                        }
                      >
                        {isLoading ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Accessing Camera...
                          </>
                        ) : isWebcamActive ? (
                          <>
                            <CameraOff className="mr-2 h-4 w-4" />
                            Stop Camera
                          </>
                        ) : (
                          <>
                            <Camera className="mr-2 h-4 w-4" />
                            Enable Camera
                          </>
                        )}
                      </Button>

                      {/* Calibration Button */}
                      {isWebcamActive && faceDetected && !isCalibrating && !calibrationComplete && (
                        <Button
                          size="lg"
                          onClick={startCalibration}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Target className="mr-2 h-4 w-4" />
                          Start Calibration
                        </Button>
                      )}

                      {/* Reset Button */}
                      {calibrationComplete && (
                        <Button
                          size="lg"
                          onClick={resetCalibration}
                          variant="outline"
                          className="bg-background/80"
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Reset
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Status Info */}
                  {isWebcamActive && (
                    <div className="flex justify-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/80 px-3 py-1 rounded-full border border-border/50">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Camera Active
                      </div>
                      {mpActive && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                          <Eye className="w-3 h-3 text-primary" />
                          468 Landmarks Tracked
                        </div>
                      )}
                      {calibrationComplete && (
                        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                          <Target className="w-3 h-3" />
                          Calibrated & Ready
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground">
                    Enable camera → Wait for face detection → Click "Start Calibration" → Look at each red dot for 2 seconds → Eye tracking activated!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance" suppressHydrationWarning>
              {t('demo.cta.title')}
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
              {t('demo.cta.description')}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/download">
                  <Download className="mr-2 h-5 w-5" />
                  {t('demo.cta.downloadButton')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/solution">{t('demo.cta.learnMoreButton')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
