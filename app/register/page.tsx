"use client"

import { useTranslation } from 'react-i18next';
import { Navigation } from "../../components/navigation"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useState } from "react"
import Link from "next/link"

export default function RegisterPage() {
const { t } = useTranslation()
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const CreateAccount = async(e: React.FormEvent) => {
    e.preventDefault()  
    console.log("Creating account...")
    console.log({firstname, lastname, email, password, confirmPassword})
    const name = firstname + " " + lastname
    try{
      const url = "https://motionq.onrender.com/signup"
      const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        name:name, 
        email:email, 
        password:password, 
        confirmPassword:confirmPassword })
    })
      const data = await response.json()
      console.log(data)
    }catch(error){
      console.error("Error creating account:", error)
    }
  }



return (
<div className="min-h-screen bg-background">
<Navigation />

      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center" suppressHydrationWarning>
          {t('register.title')}
        </CardTitle>
        <CardDescription className="text-center" suppressHydrationWarning>
          {t('register.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" suppressHydrationWarning>{t('register.firstNameLabel')}</Label>
              <Input id="firstName" type="text" placeholder={t('register.firstNamePlaceholder')} required value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" suppressHydrationWarning>{t('register.lastNameLabel')}</Label>
              <Input id="lastName" type="text" placeholder={t('register.lastNamePlaceholder')} required value={lastname} onChange={(e) => setLastname(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" suppressHydrationWarning>{t('register.emailLabel')}</Label>
            <Input id="email" type="email" placeholder={t('register.emailPlaceholder')} required value={email} onChange={(e) => setEmail(e.target.value)}   />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" suppressHydrationWarning>{t('register.passwordLabel')}</Label>
            <Input id="password" type="password" placeholder={t('register.passwordPlaceholder')} required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" suppressHydrationWarning>{t('register.confirmPasswordLabel')}</Label>
            <Input id="confirmPassword" type="password" placeholder={t('register.confirmPasswordPlaceholder')} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  />
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <input id="terms" type="checkbox" className="h-4 w-4 rounded border-input mt-0.5" required />
              <Label htmlFor="terms" className="text-sm leading-5" suppressHydrationWarning>
                {t('register.termsStart')}{" "}
                <Link href="/privacy" className="text-primary hover:underline" suppressHydrationWarning>
                  {t('register.termsOfService')}
                </Link>{" "}
                {t('register.termsAnd')}{" "}
                <Link href="/privacy" className="text-primary hover:underline" suppressHydrationWarning>
                  {t('register.privacyPolicy')}
                </Link>
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <input id="newsletter" type="checkbox" className="h-4 w-4 rounded border-input mt-0.5" />
              <Label  htmlFor="newsletter" className="text-sm leading-5" suppressHydrationWarning>
                {t('register.newsletter')}
              </Label>
            </div>
          </div>

          <Button onClick={CreateAccount} type="submit" className="w-full" suppressHydrationWarning>
            {t('register.createButton')}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground" suppressHydrationWarning>
              {t('register.orContinue')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full bg-transparent">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.160 1.219-5.160s-.312-.623-.312-1.543c0-1.444.83-2.52 1.863-2.52.878 0 1.303.66 1.303 1.450 0 .885-.564 2.207-.854 3.434-.243 1.028.514 1.864 1.524 1.864 1.830 0 3.24-1.93 3.24-4.715 0-2.467-1.772-4.192-4.305-4.192-2.932 0-4.658 2.200-4.658 4.472 0 .887.341 1.837.766 2.354.084.102.096.191.071.295-.077.315-.25 1.016-.284 1.158-.045.184-.145.223-.334.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.155l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
            </svg>
            GitHub
          </Button>
        </div>

        <div className="text-center text-sm" suppressHydrationWarning>
          {t('register.haveAccount')}{" "}
          <Link href="/login" className="text-primary hover:underline" suppressHydrationWarning>
            {t('register.signIn')}
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
</div>
)
}