export type Profile = {
    name: string;
    email: string;
    experience: Experience[];
    skills: string[];
    information: {
        bio: string;
        location: string;
        website: string;
    };
    isDeleted: boolean;
};

export type Experience = {
    title: string;
    company: string;
    dates: string;
    description: string;
};