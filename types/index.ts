import type React from "react"

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  liveUrl: string
  githubUrl: string
  image: string
  featured?: boolean
}

export interface SkillGroup {
  category: string
  icon: React.ReactNode
  techs: string[]
}

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export interface ContactFormErrors {
  firstName?: string
  lastName?: string
  email?: string
  subject?: string
  message?: string
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate: string | null; // null for current position
  description: string;
  achievements: string[];
  technologies: string[];
  type: "full-time" | "part-time" | "contract" | "freelance" | "internship";
  logo?: string;
}