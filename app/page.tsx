"use client"

import { Navigation } from "../components/navigation"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import Link from "next/link"
import { Eye, MousePointer, Smile, Zap } from "lucide-react"
import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-balance" suppressHydrationWarning>
                {t('hero.title')}
                <span className="text-primary">{t('hero.titleHighlight')}</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-xl md:text-2xl text-pretty" suppressHydrationWarning>
                {t('hero.description')}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/demo" suppressHydrationWarning>{t('hero.watchDemo')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/download" suppressHydrationWarning>{t('hero.downloadNow')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance" suppressHydrationWarning>
              {t('features.title')}
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
              {t('features.description')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold" suppressHydrationWarning>{t('features.eyeTracking')}</h3>
                <p className="text-center text-muted-foreground text-pretty" suppressHydrationWarning>
                  {t('features.eyeTrackingDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <div className="rounded-full bg-accent/10 p-3">
                  <MousePointer className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold" suppressHydrationWarning>{t('features.blinkDetection')}</h3>
                <p className="text-center text-muted-foreground text-pretty" suppressHydrationWarning>
                  {t('features.blinkDetectionDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Smile className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold" suppressHydrationWarning>{t('features.facialExpressions')}</h3>
                <p className="text-center text-muted-foreground text-pretty" suppressHydrationWarning>
                  {t('features.facialExpressionsDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <div className="rounded-full bg-accent/10 p-3">
                  <Zap className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold" suppressHydrationWarning>{t('features.noHardware')}</h3>
                <p className="text-center text-muted-foreground text-pretty" suppressHydrationWarning>
                  {t('features.noHardwareDesc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance" suppressHydrationWarning>
              {t('cta.title')}
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
              {t('cta.description')}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/demo" suppressHydrationWarning>{t('cta.tryDemo')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/problem" suppressHydrationWarning>{t('cta.learnMore')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
