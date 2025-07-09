"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, Filter, Download } from "lucide-react";
import type { Experience } from "@/types";
import { ExperienceCard } from "./ExperienceCard";

interface ExperienceSectionProps {
  experiences: Experience[];
  onSectionClick: (section: string) => void;
}

export function ExperienceSection({
  experiences,
  onSectionClick,
}: ExperienceSectionProps) {
  const [filter, setFilter] = useState<string>("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredExperiences = experiences.filter(
    (exp) => filter === "all" || exp.type === filter
  );

  const experienceTypes = Array.from(
    new Set(experiences.map((exp) => exp.type))
  );

  const totalYears = experiences.reduce((total, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate ? new Date(exp.endDate) : new Date();
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    return total + months;
  }, 0);

  const yearsOfExperience = Math.floor(totalYears / 12);

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsExpanded(false);
  };

  return (
    <section id="experience" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Briefcase className="w-8 h-8 text-primary" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Professional Experience
              </h2>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              {yearsOfExperience}+ years of experience building innovative
              solutions and leading development teams
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {experiences.length}
                </div>
                <div className="text-sm text-muted-foreground">Positions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {yearsOfExperience}+
                </div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {
                    Array.from(
                      new Set(experiences.flatMap((exp) => exp.technologies))
                    ).length
                  }
                </div>
                <div className="text-sm text-muted-foreground">
                  Technologies
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className="transition-all duration-200"
              >
                <Filter className="w-4 h-4 mr-1" />
                All ({experiences.length})
              </Button>
              {experienceTypes.map((type) => (
                <Button
                  key={type}
                  variant={filter === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(type)}
                  className="transition-all duration-200 capitalize"
                >
                  {type.replace("-", " ")} (
                  {experiences.filter((exp) => exp.type === type).length})
                </Button>
              ))}
            </div>

            {/* Download Resume Button */}
            <Button variant="outline" className="mb-8 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Main timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block"></div>

            {/* Experience Cards */}
            <div className="space-y-8">
              {filteredExperiences.map((experience, index) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  index={index}
                />
              ))}
            </div>

            {/* Timeline end */}
            <div className="absolute left-4 bottom-0 w-4 h-4 bg-muted rounded-full border-4 border-background hidden md:block"></div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/10">
            <h3 className="text-xl font-semibold mb-2">
              Interested in working together?
            </h3>
            <p className="text-muted-foreground mb-4">
              I'm always open to discussing new opportunities and exciting
              projects.
            </p>
            <Button
              size="lg"
              onClick={() => handleSectionClick("contact")}
              className="bg-gradient-to-r from-primary to-primary/90"
            >
              Let's Connect
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
