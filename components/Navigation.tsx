"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  User,
  FolderOpen,
  Code,
  Mail,
  Moon,
  Sun,
  Menu,
  X,
  Rocket,
} from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

const navigationItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "skills", label: "Skills", icon: Code },
  { id: "contact", label: "Contact", icon: Mail },
];

export function   Navigation({
  activeSection,
  onSectionClick,
  isDark,
  onThemeToggle,
}: NavigationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide dock when scrolling down fast, show when scrolling up
      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsExpanded(false);
  };

  return (
    <>
      {/* Floating Dock Navigation */}
      <nav
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        {/* Desktop Dock */}
        <div className="hidden md:flex items-center justify-center">
          <div className="flex items-center space-x-1 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl px-3 py-2 shadow-2xl shadow-black/10 dark:shadow-black/30">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  aria-label={item.label}
                  title={item.label}
                >
                  <Icon className="w-5 h-5" />

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full"></div>
                  )}

                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {item.label}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
                  </div>
                </button>
              );
            })}

            {/* Divider */}
            <div className="w-px h-8 bg-border/50 mx-1"></div>

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ease-out hover:scale-110 text-muted-foreground hover:text-foreground hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              title={`${isDark ? "Light" : "Dark"} mode`}
            >
              <div className="relative w-5 h-5">
                <Sun
                  className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                    isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
                  }`}
                />
                <Moon
                  className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                    isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
                  }`}
                />
              </div>

              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {isDark ? "Light" : "Dark"} mode
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dock */}
        <div className="md:hidden flex items-center justify-center">
          <div className="relative">
            {/* Collapsed State */}
            <div
              className={`flex items-center transition-all duration-300 ${
                isExpanded ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl px-4 py-3 shadow-2xl shadow-black/10 dark:shadow-black/30">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-label="Open navigation menu"
                >
                  <Menu className="w-5 h-5" />
                </button>

                {/* Current section indicator */}
                <div className="flex items-center space-x-2">
                  {(() => {
                    const currentItem = navigationItems.find(
                      (item) => item.id === activeSection
                    );
                    if (currentItem) {
                      const Icon = currentItem.icon;
                      return (
                        <>
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">
                            {currentItem.label}
                          </span>
                        </>
                      );
                    }
                    return null;
                  })()}
                </div>

                <button
                  onClick={onThemeToggle}
                  className="flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                >
                  <div className="relative w-4 h-4">
                    <Sun
                      className={`absolute inset-0 w-4 h-4 transition-all duration-300 ${
                        isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"
                      }`}
                    />
                    <Moon
                      className={`absolute inset-0 w-4 h-4 transition-all duration-300 ${
                        isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"
                      }`}
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* Expanded State */}
            <div
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                isExpanded
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="flex items-center space-x-1 bg-background/90 backdrop-blur-xl border border-border/50 rounded-2xl px-3 py-2 shadow-2xl shadow-black/10 dark:shadow-black/30">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSectionClick(item.id)}
                      className={`flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg scale-105"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:scale-105"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                      aria-label={item.label}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}

                <div className="w-px h-8 bg-border/50 mx-1"></div>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center justify-center w-11 h-11 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
                  aria-label="Close navigation menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Top Brand Bar - Minimal */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex justify-between items-center h-16">
            <button
              onClick={() => handleSectionClick("hero")}
              className="group flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2 -m-2"
              aria-label="Go to home section"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm group-hover:scale-105 transition-transform duration-200">
                  <Rocket className="w-5 h-5" />
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="font-semibold text-lg">Aquib's Portfolio</div>
              </div>
            </button>

            <div className="hidden lg:flex items-center space-x-4">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Available for work
              </Badge>

              <Button
                size="sm"
                onClick={() => handleSectionClick("contact")}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground"
              >
                Let's Talk
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile backdrop when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-background/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
