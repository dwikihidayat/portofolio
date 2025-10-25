// app/page.jsx
'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Prism from '../components/Prism';
import Link from 'next/link';
import Image from 'next/image';

export default function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const divider1Ref = useRef<HTMLDivElement>(null)
  const divider2Ref = useRef<HTMLDivElement>(null)
  
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Hero section animation
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.5, 
        ease: "power3.out" 
      }
    )

    // About section animation
    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current.querySelectorAll('.text-block'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Projects section animation
    if (projectsRef.current) {
      gsap.fromTo(
        projectsRef.current.querySelectorAll('.project-item'),
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }

    // Contact section animation
    gsap.fromTo(contactRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Divider animations
    if (divider1Ref.current) {
      gsap.fromTo(divider1Ref.current.querySelector('.divider-text'),
        { x: "100%" },
        {
          x: "-100%",
          duration: 20,
          ease: "none",
          scrollTrigger: {
            trigger: divider1Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      )
    }

    if (divider2Ref.current) {
      gsap.fromTo(divider2Ref.current.querySelector('.divider-text'),
        { x: "-100%" },
        {
          x: "100%",
          duration: 20,
          ease: "none",
          scrollTrigger: {
            trigger: divider2Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      )
    }

    // Section observer for navbar
    const sections = [
      { id: 'home', ref: heroRef },
      { id: 'about', ref: aboutRef },
      { id: 'projects', ref: projectsRef },
      { id: 'contact', ref: contactRef }
    ]

    sections.forEach(({ id, ref }) => {
      if (ref.current) {
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top center",
          end: "bottom center",
          onToggle: self => self.isActive && setActiveSection(id)
        })
      }
    })

    // Close mobile menu when clicking on a link
    const handleLinkClick = () => {
      setIsMenuOpen(false)
    }

    const links = document.querySelectorAll('.nav-link, .mobile-nav-link')
    links.forEach(link => {
      link.addEventListener('click', handleLinkClick)
    })

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleLinkClick)
      })
    }
  }, [])

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement | null>) => {
    sectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <nav className="fixed-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span>DWIKI HIDAYAT</span>
          </div>

          {/* Desktop Menu */}
          <ul className="nav-links">
            <li>
              <button
                className={`nav-link ${activeSection === "home" ? "active" : ""}`}
                onClick={() => scrollToSection(heroRef)}
              >
                HOME
              </button>
            </li>

            <li>
              <button
                className={`nav-link ${activeSection === "about" ? "active" : ""}`}
                onClick={() => scrollToSection(aboutRef)}
              >
                ABOUT
              </button>
            </li>

            <li>
              <button
                className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
                onClick={() => scrollToSection(projectsRef)}
              >
                PROJECTS
              </button>
            </li>

            <li>
              <button
                className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
                onClick={() => scrollToSection(contactRef)}
              >
                CONTACT
              </button>
            </li>

            <li>
              <Link 
                href="/resume.pdf" 
                className="nav-link resume-link"
                download
              >
                RESUME
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-button ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Mobile Menu Overlay */}
          <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>

          {/* Mobile Menu */}
          <div className={`mobile-nav-links ${isMenuOpen ? 'open' : ''}`}>
            <button
              className={`mobile-nav-link ${activeSection === "home" ? "active" : ""}`}
              onClick={() => scrollToSection(heroRef)}
            >
              HOME
            </button>

            <button
              className={`mobile-nav-link ${activeSection === "about" ? "active" : ""}`}
              onClick={() => scrollToSection(aboutRef)}
            >
              ABOUT
            </button>

            <button
              className={`mobile-nav-link ${activeSection === "projects" ? "active" : ""}`}
              onClick={() => scrollToSection(projectsRef)}
            >
              PROJECTS
            </button>

            <button
              className={`mobile-nav-link ${activeSection === "contact" ? "active" : ""}`}
              onClick={() => scrollToSection(contactRef)}
            >
              CONTACT
            </button>

            <Link 
              href="/resume.pdf" 
              className="mobile-nav-link resume-link"
              download
              onClick={() => setIsMenuOpen(false)}
            >
              RESUME
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="hero-section relative overflow-hidden">
        {/* Prism Background */}
        <div className="absolute inset-0">
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0.5}
            glow={1}
          />
        </div>

        {/* Hero Content */}
        <div className="hero-content relative z-10 text-center">
          <h1 className="hero-title">DWIKI HIDAYAT</h1>
          <p className="hero-subtitle">DESIGNER & DEVELOPER</p>
        </div>
          <div className="scroll-indicator">
            <span>SCROLL DOWN</span>
            <div className="arrow-down"></div>
          </div>
      </section>

      {/* Divider 1 */}
      <div ref={divider1Ref} className="section-divider">
        <div className="divider-text">
          CREATIVE • INNOVATIVE • PASSIONATE • DRIVEN • CREATIVE • INNOVATIVE • PASSIONATE • DRIVEN •CREATIVE • INNOVATIVE • PASSIONATE • DRIVEN • CREATIVE • INNOVATIVE • PASSIONATE • DRIVEN •
        </div>
      </div>

      {/* About Section */}
      <section ref={aboutRef} className="about-section">
        <div className="section-header">
          <h2>ABOUT ME</h2>
        </div>
        <div className="about-content">
          <div className="text-block">
            <p>
              I am an Informatics graduate (GPA 3.76/4.00) with hands-on experience in full-stack web development 
              and machine learning model creation. I’m passionate about building digital solutions that combine 
              functionality, data, and artificial intelligence.
            </p>
          </div>
          <div className="text-block">
            <p>
              I have experience using <strong>Next.js</strong>, <strong>FastAPI</strong>, <strong>TensorFlow</strong>, 
              and <strong>SQL</strong>, and I hold a <strong>TensorFlow Developer Certificate</strong>. 
              I enjoy transforming data into meaningful insights and leveraging AI to enhance user experience.
            </p>
          </div>
          <div className="text-block">
            <p>
              I previously served as a <strong>Machine Learning Developer</strong> at Bangkit Academy 
              (Google x Gojek x Tokopedia), developing a CNN-based deep learning model for mental health detection, 
              and as a <strong>Data Analyst</strong> at PT Revolusi Cita Edukasi, focusing on data cleaning, analysis, 
              and AI-driven storytelling using Global Superstore data.
            </p>
          </div>
          <div className="text-block">
            <p>
              My strengths lie in problem solving, teamwork, and adaptability — 
              with a strong drive to keep learning and explore how data and AI can create impactful innovations.
            </p>
          </div>
        </div>
      </section>

      {/* Divider 2 */}
      <div ref={divider2Ref} className="section-divider">
        <div className="divider-text">
          PORTFOLIO • PROJECTS • DESIGNS • DEVELOPMENTS • PORTFOLIO • PROJECTS • DESIGNS • DEVELOPMENTS •
        </div>
      </div>

      {/* Projects Section */}
      <section ref={projectsRef} className="projects-section">
        <div className="section-header">
          <h2>SELECTED WORK</h2>
        </div>

        <div className="projects-grid">
          {/* Project 1 */}
          <div className="project-item">
            <div className="project-image relative w-full h-[250px] overflow-hidden rounded-lg">
              <Image
                src="/EduScan.png"
                alt="Web Project"
                fill
                className="object-cover"
              />
            </div>
            <h3>Web Identifikasi Gaya Belajar</h3>
            <p>Website Deteksi Gaya Belajar dengan Metode ILS-FSLSM</p>
          </div>

          {/* Project 2 */}
          <div className="project-item">
            <div className="project-image relative w-full h-[250px] overflow-hidden rounded-lg">
              <Image
                src="/MentorHeal.png"
                alt="Application Project"
                fill
                className="object-cover"
              />
            </div>
            <h3>Mentor Heal</h3>
            <p>Aplikasi untuk Deteksi Kesehatan Mental</p>
          </div>

          {/* Project 3 */}
          <div className="project-item">
            <div className="project-image relative w-full h-[250px] overflow-hidden rounded-lg">
              <Image
                src="/mobile-app.jpg"
                alt="Mobile Application"
                fill
                className="object-cover"
              />
            </div>
            <h3>Mobile Application</h3>
            <p>User-centered design for a productivity app</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="contact-section">
        <div className="section-header">
          <h2>GET IN TOUCH</h2>
        </div>
        <div className="contact-content">
          <p className="contact-text">
            Interested in working together? Let's create something amazing.
          </p>
          <a href="dwiki.hidayat37@gmail.com" className="contact-link">
            dwiki.hidayat37@gmail.com
          </a>
        </div>
      </section>
    </div>
  )
}