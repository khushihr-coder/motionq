import I18nProvider from './providers/I18nProvider';
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense, ReactNode } from "react"
import { Chatbot } from "../components/Chatbot"  // ← Fixed path
import UnifiedVoiceButton from "../components/UnifiedVoiceButton"  // ← Fixed path
import Script from "next/script"
import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <I18nProvider>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
          <Chatbot />
          <UnifiedVoiceButton />
        </I18nProvider>
        <Analytics />
        
        {/* Vosk Speech Recognition */}
        <Script
          src="https://cdn.jsdelivr.net/npm/vosk-browser/dist/bundle.min.js"
          strategy="afterInteractive"
        />
        
        {/* MediaPipe FaceMesh Scripts */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1640029074/camera_utils.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.6.1629159505/control_utils.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3.1620248257/drawing_utils.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1633559619/face_mesh.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
