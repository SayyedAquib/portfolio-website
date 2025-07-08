"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Palette,
  Smartphone,
  Database,
  ArrowDown,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { Project, SkillGroup } from "@/types";

const sectionIds = ["hero", "about", "projects", "skills", "contact"];

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);
  const activeSection = useScrollSpy(sectionIds, 100);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldUseDark =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    setIsDark(shouldUseDark);

    if (shouldUseDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");

    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const projects: Project[] = [
    {
      id: "1",
      title: "Food Finder - Restaurant & Dish Explorer",
      description:
        "A dynamic food discovery platform where users can search for restaurants or specific dishes with real-time filtering, category-based suggestions, and persisted user preferences using Redux and localStorage.",
      tech: [
        "React",
        "Redux Toolkit",
        "Tailwind CSS",
        "React Router DOM",
        "Swiggy API",
        "Firebase",
      ],
      liveUrl: "https://aquibs-food-finder.vercel.app",
      githubUrl: "https://github.com/SayyedAquib/Food-Finder",
      image:
        "https://ik.imagekit.io/ftt55iirby/FoodFinder.png?updatedAt=1751903742448",
      featured: true,
    },
    {
      id: "2",
      title: "YouTube Clone - Video Streaming App",
      description:
        "A full-featured YouTube-like application built with React.js, featuring auto-complete search, video playback, category filters, API integration, and live chat functionality using Redux Toolkit.",
      tech: [
        "React",
        "Redux Toolkit",
        "Tailwind CSS",
        "React Router DOM",
        "YouTube API",
      ],
      liveUrl: "https://aquibs-video-streaming-platform.netlify.app/",
      githubUrl: "https://github.com/SayyedAquib/video-streaming-platform",
      image:
        "https://ik.imagekit.io/ftt55iirby/YouTube.png?updatedAt=1751903742447",
      featured: true,
    },
    {
      id: "3",
      title: "Mega Blogs - Blogging Platform",
      description:
        "A modern blog platform where users can create, edit, and manage blog posts with a rich text editor, authentication, and responsive UI using Appwrite for the backend.",
      tech: [
        "React",
        "Appwrite",
        "Redux Toolkit",
        "Tailwind CSS",
        "React Router",
      ],
      liveUrl: "https://aquibs-megablogs.vercel.app/",
      githubUrl: "https://github.com/SayyedAquib/MegaBlogs",
      image:
        "https://ik.imagekit.io/ftt55iirby/MegaBlogs.png?updatedAt=1751903742302",
      featured: true,
    },
    {
      id: "4",
      title: "Trimrr - URL Shortener & Analytics",
      description:
        "A short-link app powered by Supabase with user authentication, QR generation, device and location-based analytics, and a fully responsive dashboard.",
      tech: ["React", "Supabase", "Shadcn/UI", "QRCode.js", "Redux Toolkit"],
      liveUrl: "https://shorrtn.vercel.app/",
      githubUrl: "https://github.com/SayyedAquib/url-shortener",
      image:
        "https://ik.imagekit.io/ftt55iirby/URLShortener.png?updatedAt=1751903742379",
    },
    {
      id: "5",
      title: "Climate - Weather Forecast App",
      description:
        "A feature-rich weather app showing current and future weather, 24-hour temperature graphs, location search, history, and light/dark mode toggle. Built with Tanstack Query for efficient data fetching.",
      tech: [
        "React",
        "Shadcn/UI",
        "Tailwind CSS",
        "OpenWeather API",
        "Tanstack Query",
      ],
      liveUrl: "https://aquibs-climate.netlify.app/",
      githubUrl: "https://github.com/SayyedAquib/Climate",
      image:
        "https://ik.imagekit.io/ftt55iirby/Climate.png?updatedAt=1751903742363",
    },
  ];

  const skills: SkillGroup[] = [
    {
      category: "Frontend",
      icon: <Code className="w-5 h-5" />,
      techs: [
        "React.js",
        "JavaScript",
        "Redux Toolkit",
        "Next.js",
        "TypeScript",
        "HTML5",
        "CSS3",
      ],
    },
    {
      category: "Styling",
      icon: <Palette className="w-5 h-5" />,
      techs: [
        "Tailwind CSS",
        "Shadcn/UI",
        "Framer Motion",
        "Styled Components",
        "CSS Modules",
        "SASS",
      ],
    },
    {
      category: "Backend / Data",
      icon: <Database className="w-5 h-5" />,
      techs: [
        "Node.js",
        "Express.js",
        "Supabase",
        "Appwrite",
        "Firebase",
        "MongoDB",
      ],
    },
    {
      category: "Utilities",
      icon: <Smartphone className="w-5 h-5" />,
      techs: [
        "React Router DOM",
        "QRCode.js",
        "Lucide Icons",
        "Vite",
        "Tanstack Query",
        "Git & GitHub",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navigation
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isDark={isDark}
        onThemeToggle={toggleTheme}
      />

      {/* Hero Section */}
      <section
        id="hero"
        className="py-10 md:pt-20 min-h-screen flex items-center"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Hi, I'm <span className="text-primary">Aquib Sayyed</span>
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
                  Software Engineer & TECH Enthusiast
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  I craft beautiful, responsive web experiences that users love.
                  Specializing in React, Next.js, and modern frontend
                  technologies with a focus on performance and accessibility.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="text-base sm:text-lg px-6 sm:px-8"
                >
                  View My Work
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="text-base sm:text-lg px-6 sm:px-8"
                >
                  Get In Touch
                </Button>
                <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8">
                  <Link
                    href="https://drive.google.com/file/d/105UZYVZsN2sZ3JQHfX5-y_-CmAKe0bxw/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <Link
                    href="tel:+919766188241"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors text-sm sm:text-base"
                  >
                    +91 9766188241
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <Link
                    href="mailto:sayyed.aquib89@gmail.com"
                    className="hover:text-primary transition-colors text-sm sm:text-base"
                  >
                    sayyed.aquib89@gmail.com
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="w-5 h-5 text-primary flex-shrink-0" />
                  <Link
                    href="https://linkedin.com/in/sayyedaquib/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors text-sm sm:text-base"
                  >
                    linkedin.com/in/sayyedaquib
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-primary flex-shrink-0" />
                  <Link
                    href="https://github.com/SayyedAquib"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors text-sm sm:text-base"
                  >
                    github.com/sayyedaquib
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative order-first lg:order-last">
              <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
                <Image
                  src="https://ik.imagekit.io/ftt55iirby/Moody%20Profile%20with%20Glowing%20Headphones.png?updatedAt=1751915259281"
                  alt="Aquib Sayyed - Software Engineer"
                  width={400}
                  height={400}
                  className="relative rounded-full border-4 border-background shadow-2xl w-[400px] h-[400px] object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToSection("about")}
              className="rounded-full"
              aria-label="Scroll to about section"
            >
              <ArrowDown className="hidden md:block w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                About Me
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Passionate about creating exceptional digital experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6">
                <p className="text-base sm:text-lg leading-relaxed">
                  I’m a software engineer with hands-on experience building
                  modern web applications. I specialize in React, Next.js, and
                  TypeScript, with a strong focus on creating intuitive user
                  interfaces and seamless user experiences.
                </p>

                <p className="text-base sm:text-lg leading-relaxed">
                  Currently, I'm focused on building scalable web applications
                  and exploring the latest in web technologies. I love
                  collaborating with designers and backend developers to bring
                  ideas to life while ensuring optimal performance and
                  accessibility.
                </p>

                <p className="text-base sm:text-lg leading-relaxed">
                  When I'm not coding, you can find me contributing to open
                  source projects, writing technical blog posts, or exploring
                  new design trends and emerging technologies.
                </p>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="font-semibold text-lg mb-2">
                      🎯 Current Focus
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Building performant React applications with modern
                      tooling, best practices, and cutting-edge web technologies
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="font-semibold text-lg mb-2">💡 Interests</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Web performance optimization, accessibility standards, and
                      emerging frontend frameworks and tools
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and
              experience in frontend development
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Skills & Technologies
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Technologies I work with to bring ideas to life
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <Card key={index} className="text-center h-full">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                      {skillGroup.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">
                    {skillGroup.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {skillGroup.techs.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Get In Touch
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Let's discuss your next project or just say hello!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                  Let's Connect
                </h3>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  I'm always interested in hearing about new opportunities and
                  interesting projects. Whether you have a question or just want
                  to say hi, feel free to reach out!
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <Link
                      href="tel:+919766188241"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors text-sm sm:text-base"
                    >
                      +91 9766188241
                    </Link>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <Link
                      href="mailto:sayyed.aquib89@gmail.com"
                      className="hover:text-primary transition-colors text-sm sm:text-base"
                    >
                      sayyed.aquib89@gmail.com
                    </Link>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-5 h-5 text-primary flex-shrink-0" />
                    <Link
                      href="https://linkedin.com/in/sayyedaquib/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors text-sm sm:text-base"
                    >
                      linkedin.com/in/sayyedaquib
                    </Link>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Github className="w-5 h-5 text-primary flex-shrink-0" />
                    <Link
                      href="https://github.com/SayyedAquib"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors text-sm sm:text-base"
                    >
                      github.com/sayyedaquib
                    </Link>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 pb-24 border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm sm:text-base text-center md:text-left">
              © {new Date().getFullYear()} Aquib Sayyed. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="https://github.com/SayyedAquib"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-muted/50"
                aria-label="GitHub Profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/sayyedaquib"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-muted/50"
                aria-label="LinkedIn Profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:sayyed.aquib89@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-muted/50"
                aria-label="Send Email"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
