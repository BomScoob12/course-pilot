// this api is used to get the courses from the database
import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { Course } from '@/types/courses-type';
import CourseModel from '@/models/Course';

async function GET() {
  await connectToDatabase();
  const courses = await CourseModel.find().sort({ createdAt: -1 });

  const coursesWithId = courses.map((course) => {
    return {
      id: course._id.toString(),
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      price: course.price,
      category: course.category,
      createdAt: course.createdAt,
    } as Course;
  });

  return NextResponse.json(coursesWithId, { status: 200 });
}

async function POST(request: Request) {
  await connectToDatabase();
  const courseData = await request.json();

  try {
    const newCourse = new CourseModel(courseData);
    await newCourse.save();
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}

export { GET, POST };