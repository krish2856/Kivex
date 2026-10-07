"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ProjectModalContextType {
  isOpen: boolean;
  preSelectedService: string | null;
  openProjectModal: (serviceName?: string) => void;
  closeProjectModal: () => void;
}

const ProjectModalContext = createContext<ProjectModalContextType | undefined>(
  undefined
);

export function ProjectModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState<string | null>(
    null
  );

  const openProjectModal = (serviceName?: string) => {
    if (serviceName) {
      setPreSelectedService(serviceName);
    } else {
      setPreSelectedService(null);
    }
    setIsOpen(true);
  };

  const closeProjectModal = () => {
    setIsOpen(false);
    setPreSelectedService(null);
  };

  return (
    <ProjectModalContext.Provider
      value={{
        isOpen,
        preSelectedService,
        openProjectModal,
        closeProjectModal,
      }}
    >
      {children}
    </ProjectModalContext.Provider>
  );
}

export function useProjectModal() {
  const context = useContext(ProjectModalContext);
  if (!context) {
    throw new Error(
      "useProjectModal must be used within a ProjectModalProvider"
    );
  }
  return context;
}
