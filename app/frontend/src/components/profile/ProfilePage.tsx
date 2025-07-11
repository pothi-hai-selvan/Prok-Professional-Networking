import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";

export default function ProfilePage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.pathname.endsWith("/edit");

  const handleEdit = () => navigate("/profile/edit");
  const handleSaved = () => {
    setRefreshKey((k) => k + 1);
    navigate("/profile");
  };
  const handleBack = () => navigate("/profile");

  return (
    <div className="relative">
      {isEdit ? (
        <div>
          <ProfileEdit onSaved={handleSaved} />
          <button className="mt-4 text-blue-600 underline" onClick={handleBack}>
            Back to Profile
          </button>
        </div>
      ) : (
        <div>
          {/* Edit icon button in top-right */}
          <button
            className="absolute right-4 top-4 bg-white rounded-full p-2 shadow hover:bg-blue-50 transition"
            onClick={handleEdit}
            title="Edit Profile"
            aria-label="Edit Profile"
          >
            {/* Pen SVG icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 17H7v-2a2 2 0 012-2z" />
            </svg>
          </button>
          <ProfileView refreshKey={refreshKey} />
        </div>
      )}
    </div>
  );
} 