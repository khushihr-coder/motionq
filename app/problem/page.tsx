"use client"

import { useTranslation } from 'react-i18next';
import { Navigation } from "../../components/navigation"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import Link from "next/link"
import { AlertTriangle, Users, Globe, TrendingDown } from "lucide-react"

export default function ProblemPage() {
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
            {t('problem.hero.title')}
            <span className="text-primary">{t('problem.hero.titleHighlight')}</span>
          </h1>
          <p className="mx-auto max-w-[800px] text-muted-foreground text-xl md:text-2xl text-pretty" suppressHydrationWarning>
            {t('problem.hero.description')}
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* Statistics Section */}
  <section className="py-16 bg-secondary/20">
    <div className="container px-4 md:px-6">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
            <div className="rounded-full bg-destructive/10 p-3">
              <Users className="h-8 w-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">61M</h3>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('problem.stats.adults')}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">20.2M</h3>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('problem.stats.ambulatory')}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
            <div className="rounded-full bg-destructive/10 p-3">
              <Globe className="h-8 w-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">1.3B</h3>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('problem.stats.worldwide')}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
            <div className="rounded-full bg-destructive/10 p-3">
              <TrendingDown className="h-8 w-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">98%</h3>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('problem.stats.barriers')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  {/* Problem Details */}
  <section className="py-24">
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance" suppressHydrationWarning>
            {t('problem.impact.title')}
          </h2>
          <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
            {t('problem.impact.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-primary" suppressHydrationWarning>{t('problem.impact.basicTitle')}</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('problem.impact.basic1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('problem.impact.basic2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('problem.impact.basic3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('problem.impact.basic4')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-accent" suppressHydrationWarning>{t('problem.impact.eduTitle')}</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('problem.impact.edu1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('problem.impact.edu2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('problem.impact.edu3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span suppressHydrationWarning>{t('problem.impact.edu4')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 bg-secondary/10">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-4 text-center" suppressHydrationWarning>{t('problem.current.title')}</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-destructive" suppressHydrationWarning>{t('problem.current.expensiveTitle')}</h4>
                <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                  {t('problem.current.expensiveDesc')}
                </p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-destructive" suppressHydrationWarning>{t('problem.current.complexTitle')}</h4>
                <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                  {t('problem.current.complexDesc')}
                </p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-destructive" suppressHydrationWarning>{t('problem.current.poorTitle')}</h4>
                <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                  {t('problem.current.poorDesc')}
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
          {t('problem.cta.title')}
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
          {t('problem.cta.description')}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/solution" suppressHydrationWarning>{t('problem.cta.solution')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            <Link href="/demo" suppressHydrationWarning>{t('problem.cta.demo')}</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
</div>
)
}
