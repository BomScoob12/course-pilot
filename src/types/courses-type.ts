export type Course = {
    id: string;
    title: string;
    description: string;
    instructor: string;
    duration: number; // in hours
    level: 'beginner' | 'intermediate' | 'advanced';
    price: number; // in USD
    category: string; // e.g., "Programming", "Design", "Marketing"
    rating: number; // average rating out of 5
}
