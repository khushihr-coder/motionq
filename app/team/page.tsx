"use client"

import { useTranslation } from 'react-i18next';
import { Navigation } from "../../components/navigation"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"
import Link from "next/link"
import { Github, Linkedin, Mail, Heart, Users, MessageCircle, Code, Lightbulb } from "lucide-react"

export default function TeamPage() {
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
            {t('team.hero.title')}
            <span className="text-primary">{t('team.hero.titleHighlight')}</span>
          </h1>
          <p className="mx-auto max-w-[800px] text-muted-foreground text-xl md:text-2xl text-pretty" suppressHydrationWarning>
            {t('team.hero.description')}
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* Mission Statement */}
  <section className="py-16 bg-secondary/20">
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-4xl text-center space-y-8">
        <Card className="border-border/50 bg-primary/5">
          <CardContent className="p-8">
            <div className="space-y-4">
              <div className="rounded-full bg-primary/10 p-3 mx-auto w-fit">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold" suppressHydrationWarning>{t('team.mission.title')}</h2>
              <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
                {t('team.mission.description')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>

  {/* Team Members */}
  <section className="py-24">
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance" suppressHydrationWarning>
            {t('team.members.title')}
          </h2>
          <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
            {t('team.members.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Team Member 1 */}
          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">DS</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Disha Sakaria</h3>
                  <p className="text-primary font-medium" suppressHydrationWarning>{t('team.members.member1Role')}</p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t('team.members.member1Desc')}
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  <Button size="sm" variant="outline">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Member 2 */}
          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="w-24 h-24 rounded-full bg-accent/10 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent">KR</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Khushi Rathod</h3>
                  <p className="text-accent font-medium" suppressHydrationWarning>{t('team.members.member2Role')}</p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t('team.members.member2Desc')}
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  <Button size="sm" variant="outline">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Member 3 */}
          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">SP</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Samidha Pawaskar</h3>
                  <p className="text-primary font-medium" suppressHydrationWarning>{t('team.members.member3Role')}</p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t('team.members.member3Desc')}
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  <Button size="sm" variant="outline">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Member 4 */}
          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="w-24 h-24 rounded-full bg-accent/10 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent">AS</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Arni Shah</h3>
                  <p className="text-accent font-medium" suppressHydrationWarning>{t('team.members.member4Role')}</p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t('team.members.member4Desc')}
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  <Button size="sm" variant="outline">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Member 5 */}
          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">KB</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Prof. Kavita Badhe</h3>
                  <p className="text-primary font-medium" suppressHydrationWarning>{t('team.members.member5Role')}</p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t('team.members.member5Desc')}
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  <Button size="sm" variant="outline">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Member 6 */}
          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="w-24 h-24 rounded-full bg-accent/10 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent">DU</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Demo User</h3>
                  <p className="text-accent font-medium" suppressHydrationWarning>{t('team.members.member6Role')}</p>
                  <p className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {t('team.members.member6Desc')}
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  <Button size="sm" variant="outline">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>

  {/* Community Section */}
  <section className="py-24 bg-secondary/20">
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-balance" suppressHydrationWarning>
            {t('team.community.title')}
          </h2>
          <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
            {t('team.community.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="rounded-full bg-primary/10 p-3 mx-auto w-fit">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold" suppressHydrationWarning>{t('team.community.contributeTitle')}</h3>
                <p className="text-muted-foreground text-sm" suppressHydrationWarning>
                  {t('team.community.contributeDesc')}
                </p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="#" suppressHydrationWarning>{t('team.community.contributeButton')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="rounded-full bg-accent/10 p-3 mx-auto w-fit">
                  <MessageCircle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold" suppressHydrationWarning>{t('team.community.feedbackTitle')}</h3>
                <p className="text-muted-foreground text-sm" suppressHydrationWarning>
                  {t('team.community.feedbackDesc')}
                </p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="#feedback" suppressHydrationWarning>{t('team.community.feedbackButton')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="rounded-full bg-primary/10 p-3 mx-auto w-fit">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold" suppressHydrationWarning>{t('team.community.ideasTitle')}</h3>
                <p className="text-muted-foreground text-sm" suppressHydrationWarning>
                  {t('team.community.ideasDesc')}
                </p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="#feedback" suppressHydrationWarning>{t('team.community.ideasButton')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>

  {/* Feedback Form */}
  <section id="feedback" className="py-24">
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-balance" suppressHydrationWarning>
            {t('team.contact.title')}
          </h2>
          <p className="text-muted-foreground text-lg text-pretty" suppressHydrationWarning>
            {t('team.contact.description')}
          </p>
        </div>

        <Card className="border-border/50">
          <CardContent className="p-8">
            <form className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" suppressHydrationWarning>{t('team.contact.nameLabel')}</Label>
                  <Input id="name" placeholder={t('team.contact.namePlaceholder')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" suppressHydrationWarning>{t('team.contact.emailLabel')}</Label>
                  <Input id="email" type="email" placeholder={t('team.contact.emailPlaceholder')} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" suppressHydrationWarning>{t('team.contact.subjectLabel')}</Label>
                <Input id="subject" placeholder={t('team.contact.subjectPlaceholder')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" suppressHydrationWarning>{t('team.contact.messageLabel')}</Label>
                <Textarea
                  id="message"
                  placeholder={t('team.contact.messagePlaceholder')}
                  className="min-h-[120px]"
                />
              </div>
              <Button type="submit" className="w-full" suppressHydrationWarning>
                {t('team.contact.submitButton')}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <p className="text-muted-foreground" suppressHydrationWarning>
            {t('team.contact.emailText')}{" "}
            <Link href="mailto:team@motionq.org" className="text-primary hover:underline">
              team@motionq.org
            </Link>
          </p>
          <div className="flex justify-center gap-4">
            <Button size="sm" variant="outline">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button size="sm" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Discord
            </Button>
            <Button size="sm" variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Forum
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
)
}