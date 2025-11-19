"use client"

import { useTranslation } from 'react-i18next';
import { Navigation } from "../../components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

import Link from "next/link"
import { Download, Monitor, Cpu, HardDrive, Camera, CheckCircle, AlertTriangle, Terminal, FileText } from "lucide-react"

export default function DownloadPage() {
const { t } = useTranslation()

const handleWindowsDownload = () => {
const demoContent = "LINK FOR DOWNLOADING THE INTEGRATION FILE : https://drive.google.com/drive/folders/1oWlZdozD1ylv6kcrRLAuwwSbeDjaUmNy?usp=sharing"
const blob = new Blob([demoContent], { type: "text/plain" })
const url = window.URL.createObjectURL(blob)
const link = document.createElement("a")
link.href = url
link.download = "motionQ.txt"
document.body.appendChild(link)
link.click()
document.body.removeChild(link)
window.URL.revokeObjectURL(url)
}

return (
<div className="min-h-screen bg-background">
<Navigation />

text
  {/* Hero Section */}
  <section className="py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance" suppressHydrationWarning>
            {t('download.hero.title')}
            <span className="text-primary">{t('download.hero.titleHighlight')}</span>
          </h1>
          <p className="mx-auto max-w-[800px] text-muted-foreground text-xl md:text-2xl text-pretty" suppressHydrationWarning>
            {t('download.hero.description')}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="text-sm" suppressHydrationWarning>
            {t('download.hero.badge1')}
          </Badge>
          <Badge variant="secondary" className="text-sm" suppressHydrationWarning>
            {t('download.hero.badge2')}
          </Badge>
          <Badge variant="secondary" className="text-sm" suppressHydrationWarning>
            {t('download.hero.badge3')}
          </Badge>
        </div>
      </div>
    </div>
  </section>

  {/* Download Buttons */}
  <section className="py-16">
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader className="text-center">
              <div className="rounded-full bg-primary/10 p-4 mx-auto w-fit">
                <Monitor className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Windows</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground" suppressHydrationWarning>{t('download.platforms.windowsDesc')}</p>
              <Button size="lg" className="w-full" onClick={handleWindowsDownload} suppressHydrationWarning>
                <Download className="mr-2 h-5 w-5" />
                {t('download.platforms.windowsButton')}
              </Button>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('download.platforms.windowsVersion')}</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader className="text-center">
              <div className="rounded-full bg-accent/10 p-4 mx-auto w-fit">
                <Monitor className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-xl">macOS</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground" suppressHydrationWarning>{t('download.platforms.macosDesc')}</p>
              <Button size="lg" className="w-full bg-transparent" variant="outline" suppressHydrationWarning>
                <Download className="mr-2 h-5 w-5" />
                {t('download.platforms.macosButton')}
              </Button>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('download.platforms.macosVersion')}</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader className="text-center">
              <div className="rounded-full bg-primary/10 p-4 mx-auto w-fit">
                <Terminal className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Linux</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground" suppressHydrationWarning>{t('download.platforms.linuxDesc')}</p>
              <Button size="lg" className="w-full bg-transparent" variant="outline" suppressHydrationWarning>
                <Download className="mr-2 h-5 w-5" />
                {t('download.platforms.linuxButton')}
              </Button>
              <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('download.platforms.linuxVersion')}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground" suppressHydrationWarning>
            {t('download.platforms.sourceCode')}{" "}
            <Link href="#" className="text-primary hover:underline" suppressHydrationWarning>
              {t('download.platforms.viewGithub')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* System Requirements */}
  <section className="py-24 bg-secondary/20">
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance" suppressHydrationWarning>
            {t('download.requirements.title')}
          </h2>
          <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
            {t('download.requirements.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" suppressHydrationWarning>
                <CheckCircle className="h-5 w-5 text-primary" />
                {t('download.requirements.minimumTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Cpu className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium" suppressHydrationWarning>{t('download.requirements.processor')}</p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('download.requirements.minProcessor')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HardDrive className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium" suppressHydrationWarning>{t('download.requirements.memory')}</p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('download.requirements.minMemory')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Camera className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium" suppressHydrationWarning>{t('download.requirements.camera')}</p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('download.requirements.minCamera')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" suppressHydrationWarning>
                <CheckCircle className="h-5 w-5 text-accent" />
                {t('download.requirements.recommendedTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Cpu className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium" suppressHydrationWarning>{t('download.requirements.processor')}</p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('download.requirements.recProcessor')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HardDrive className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium" suppressHydrationWarning>{t('download.requirements.memory')}</p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('download.requirements.recMemory')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Camera className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium" suppressHydrationWarning>{t('download.requirements.camera')}</p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>{t('download.requirements.recCamera')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>

  {/* Installation Guide */}

<section className="py-24"> 
  <div className="container px-4 md:px-6"> 
    <div className="mx-auto max-w-4xl space-y-12"> 
      <div className="text-center space-y-4"> 
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance" suppressHydrationWarning> 
          {t('download.installation.title')} </h2> 
          <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning> 
            {t('download.installation.description')} </p> </div>

        <Tabs defaultValue="windows" className="w-full">
    <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger value="windows">Windows</TabsTrigger>
      <TabsTrigger value="macos">macOS</TabsTrigger>
      <TabsTrigger value="linux">Linux</TabsTrigger>
    </TabsList>

    <TabsContent value="windows" className="space-y-6">
      <Card className="border-border/50">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="text-lg font-bold">1</Badge>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold" suppressHydrationWarning>
                  {t('download.installation.windows.step1Title')}
                </h3>
                <p className="text-muted-foreground" suppressHydrationWarning>
                  {t('download.installation.windows.step1Desc')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="text-lg font-bold">2</Badge>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold" suppressHydrationWarning>
                  {t('download.installation.windows.step2Title')}
                </h3>
                <p className="text-muted-foreground" suppressHydrationWarning>
                  {t('download.installation.windows.step2Desc')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="text-lg font-bold">3</Badge>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold" suppressHydrationWarning>
                  {t('download.installation.windows.step3Title')}
                </h3>
                <p className="text-muted-foreground" suppressHydrationWarning>
                  {t('download.installation.windows.step3Desc')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="text-lg font-bold">4</Badge>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold" suppressHydrationWarning>
                  {t('download.installation.windows.step4Title')}
                </h3>
                <p className="text-muted-foreground" suppressHydrationWarning>
                  {t('download.installation.windows.step4Desc')}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="macos" className="space-y-6">
      <Card className="border-border/50">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="text-lg font-bold">1</Badge>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold" suppressHydrationWarning>
                  {t('download.installation.macos.step1Title')}
                </h3>
                <p className="text-muted-foreground" suppressHydrationWarning>
                  {t('download.installation.macos.step1Desc')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="text-lg font-bold">2</Badge>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold" suppressHydrationWarning>
                  {t('download.installation.macos.step2Title')}
                </h3>
                <p className="text-muted-foreground" suppressHydrationWarning>
                  {t('download.installation.macos.step2Desc')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="text-lg font-bold">3</Badge>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold" suppressHydrationWarning>
                  {t('download.installation.macos.step3Title')}
                </h3>
                <p className="text-muted-foreground" suppressHydrationWarning>
                  {t('download.installation.macos.step3Desc')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="text-lg font-bold">4</Badge>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold" suppressHydrationWarning>
                  {t('download.installation.macos.step4Title')}
                </h3>
                <p className="text-muted-foreground" suppressHydrationWarning>
                  {t('download.installation.macos.step4Desc')}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="linux" className="space-y-6">
      <Card className="border-border/50">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="text-lg font-bold">1</Badge>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold" suppressHydrationWarning>
                  {t('download.installation.linux.step1Title')}
                </h3>
                <p className="text-muted-foreground" suppressHydrationWarning>
                  {t('download.installation.linux.step1Desc')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="text-lg font-bold">2</Badge>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold" suppressHydrationWarning>
                  {t('download.installation.linux.step2Title')}
                </h3>
                <p className="text-muted-foreground" suppressHydrationWarning>
                  {t('download.installation.linux.step2Desc')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="text-lg font-bold">3</Badge>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold" suppressHydrationWarning>
                  {t('download.installation.linux.step3Title')}
                </h3>
                <p className="text-muted-foreground" suppressHydrationWarning>
                  {t('download.installation.linux.step3Desc')}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Badge variant="secondary" className="text-lg font-bold">4</Badge>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold" suppressHydrationWarning>
                  {t('download.installation.linux.step4Title')}
                </h3>
                <p className="text-muted-foreground" suppressHydrationWarning>
                  {t('download.installation.linux.step4Desc')}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</div>
    </div>
  </section>

  {/* Troubleshooting */}
<section className="py-24 bg-secondary/20">
  <div className="container px-4 md:px-6">
    <div className="mx-auto max-w-4xl space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance" suppressHydrationWarning>
          {t('download.troubleshooting.title')}
        </h2>
        <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
          {t('download.troubleshooting.description')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Camera Issue */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive" suppressHydrationWarning>
              <AlertTriangle className="h-5 w-5" />
              {t('download.troubleshooting.cameraTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground" suppressHydrationWarning>
              {t('download.troubleshooting.cameraDescription')}
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li suppressHydrationWarning>• {t('download.troubleshooting.cameraTip1')}</li>
              <li suppressHydrationWarning>• {t('download.troubleshooting.cameraTip2')}</li>
              <li suppressHydrationWarning>• {t('download.troubleshooting.cameraTip3')}</li>
              <li suppressHydrationWarning>• {t('download.troubleshooting.cameraTip4')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Tracking Issue */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive" suppressHydrationWarning>
              <AlertTriangle className="h-5 w-5" />
              {t('download.troubleshooting.trackingTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground" suppressHydrationWarning>
              {t('download.troubleshooting.trackingDescription')}
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li suppressHydrationWarning>• {t('download.troubleshooting.trackingTip1')}</li>
              <li suppressHydrationWarning>• {t('download.troubleshooting.trackingTip2')}</li>
              <li suppressHydrationWarning>• {t('download.troubleshooting.trackingTip3')}</li>
              <li suppressHydrationWarning>• {t('download.troubleshooting.trackingTip4')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* CPU Issue */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive" suppressHydrationWarning>
              <AlertTriangle className="h-5 w-5" />
              {t('download.troubleshooting.cpuTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground" suppressHydrationWarning>
              {t('download.troubleshooting.cpuDescription')}
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li suppressHydrationWarning>• {t('download.troubleshooting.cpuTip1')}</li>
              <li suppressHydrationWarning>• {t('download.troubleshooting.cpuTip2')}</li>
              <li suppressHydrationWarning>• {t('download.troubleshooting.cpuTip3')}</li>
              <li suppressHydrationWarning>• {t('download.troubleshooting.cpuTip4')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Installation Issue */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive" suppressHydrationWarning>
              <AlertTriangle className="h-5 w-5" />
              {t('download.troubleshooting.installationTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground" suppressHydrationWarning>
              {t('download.troubleshooting.installationDescription')}
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li suppressHydrationWarning>• {t('download.troubleshooting.installationTip1')}</li>
              <li suppressHydrationWarning>• {t('download.troubleshooting.installationTip2')}</li>
              <li suppressHydrationWarning>• {t('download.troubleshooting.installationTip3')}</li>
              <li suppressHydrationWarning>• {t('download.troubleshooting.installationTip4')}</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-primary/5">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold mb-4" suppressHydrationWarning>
            {t('download.help.title')}
          </h3>
          <p className="text-muted-foreground mb-6" suppressHydrationWarning>
            {t('download.help.description')}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild variant="outline">
              <Link href="#" suppressHydrationWarning>
                <FileText className="mr-2 h-4 w-4" />
                {t('download.help.documentation')}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/team" suppressHydrationWarning>{t('download.help.contact')}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</section>
</div>
)
}