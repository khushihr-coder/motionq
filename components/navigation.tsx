"use client"

import { useEffect, useState } from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"
import { LanguageToggle } from "./language-toggle"
import { useTranslation } from 'react-i18next'

const navigation = [
  { name: "home", href: "/", fallback: "Home" },
  { name: "problem", href: "/problem", fallback: "Problem" },
  { name: "solution", href: "/solution", fallback: "Solution" },
  { name: "demo", href: "/demo", fallback: "Demo" },
  { name: "download", href: "/download", fallback: "Download" },
  { name: "results", href: "/results", fallback: "Results" },
  { name: "team", href: "/team", fallback: "Team" },
  { name: "privacy", href: "/privacy", fallback: "Privacy" },
]

export function Navigation() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  // Wait for component to mount (client-side only)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <span className="hidden font-bold sm:inline-block text-xl">MotionQ</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60",
                )}
              >
                {/* Show fallback during SSR, translated text after mount */}
                {mounted ? t(`navigation.${item.name}`) : item.fallback}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">
                  {mounted ? t('navigation.login') : 'Login'}
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">
                  {/* Fixed: Now shows "साइन अप" in Hindi, "Sign Up" in English */}
                  {mounted ? t('signup') : 'Sign Up'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}