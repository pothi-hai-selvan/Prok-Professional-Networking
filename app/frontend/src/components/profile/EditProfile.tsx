import React, { useEffect, useState, useRef } from "react";
import { getProfile, updateProfile, uploadProfileImage, createProfile } from "../../services/api";
// import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function EditProfile({ onSaved }: { onSaved?: () => void }) {
  // const { token } = useAuth();
  const token = localStorage.getItem('token') || '';
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [creating, setCreating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getProfile(token)
      .then((data) => {
        if (!data || data.error) {
          setCreating(true);
          setProfile({
            full_name: "",
            email: "",
            headline: "",
            location: "",
            bio: "",
            image_url: "",
          });
        } else {
          setProfile({
            ...data,
            headline: data.headline || "",
            location: data.location || "",
          });
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setImageUploading(true);
    setError(null);
    try {
      const res = await uploadProfileImage(token, e.target.files[0]);
      setProfile({ ...profile, image_url: res.image_url });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setImageUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.full_name || profile.full_name.trim() === "") {
      setError("Full Name is required.");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      if (creating) {
        await createProfile(token, profile);
        setSuccess("Profile created!");
      } else {
        await updateProfile(token, profile);
        setSuccess("Profile updated!");
      }
      if (onSaved) onSaved();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <svg className="animate-spin h-10 w-10 text-blue-600" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>
  );
  if (!profile) return <div>No profile data.</div>;

  return (
    <form onSubmit={handleSave} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow space-y-8 mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">
        {creating ? "Create Your Profile" : "Edit Profile"}
      </h2>
      {error && <div className="text-red-600 text-center">{error}</div>}
      {success && <div className="text-green-600 text-center font-semibold">{success}</div>}
      <div className="flex flex-col items-center">
        {profile.image_url && (
          <img src={profile.image_url} alt="Profile" className="w-28 h-28 rounded-full object-cover mb-2 border-4 border-blue-200" />
        )}
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="block mt-2"
          disabled={imageUploading}
        />
        <span className="text-xs text-gray-500 mt-1">JPG or PNG, max 5MB</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            name="full_name"
            value={profile.full_name || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            placeholder="e.g. John Doe"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            name="email"
            value={profile.email || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            placeholder="e.g. john@example.com"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Headline</label>
          <input
            name="headline"
            value={profile.headline || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Software Engineer at TechCorp"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            name="location"
            value={profile.location || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. San Francisco, CA"
          />
        </div>
      </div>
      <div>
        <label className="block font-semibold mb-1">About</label>
        <textarea
          name="bio"
          value={profile.bio || ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={5}
          placeholder="Tell us about yourself, your experience, and your goals..."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
        disabled={saving}
      >
        {saving ? (creating ? "Creating..." : "Saving...") : creating ? "Create" : "Save"}
      </button>
    </form>
  );
} 