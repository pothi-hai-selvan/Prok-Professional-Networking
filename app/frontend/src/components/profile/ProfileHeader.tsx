import React from "react";
import { useNavigate } from "react-router-dom";
import type { Profile } from "../../types";

interface ProfileHeaderProps {
  profile?: Profile;
  isOwnProfile?: boolean;
}

const socialIcons: Record<string, JSX.Element> = {
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.56c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.956-2.178-1.555-3.594-1.555-2.72 0-4.924 2.204-4.924 4.924 0 .386.044.762.127 1.124-4.092-.205-7.719-2.166-10.148-5.144-.424.729-.666 1.577-.666 2.476 0 1.708.87 3.216 2.188 4.099-.807-.026-1.566-.247-2.23-.616v.062c0 2.386 1.697 4.374 3.95 4.827-.413.112-.849.172-1.298.172-.318 0-.626-.031-.927-.089.627 1.956 2.444 3.377 4.6 3.417-1.68 1.317-3.797 2.102-6.102 2.102-.396 0-.787-.023-1.175-.069 2.179 1.397 4.768 2.213 7.557 2.213 9.054 0 14.009-7.504 14.009-14.009 0-.213-.005-.425-.014-.636.962-.695 1.797-1.562 2.457-2.549z"/></svg>
  ),
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.588 8.2-6.084 8.2-11.386 0-6.627-5.373-12-12-12z"/></svg>
  ),
  website: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10-4.486 10-10-4.486-10-10-10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/></svg>
  ),
};

function getProfileCompleteness(profile: Profile): number {
  let filled = 0;
  let total = 7;
  if (profile.avatar_url) filled++;
  if (profile.bio) filled++;
  if (profile.title) filled++;
  if (profile.location) filled++;
  if (profile.skills && profile.skills.length > 0) filled++;
  if (profile.experience && profile.experience.length > 0) filled++;
  if (profile.education && profile.education.length > 0) filled++;
  return Math.round((filled / total) * 100);
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, isOwnProfile }) => {
  if (!profile) return null;
  const completeness = getProfileCompleteness(profile);
  const navigate = useNavigate();
  return (
    <section className="relative mb-8">
      {/* Banner */}
      <div className="h-40 md:h-56 w-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-xl relative">
        {/* Edit icon */}
        {isOwnProfile && (
          <button
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:bg-blue-50 transition z-10"
            title="Edit Profile"
            onClick={() => navigate('/app/profile/edit')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 17H7v-2a2 2 0 012-2z" />
            </svg>
          </button>
        )}
        {/* Profile Picture - now top left */}
        <div className="absolute -bottom-12 left-8 z-10 flex items-center gap-6">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.title || profile.bio || "Profile"}
              className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg object-cover bg-white"
            />
          ) : (
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center text-5xl text-gray-400">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
          {/* User's Full Name */}
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">{profile.full_name}</span>
          </div>
        </div>
      </div>
      {/* Main Card */}
      <div className="bg-white rounded-b-xl shadow-lg pt-20 pb-8 px-6 md:px-12 text-center relative z-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{profile.title}</h1>
        <p className="text-lg text-gray-600 mb-1">{profile.bio}</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-4">
          <span className="text-gray-500 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {profile.location}
          </span>
          {profile.connections_count !== undefined && (
            <span className="text-gray-500 flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {profile.connections_count} connections
            </span>
          )}
          {profile.mutual_connections !== undefined && (
            <span className="text-gray-500 flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {profile.mutual_connections} mutual
            </span>
          )}
        </div>
        {/* Social Links */}
        {profile.social_links && (
          <div className="flex justify-center gap-4 mb-4">
            {Object.entries(profile.social_links).map(([key, value]) =>
              value ? (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                  title={key.charAt(0).toUpperCase() + key.slice(1)}
                >
                  {socialIcons[key]}
                </a>
              ) : null
            )}
          </div>
        )}
        {/* Profile Completeness */}
        <div className="w-full max-w-md mx-auto mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Profile Completeness</span>
            <span>{completeness}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all"
              style={{ width: `${completeness}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader; 