import React from 'react';

const mockAbout = `Experienced software engineer with a passion for building scalable web applications and working with cross-functional teams. Skilled in React, Node.js, Python, and cloud technologies. Always eager to learn and take on new challenges.`;

export default function AboutSection() {
  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-2">About</h2>
      <p className="text-gray-700 whitespace-pre-line">{mockAbout}</p>
    </section>
  );
} 