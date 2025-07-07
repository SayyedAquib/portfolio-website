import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-lg">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={`Screenshot of ${project.title}`}
          width={400}
          height={250}
          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* {project.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
          </div>
        )} */}
      </div>

      <CardHeader className="flex-grow">
        <CardTitle className="text-lg sm:text-xl line-clamp-2">{project.title}</CardTitle>
        <CardDescription className="text-sm sm:text-base line-clamp-3">{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Live Demo</span>
              <span className="sm:hidden">Demo</span>
            </Link>
          </Button>

          <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">Source Code</span>
              <span className="sm:hidden">Code</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
