// app/layout.jsx
import './globals.css'

export const metadata = {
  title: 'Portfolio - Creative Designer & Developer',
  description: 'A modern portfolio website with GSAP animations',
}

import { PropsWithChildren } from 'react'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}