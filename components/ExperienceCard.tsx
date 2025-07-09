"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Experience } from "@/types";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? "s" : ""}`;
    } else {
      return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${
        remainingMonths !== 1 ? "s" : ""
      }`;
    }
  };

  const getTypeColor = (type: Experience["type"]) => {
    switch (type) {
      case "full-time":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "part-time":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "contract":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "freelance":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "internship":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="relative">
      {/* Timeline connector */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent hidden md:block"></div>

      {/* Timeline dot */}
      <div className="absolute left-4 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg hidden md:block z-10"></div>

      <Card
        className={`ml-0 md:ml-16 group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-l-4 border-l-primary/20 hover:border-l-primary ${
          index % 2 === 0 ? "hover:bg-muted/30" : "hover:bg-primary/5"
        }`}
        style={{
          animationDelay: `${index * 150}ms`,
          animation: "slideInFromRight 0.6s ease-out forwards",
        }}
      >
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start space-x-4 flex-1">
              {/* Company Logo */}
              {experience.logo && (
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={experience.logo || "/placeholder.svg"}
                      alt={`${experience.company} logo`}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {experience.title}
                  </h3>
                  <Badge
                    className={`w-fit text-xs ${getTypeColor(experience.type)}`}
                  >
                    {experience.type.replace("-", " ")}
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground mb-3">
                  <div className="flex items-center space-x-2">
                    {experience.companyUrl ? (
                      <Link
                        href={experience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:text-primary transition-colors duration-200 flex items-center space-x-1"
                      >
                        <span>{experience.company}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span className="font-semibold">
                        {experience.company}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-1 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{experience.location}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {formatDate(experience.startDate)} -{" "}
                      {experience.endDate
                        ? formatDate(experience.endDate)
                        : "Present"}
                    </span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <span className="font-medium">
                    {calculateDuration(
                      experience.startDate,
                      experience.endDate
                    )}
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  {experience.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {experience.technologies
                    .slice(0, isExpanded ? undefined : 6)
                    .map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  {experience.technologies.length > 6 && !isExpanded && (
                    <Badge variant="outline" className="text-xs">
                      +{experience.technologies.length - 6} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Achievements - Collapsible */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              isExpanded
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="border-t pt-4">
              <h4 className="font-semibold text-foreground mb-3 flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Key Achievements
              </h4>
              <ul className="space-y-2">
                {experience.achievements.map(
                  (achievement, achievementIndex) => (
                    <li
                      key={achievementIndex}
                      className="flex items-start space-x-3 text-muted-foreground"
                      style={{
                        animationDelay: `${achievementIndex * 100}ms`,
                        animation: isExpanded
                          ? "slideInFromLeft 0.4s ease-out forwards"
                          : "none",
                      }}
                    >
                      <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="leading-relaxed">{achievement}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-primary hover:text-primary hover:bg-primary/10 transition-all duration-200"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Show Details
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
