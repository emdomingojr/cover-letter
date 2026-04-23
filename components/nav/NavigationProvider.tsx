"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface NavSection {
  id: string;
  label: string;
}

interface NavigationContextType {
  sections: NavSection[];
  setSections: (sections: NavSection[]) => void;
  isScrolled: boolean;
  setIsScrolled: (isScrolled: boolean) => void;
  activeId: string | null;
  setActiveId: (activeId: string | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<NavSection[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <NavigationContext.Provider value={{ 
      sections, 
      setSections, 
      isScrolled, 
      setIsScrolled,
      activeId,
      setActiveId
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
