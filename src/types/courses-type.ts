export type Course = {
    id: string;
    title: string;
    description: string;
    instructor: string;
    duration: number; // in hours
    level: 'beginner' | 'intermediate' | 'advanced';
    price: number; // in USD
    category: string; // e.g., "Programming", "Design", "Marketing"
}

export type CourseFormData = {
    title: string;
    description: string;
    instructor: string;
    duration: number; // in hours
    level: 'beginner' | 'intermediate' | 'advanced';
    price: number; // in USD
    category: string; // e.g., "Programming", "Design", "Marketing"
}