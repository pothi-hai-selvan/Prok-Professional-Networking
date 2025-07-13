import type { ProfileData } from '../../hooks/useProfileData';

interface AboutSectionProps {
  profileData: ProfileData;
}

export default function AboutSection({ profileData }: AboutSectionProps) {
  const aboutText = profileData.bio || 'No bio available. Edit your profile to add a bio!';

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-2 text-black dark:text-white">About</h2>
      <p className="text-black dark:text-white whitespace-pre-line">{aboutText}</p>
    </section>
  );
} 