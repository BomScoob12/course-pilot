import React from 'react';

function Card(
  props: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
) {
  return (
    <div
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
      {...props}
    >
      {props.children}
    </div>
  );
}

export default Card;
