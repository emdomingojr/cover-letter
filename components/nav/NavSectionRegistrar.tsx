"use client";

import { useEffect } from "react";
import { useNavigation } from "./NavigationProvider";

interface NavSection {
  id: string;
  label: string;
}

export function NavSectionRegistrar({ sections }: { sections: NavSection[] }) {
  const { setSections, setActiveId } = useNavigation();

  useEffect(() => {
    setSections(sections);
    
    // ScrollSpy logic
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.observe(element);
      });
    }, 1000);

    return () => {
      setSections([]);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [sections, setSections, setActiveId]);

  return null;
}
