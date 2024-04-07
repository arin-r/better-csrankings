export interface Publication {
    author: string;
    affiliation: string;
    points: number;
    FOR: string[];
}

export interface PublicationsByYear {
    [year: string]: Publication[];
}

export interface PublicationWithoutAffiliation {
    author: string;
    points: number;
    FOR: string[];
    year: string;
}

export interface PublicationsByAffiliation {
    [affiliation: string]: PublicationWithoutAffiliation[];
}

export interface Filters {
    startYear: string;
    endYear: string;
    universityName: string;
    areasOfResearch: string[];
}

export const areas: { value: string; label: string }[] = [
  { value: "Artificial intelligence", label: "Artificial Intelligence" },
  { value: "Machine learning", label: "Machine Learning" },
  {
    value: "Computer vision and multimedia computation",
    label: "Computer Vision",
  },
  {
    value: "Data management and data science",
    label: "Data Management",
  },
  {
    value: "Distributed computing and systems software",
    label: "Distributed Computing",
  },
  { value: "Theory of computation", label: "Theory of Computation" },
  { value: "Software engineering", label: "Software Engineering" },
  { value: "Cybersecurity and privacy", label: "Cybersecurity" },
  { value: "Human-centred computing", label: "Human-centred Computing" },
  {
    value: "Graphics, augmented reality and games",
    label: "Graphics and Games",
  },
  { value: "Applied computing", label: "Applied Computing" },
];