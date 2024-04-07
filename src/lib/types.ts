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