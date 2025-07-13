import type { ProfileData } from '../../hooks/useProfileData';

interface ExperienceTimelineProps {
  profileData: ProfileData;
}

export default function ExperienceTimeline({ profileData }: ExperienceTimelineProps) {
  const experiences = profileData.experience;

  if (experiences.length === 0) {
    return (
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Experience</h2>
        <p className="text-black dark:text-white italic">No experience added yet. Edit your profile to add your work experience!</p>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="flex">
            <div className="flex-shrink-0">
              <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
              {index < experiences.length - 1 && (
                <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-600 mx-auto mt-2"></div>
              )}
            </div>
            <div className="ml-4 flex-1">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-black dark:text-white">{exp.position}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                <p className="text-black dark:text-white text-sm">
                  {exp.start_date} - {exp.end_date || 'Present'}
                </p>
                {exp.description && (
                  <p className="text-black dark:text-white mt-2 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 