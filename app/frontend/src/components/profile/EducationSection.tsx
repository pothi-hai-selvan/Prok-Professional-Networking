import type { ProfileData } from '../../hooks/useProfileData';

interface EducationSectionProps {
  profileData: ProfileData;
}

export default function EducationSection({ profileData }: EducationSectionProps) {
  const education = profileData.education;

  if (education.length === 0) {
    return (
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Education</h2>
        <p className="text-black dark:text-white italic">No education added yet. Edit your profile to add your educational background!</p>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Education</h2>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <h3 className="font-semibold text-black dark:text-white">{edu.degree}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">{edu.institution}</p>
            <p className="text-black dark:text-white">{edu.field_of_study}</p>
            {edu.graduation_year && (
              <p className="text-black dark:text-white text-sm">Graduated {edu.graduation_year}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 