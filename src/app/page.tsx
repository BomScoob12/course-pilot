'use client';
import ChatBox from '@/components/features/ai-chatbox/ChatBox';
import CourseForm from '@/components/features/courses/CourseForm';
import { CourseFormData } from '@/types/courses-type';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  const [promptValue, setPromptValue] = React.useState<string>('');

  const [courseForm, setCourseForm] = React.useState<CourseFormData>({
    title: '',
    description: '',
    instructor: '',
    duration: 0,
    level: 'intermediate',
    price: 0,
    category: '',
  });

  const handleCourseSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      title: (form.title as unknown as HTMLInputElement).value,
      description: form.description.value,
      instructor: form.instructor.value,
      duration: Number(form.duration.value),
      level: form.level.value as 'beginner' | 'intermediate' | 'advanced',
      price: Number(form.price.value),
      category: form.category.value,
    };
    console.log('Form submitted:', data);
    fetch('/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        console.log('Course created successfully:', result);
        setCourseForm({
          title: '',
          description: '',
          instructor: '',
          duration: 0,
          level: 'intermediate',
          price: 0,
          category: '',
        });
      })
      .catch((error) => {
        console.error('Error creating course:', error);
      });
  };

  const handlePromptSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Prompt submitted:', promptValue);
    fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: promptValue }),
    });
  };

  React.useEffect(() => {
    console.log(promptValue);
  });

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center my-8">
        Welcome to the Course Pilot
      </h1>
      <p className="text-lg text-center mb-4">AI powered course creation.</p>
      <div>
        <p className="text-center mb-4">
          This is a demo application showcasing how to create courses using AI.
          You can create, edit, and view courses.
        </p>
        <p className="text-center mb-4">
          The application is built using Next.js, TypeScript, and Tailwind CSS.
          It uses AI to generate course content and provides a simple interface
          for managing courses.
        </p>
      </div>
      <div className="w-4/5 items-center mt-6">
        <ChatBox
          promptValue={promptValue}
          setPromptValue={setPromptValue}
          handleSubmit={handlePromptSubmit}
        />
      </div>
      <div className="w-4/5 items-center mt-6">
        <CourseForm
          courseFormData={courseForm}
          handleSubmit={handleCourseSubmit}
        />
      </div>
      <div className="flex justify-center">
        <Link href="/my-courses">
          <button className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800">
            View My Courses
          </button>
        </Link>
      </div>
    </div>
  );
}
