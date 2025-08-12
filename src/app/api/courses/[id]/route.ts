// this api is used to get a specific course from the database
import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { Course } from '@/types/courses-type';
import CourseModel from '@/models/Course';

async function GET(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const courseId = params.id;

  try {
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const courseWithId = {
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

    return NextResponse.json(courseWithId, { status: 200 });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const courseId = params.id;

  try {
    const course = await CourseModel.findByIdAndDelete(courseId);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json(
      { message: 'Course deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}

async function PUT(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const courseId = params.id;
  const updatedData = await request.json();

  try {
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      updatedData,
      { new: true }
    );
    if (!updatedCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const courseWithId = {
      id: updatedCourse._id.toString(),
      title: updatedCourse.title,
      description: updatedCourse.description,
      instructor: updatedCourse.instructor,
      duration: updatedCourse.duration,
      level: updatedCourse.level,
      price: updatedCourse.price,
      category: updatedCourse.category,
      createdAt: updatedCourse.createdAt,
    } as Course;

    return NextResponse.json(courseWithId, { status: 200 });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

export { GET, DELETE, PUT };
