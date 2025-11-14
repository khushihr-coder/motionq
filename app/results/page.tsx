"use client"

import { useTranslation } from 'react-i18next';
import { Navigation } from "../../components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import Link from "next/link"
import { BarChart, Users, Clock, Target, TrendingUp, CheckCircle, Star } from "lucide-react"

export default function ResultsPage() {
const { t } = useTranslation()

return (
<div className="min-h-screen bg-background">
<Navigation />

     {/* Hero Section */}
  <section className="py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance" suppressHydrationWarning>
            {t('results.hero.title')}
            <span className="text-primary">{t('results.hero.titleHighlight')}</span>
          </h1>
          <p className="mx-auto max-w-[800px] text-muted-foreground text-xl md:text-2xl text-pretty" suppressHydrationWarning>
            {t('results.hero.description')}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="text-sm" suppressHydrationWarning>
            {t('results.hero.badge1')}
          </Badge>
          <Badge variant="secondary" className="text-sm" suppressHydrationWarning>
            {t('results.hero.badge2')}
          </Badge>
          <Badge variant="secondary" className="text-sm" suppressHydrationWarning>
            {t('results.hero.badge3')}
          </Badge>
        </div>
      </div>
    </div>
  </section>

  {/* Key Metrics */}
  <section className="py-16 bg-secondary/20">
    <div className="container px-4 md:px-6">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">94.2%</h3>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('results.metrics.blinkAccuracy')}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
            <div className="rounded-full bg-accent/10 p-3">
              <Clock className="h-8 w-8 text-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">127ms</h3>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('results.metrics.responseTime')}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">88%</h3>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('results.metrics.comfortRating')}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
            <div className="rounded-full bg-accent/10 p-3">
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">76%</h3>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('results.metrics.productivity')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  {/* Detailed Results */}
  <section className="py-24">
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance" suppressHydrationWarning>
            {t('results.analysis.title')}
          </h2>
          <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
            {t('results.analysis.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" suppressHydrationWarning>
                <BarChart className="h-5 w-5 text-primary" />
                {t('results.analysis.accuracyTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span suppressHydrationWarning>{t('results.analysis.blinkDetection')}</span>
                  <span className="font-medium">94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span suppressHydrationWarning>{t('results.analysis.gazeTracking')}</span>
                  <span className="font-medium">89.7%</span>
                </div>
                <Progress value={89.7} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span suppressHydrationWarning>{t('results.analysis.facialGestures')}</span>
                  <span className="font-medium">91.5%</span>
                </div>
                <Progress value={91.5} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span suppressHydrationWarning>{t('results.analysis.falsePositives')}</span>
                  <span className="font-medium">3.8%</span>
                </div>
                <Progress value={3.8} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" suppressHydrationWarning>
                <Clock className="h-5 w-5 text-accent" />
                {t('results.analysis.responseTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span suppressHydrationWarning>{t('results.analysis.eyeToCursor')}</span>
                  <span className="font-medium">85ms</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "42%" }} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span suppressHydrationWarning>{t('results.analysis.blinkToClick')}</span>
                  <span className="font-medium">127ms</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "63%" }} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span suppressHydrationWarning>{t('results.analysis.gestureToAction')}</span>
                  <span className="font-medium">156ms</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "78%" }} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span suppressHydrationWarning>{t('results.analysis.systemLatency')}</span>
                  <span className="font-medium">43ms</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "21%" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>

  {/* User Feedback */}
  <section className="py-24 bg-secondary/20">
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance" suppressHydrationWarning>
            {t('results.feedback.title')}
          </h2>
          <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
            {t('results.feedback.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground italic" suppressHydrationWarning>
                  {t('results.feedback.testimonial1')}
                </blockquote>
                <div className="text-sm">
                  <p className="font-medium">Sarah M.</p>
                  <p className="text-muted-foreground" suppressHydrationWarning>{t('results.feedback.user1Condition')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground italic" suppressHydrationWarning>
                  {t('results.feedback.testimonial2')}
                </blockquote>
                <div className="text-sm">
                  <p className="font-medium">Michael R.</p>
                  <p className="text-muted-foreground" suppressHydrationWarning>{t('results.feedback.user2Condition')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                  <Star className="h-4 w-4 text-muted-foreground" />
                </div>
                <blockquote className="text-muted-foreground italic" suppressHydrationWarning>
                  {t('results.feedback.testimonial3')}
                </blockquote>
                <div className="text-sm">
                  <p className="font-medium">Jennifer L.</p>
                  <p className="text-muted-foreground" suppressHydrationWarning>{t('results.feedback.user3Condition')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>

  {/* Study Details */}
  <section className="py-24">
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance" suppressHydrationWarning>
            {t('results.study.title')}
          </h2>
          <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
            {t('results.study.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-primary" suppressHydrationWarning>{t('results.study.participantsTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground" suppressHydrationWarning>{t('results.study.totalParticipants')}</span>
                <span className="font-medium" suppressHydrationWarning>{t('results.study.totalParticipantsValue')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground" suppressHydrationWarning>{t('results.study.ageRange')}</span>
                <span className="font-medium" suppressHydrationWarning>{t('results.study.ageRangeValue')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground" suppressHydrationWarning>{t('results.study.conditions')}</span>
                <span className="font-medium" suppressHydrationWarning>{t('results.study.conditionsValue')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground" suppressHydrationWarning>{t('results.study.experience')}</span>
                <span className="font-medium" suppressHydrationWarning>{t('results.study.experienceValue')}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-accent" suppressHydrationWarning>{t('results.study.protocolTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground" suppressHydrationWarning>{t('results.study.duration')}</span>
                <span className="font-medium" suppressHydrationWarning>{t('results.study.durationValue')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground" suppressHydrationWarning>{t('results.study.dailyUsage')}</span>
                <span className="font-medium" suppressHydrationWarning>{t('results.study.dailyUsageValue')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground" suppressHydrationWarning>{t('results.study.tasks')}</span>
                <span className="font-medium" suppressHydrationWarning>{t('results.study.tasksValue')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground" suppressHydrationWarning>{t('results.study.dataPoints')}</span>
                <span className="font-medium" suppressHydrationWarning>{t('results.study.dataPointsValue')}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 bg-primary/5">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-4 text-center" suppressHydrationWarning>{t('results.improvements.title')}</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2" suppressHydrationWarning>
                  <CheckCircle className="h-5 w-5 text-primary" />
                  {t('results.improvements.improvement1Title')}
                </h4>
                <p className="text-muted-foreground text-sm" suppressHydrationWarning>
                  {t('results.improvements.improvement1Desc')}
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2" suppressHydrationWarning>
                  <CheckCircle className="h-5 w-5 text-primary" />
                  {t('results.improvements.improvement2Title')}
                </h4>
                <p className="text-muted-foreground text-sm" suppressHydrationWarning>
                  {t('results.improvements.improvement2Desc')}
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2" suppressHydrationWarning>
                  <CheckCircle className="h-5 w-5 text-primary" />
                  {t('results.improvements.improvement3Title')}
                </h4>
                <p className="text-muted-foreground text-sm" suppressHydrationWarning>
                  {t('results.improvements.improvement3Desc')}
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2" suppressHydrationWarning>
                  <CheckCircle className="h-5 w-5 text-primary" />
                  {t('results.improvements.improvement4Title')}
                </h4>
                <p className="text-muted-foreground text-sm" suppressHydrationWarning>
                  {t('results.improvements.improvement4Desc')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  {/* CTA Section */}
  <section className="py-24 bg-secondary/20">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance" suppressHydrationWarning>
          {t('results.cta.title')}
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
          {t('results.cta.description')}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/demo" suppressHydrationWarning>{t('results.cta.tryDemo')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            <Link href="/download" suppressHydrationWarning>{t('results.cta.download')}</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
</div>
)
}