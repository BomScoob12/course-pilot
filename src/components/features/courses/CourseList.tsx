import Card from '@/components/ui/Card';
import { Course } from '@/types/courses-type';
import React from 'react';

function CourseList({
  courses,
  isEdit,
}: {
  courses: Course[];
  isEdit?: boolean;
}) {
    
  if (!courses || courses.length === 0) {
    return <div className="text-center p-4">No courses available.</div>;
  }

  const courseList = courses.map((course) => (
    <Card key={course.id}>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>Instructor: {course.instructor}</p>
      <p>Duration: {course.duration} hours</p>
      <p>Level: {course.level}</p>
      <p>Price: ${course.price}</p>
      <p>Category: {course.category}</p>
      <p>Rating: {course.rating} / 5</p>
      {isEdit && (
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Edit Course
        </button>
      )}
    </Card>
  ));

  return <div>{courseList}</div>;
}

export default CourseList;
