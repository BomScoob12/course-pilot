import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-col">
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
      <div className="flex justify-center">
        <Link href="/my-courses">
          <button className="px-4 py-2 rounded hover:bg-gray-300">
            View My Courses
          </button>
        </Link>
      </div>
    </div>
  );
}
