import type { ProfileData } from '../../hooks/useProfileData';

interface SkillsSectionProps {
  profileData: ProfileData;
}

export default function SkillsSection({ profileData }: SkillsSectionProps) {
  const skills = profileData.skills.map(skill => ({
    name: skill,
    endorsements: Math.floor(Math.random() * 20) + 1 // Random endorsements for demo
  }));

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Skills & Endorsements</h2>
      {skills.length > 0 ? (
        <ul className="flex flex-wrap gap-4">
          {skills.map((skill, idx) => (
            <li key={idx} className="bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg flex items-center">
              <span className="font-semibold mr-2 text-black dark:text-white">{skill.name}</span>
              <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">{skill.endorsements} endorsements</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-black dark:text-white italic">No skills added yet. Edit your profile to add skills!</p>
      )}
    </section>
  );
} 