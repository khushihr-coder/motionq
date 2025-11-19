"use client"

import { useTranslation } from 'react-i18next';
import { Navigation } from "../../components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import Link from "next/link"
import { Shield, Lock, Eye, Server, CheckCircle, AlertTriangle, Globe, Users } from "lucide-react"

export default function PrivacyPage() {
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
                {t('privacy.hero.title')}<span className="text-primary">{t('privacy.hero.titleHighlight')}</span>
              </h1>
              <p className="mx-auto max-w-[800px] text-muted-foreground text-xl md:text-2xl text-pretty" suppressHydrationWarning>
                {t('privacy.hero.description')}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="text-sm" suppressHydrationWarning>
                {t('privacy.hero.badge1')}
              </Badge>
              <Badge variant="secondary" className="text-sm" suppressHydrationWarning>
                {t('privacy.hero.badge2')}
              </Badge>
              <Badge variant="secondary" className="text-sm" suppressHydrationWarning>
                {t('privacy.hero.badge3')}
              </Badge>
              <Badge variant="secondary" className="text-sm" suppressHydrationWarning>
                {t('privacy.hero.badge4')}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy First */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance" suppressHydrationWarning>
                {t('privacy.priority.title')}
              </h2>
              <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
                {t('privacy.priority.description')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" suppressHydrationWarning>
                    <Lock className="h-5 w-5 text-primary" />
                    {t('privacy.priority.localTitle')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground" suppressHydrationWarning>
                    {t('privacy.priority.localDesc')}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.priority.local1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.priority.local2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.priority.local3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" suppressHydrationWarning>
                    <Shield className="h-5 w-5 text-accent" />
                    {t('privacy.priority.zeroTitle')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground" suppressHydrationWarning>
                    {t('privacy.priority.zeroDesc')}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.priority.zero1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.priority.zero2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.priority.zero3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" suppressHydrationWarning>
                    <Eye className="h-5 w-5 text-primary" />
                    {t('privacy.priority.transparentTitle')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground" suppressHydrationWarning>
                    {t('privacy.priority.transparentDesc')}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.priority.transparent1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.priority.transparent2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.priority.transparent3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" suppressHydrationWarning>
                    <Server className="h-5 w-5 text-accent" />
                    {t('privacy.priority.cloudTitle')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground" suppressHydrationWarning>
                    {t('privacy.priority.cloudDesc')}
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.priority.cloud1')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.priority.cloud2')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.priority.cloud3')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Standards */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance" suppressHydrationWarning>
                {t('privacy.standards.title')}
              </h2>
              <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
                {t('privacy.standards.description')}
              </p>
            </div>

            <Card className="border-border/50 bg-primary/5">
              <CardContent className="p-8">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="text-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-3 mx-auto w-fit">
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">WCAG 2.1 AA</h3>
                    <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                      {t('privacy.standards.wcagDesc')}
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="rounded-full bg-accent/10 p-3 mx-auto w-fit">
                      <Users className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold">Section 508</h3>
                    <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                      {t('privacy.standards.section508Desc')}
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-3 mx-auto w-fit">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">ADA Compliant</h3>
                    <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                      {t('privacy.standards.adaDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle suppressHydrationWarning>{t('privacy.standards.universalTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.standards.universal1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.standards.universal2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.standards.universal3')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.standards.universal4')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.standards.universal5')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle suppressHydrationWarning>{t('privacy.standards.inclusiveTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.standards.inclusive1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.standards.inclusive2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.standards.inclusive3')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.standards.inclusive4')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span suppressHydrationWarning>{t('privacy.standards.inclusive5')}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Permissions */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance" suppressHydrationWarning>
                {t('privacy.security.title')}
              </h2>
              <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
                {t('privacy.security.description')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary" suppressHydrationWarning>
                    <CheckCircle className="h-5 w-5" />
                    {t('privacy.security.requiredTitle')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Eye className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium" suppressHydrationWarning>{t('privacy.security.cameraTitle')}</p>
                        <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                          {t('privacy.security.cameraDesc')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Server className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium" suppressHydrationWarning>{t('privacy.security.systemTitle')}</p>
                        <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                          {t('privacy.security.systemDesc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive" suppressHydrationWarning>
                    <AlertTriangle className="h-5 w-5" />
                    {t('privacy.security.notRequiredTitle')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium" suppressHydrationWarning>{t('privacy.security.internetTitle')}</p>
                        <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                          {t('privacy.security.internetDesc')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium" suppressHydrationWarning>{t('privacy.security.personalTitle')}</p>
                        <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                          {t('privacy.security.personalDesc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/50 bg-accent/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 text-center" suppressHydrationWarning>
                  {t('privacy.security.bestPracticesTitle')}
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-semibold" suppressHydrationWarning>{t('privacy.security.dataProtectionTitle')}</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li suppressHydrationWarning>-  {t('privacy.security.dataProtection1')}</li>
                      <li suppressHydrationWarning>-  {t('privacy.security.dataProtection2')}</li>
                      <li suppressHydrationWarning>-  {t('privacy.security.dataProtection3')}</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold" suppressHydrationWarning>{t('privacy.security.userControlTitle')}</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li suppressHydrationWarning>-  {t('privacy.security.userControl1')}</li>
                      <li suppressHydrationWarning>-  {t('privacy.security.userControl2')}</li>
                      <li suppressHydrationWarning>-  {t('privacy.security.userControl3')}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact & Support */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance" suppressHydrationWarning>
              {t('privacy.contact.title')}
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
              {t('privacy.contact.description')}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/team" suppressHydrationWarning>{t('privacy.contact.contactButton')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="#" suppressHydrationWarning>{t('privacy.contact.sourceButton')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}