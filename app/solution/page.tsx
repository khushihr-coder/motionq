"use client"

import { useTranslation } from 'react-i18next';
import { Navigation } from "../../components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import Link from "next/link"
import { Eye, Camera, Cpu, Zap, CheckCircle, ArrowRight } from "lucide-react"

export default function SolutionPage() {
const { t } = useTranslation();

return (
<div className="min-h-screen bg-background">
<Navigation />

      {/* Hero Section */}
  <section className="py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance" suppressHydrationWarning>
            {t('solution.hero.title')}
            <span className="text-primary">{t('solution.hero.titleHighlight')}</span>
          </h1>
          <p className="mx-auto max-w-[800px] text-muted-foreground text-xl md:text-2xl text-pretty" suppressHydrationWarning>
            {t('solution.hero.description')}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="text-sm" suppressHydrationWarning>
            {t('solution.hero.badge1')}
          </Badge>
          <Badge variant="secondary" className="text-sm" suppressHydrationWarning>
            {t('solution.hero.badge2')}
          </Badge>
          <Badge variant="secondary" className="text-sm" suppressHydrationWarning>
            {t('solution.hero.badge3')}
          </Badge>
          <Badge variant="secondary" className="text-sm" suppressHydrationWarning>
            {t('solution.hero.badge4')}
          </Badge>
        </div>
      </div>
    </div>
  </section>

  {/* How It Works */}
  <section className="py-24 bg-secondary/20">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance" suppressHydrationWarning>
          {t('solution.howItWorks.title')}
        </h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
          {t('solution.howItWorks.description')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold" suppressHydrationWarning>{t('solution.howItWorks.step1Title')}</h3>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                {t('solution.howItWorks.step1Desc')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
            <div className="rounded-full bg-accent/10 p-3">
              <Eye className="h-8 w-8 text-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold" suppressHydrationWarning>{t('solution.howItWorks.step2Title')}</h3>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                {t('solution.howItWorks.step2Desc')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold" suppressHydrationWarning>{t('solution.howItWorks.step3Title')}</h3>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                {t('solution.howItWorks.step3Desc')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
            <div className="rounded-full bg-accent/10 p-3">
              <Cpu className="h-8 w-8 text-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold" suppressHydrationWarning>{t('solution.howItWorks.step4Title')}</h3>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                {t('solution.howItWorks.step4Desc')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold" suppressHydrationWarning>{t('solution.howItWorks.step5Title')}</h3>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                {t('solution.howItWorks.step5Desc')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  {/* Tech Stack */}
  <section className="py-24">
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance" suppressHydrationWarning>
            {t('solution.tech.title')}
          </h2>
          <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
            {t('solution.tech.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-primary">MediaPipe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground" suppressHydrationWarning>
                {t('solution.tech.mediapipe')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-accent">OpenCV</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground" suppressHydrationWarning>
                {t('solution.tech.opencv')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-primary">PyAutoGUI</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground" suppressHydrationWarning>
                {t('solution.tech.pyautogui')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>

  {/* Key Features */}
  <section className="py-24 bg-secondary/20">
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance" suppressHydrationWarning>
            {t('solution.features.title')}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-primary" suppressHydrationWarning>{t('solution.features.accessibilityTitle')}</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('solution.features.accessibility1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('solution.features.accessibility2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('solution.features.accessibility3')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-accent" suppressHydrationWarning>{t('solution.features.costTitle')}</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('solution.features.cost1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('solution.features.cost2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('solution.features.cost3')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-primary" suppressHydrationWarning>{t('solution.features.privacyTitle')}</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('solution.features.privacy1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('solution.features.privacy2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('solution.features.privacy3')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-accent" suppressHydrationWarning>{t('solution.features.practicalTitle')}</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('solution.features.practical1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('solution.features.practical2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('solution.features.practical3')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>

  {/* CTA Section */}
  <section className="py-24">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance" suppressHydrationWarning>
          {t('solution.cta.title')}
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
          {t('solution.cta.description')}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/demo" suppressHydrationWarning>
              {t('solution.cta.demo')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            <Link href="/download" suppressHydrationWarning>{t('solution.cta.download')}</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
</div>
)
}