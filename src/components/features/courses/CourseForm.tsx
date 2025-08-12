'use client';

import { CourseFormData } from '@/types/courses-type';
import React from 'react';

function CourseForm({
  courseFormData,
  handleSubmit,
}: {
  courseFormData?: CourseFormData;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [formData, setFormData] = React.useState<CourseFormData>({
    title: '',
    description: '',
    instructor: '',
    duration: 0,
    level: 'intermediate',
    price: 0,
    category: '',
  });

  React.useEffect(() => {
    if (courseFormData) {
      setFormData(courseFormData);
    }
    // setFormData(mockCourseFormData); // Using mock data for demonstration
  }, [courseFormData]);

  return (
    <div className="flex-col">
      <h1 className="text-2xl">Create or Edit Course</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={formData.title}
          required
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="description"
          id="description"
          defaultValue={formData.description}
          required
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="instructor"
          id="instructor"
          defaultValue={formData.instructor}
          required
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="duration"
          id="duration"
          defaultValue={formData.duration}
          required
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="level"
          id="level"
          onChange={(e) =>
            setFormData({
              ...formData,
              level: e.target.value as 'beginner' | 'intermediate' | 'advanced',
            })
          }
          defaultValue={formData.level}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <input
          type="number"
          name="price"
          id="price"
          defaultValue={formData.price}
          required
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="category"
          id="category"
          defaultValue={formData.category}
          required
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit">Submit</button>
        <button
          type="reset"
          onClick={() =>
            setFormData({
              title: '',
              description: '',
              instructor: '',
              duration: 0,
              level: 'beginner',
              price: 0,
              category: '',
            })
          }
          className="px-4 py-2 rounded-lg bg-gray-300 text-black hover:bg-gray-400"
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default CourseForm;
