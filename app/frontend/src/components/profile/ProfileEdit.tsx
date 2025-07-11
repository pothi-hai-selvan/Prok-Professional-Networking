import React, { useEffect, useState } from "react";
import { profileApi } from "./api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { mockProfile } from "./mockData";
import type { Profile, Experience, Education } from "../../types";

const emptyExperience: Experience = { id: Date.now(), title: "", company: "", start_date: "", end_date: "", description: "" };
const emptyEducation: Education = { id: Date.now(), school: "", degree: "", field: "", start_date: "", end_date: "" };

export default function ProfileEdit({ onSaved }: { onSaved?: () => void }) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setLoading(true);
    profileApi.getProfile()
      .then((data) => setProfile(data || mockProfile))
      .catch(() => setProfile(mockProfile))
      .finally(() => setLoading(false));
  }, []);

  // Handlers for all fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!profile) return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Experience
  const handleExpChange = (idx: number, field: string, value: string) => {
    if (!profile) return;
    const updated = [...profile.experience];
    updated[idx] = { ...updated[idx], [field]: value };
    setProfile({ ...profile, experience: updated });
  };
  const addExperience = () => {
    if (!profile) return;
    setProfile({ ...profile, experience: [...profile.experience, { ...emptyExperience, id: Date.now() }] });
  };
  const removeExperience = (idx: number) => {
    if (!profile) return;
    setProfile({ ...profile, experience: profile.experience.filter((_, i) => i !== idx) });
  };

  // Education
  const handleEduChange = (idx: number, field: string, value: string) => {
    if (!profile) return;
    const updated = [...profile.education];
    updated[idx] = { ...updated[idx], [field]: value };
    setProfile({ ...profile, education: updated });
  };
  const addEducation = () => {
    if (!profile) return;
    setProfile({ ...profile, education: [...profile.education, { ...emptyEducation, id: Date.now() }] });
  };
  const removeEducation = (idx: number) => {
    if (!profile) return;
    setProfile({ ...profile, education: profile.education.filter((_, i) => i !== idx) });
  };

  // Skills
  const [skillInput, setSkillInput] = useState("");
  const addSkill = () => {
    if (!profile || !skillInput.trim()) return;
    setProfile({ ...profile, skills: [...profile.skills, skillInput.trim()] });
    setSkillInput("");
  };
  const removeSkill = (idx: number) => {
    if (!profile) return;
    setProfile({ ...profile, skills: profile.skills.filter((_, i) => i !== idx) });
  };

  // TODO: Add featured, recommendations support after backend update

  // Save (only send supported fields for now)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    if (!profile.full_name || profile.full_name.trim() === "") {
      setError("Full Name is required.");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await profileApi.updateProfile({
        full_name: profile.full_name,
        bio: profile.bio,
        location: profile.location,
        is_private: profile.is_private,
      });
      // Update AuthContext with new name
      setUser((prev) => prev ? { ...prev, name: profile.full_name } : prev);
      setSuccess("Profile updated!");
      if (onSaved) onSaved();
      setTimeout(() => navigate("/app/profile"), 1200);
    } catch (e: any) {
      setError(e.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!imageFile) return;
    setUploading(true);
    setError(null);
    try {
      const res = await profileApi.uploadImage(imageFile);
      if (res.image_url) {
        setProfile((prev) => prev ? { ...prev, image_url: res.image_url } : prev);
        setSuccess('Profile image updated!');
        setImageFile(null);
        setImagePreview(null);
      } else {
        setError(res.error || 'Image upload failed');
      }
    } catch (e: any) {
      setError(e.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (loading || !profile) return <div className="flex justify-center items-center h-96">Loading...</div>;

  return (
    <form onSubmit={handleSave} className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-xl space-y-10 mt-10">
      <h2 className="text-4xl font-bold mb-6 text-center">Edit Profile</h2>
      {error && <div className="text-red-600 text-center text-lg">{error}</div>}
      {success && <div className="text-green-600 text-center font-semibold text-lg">{success}</div>}
      {/* Profile Image Upload */}
      <div className="flex flex-col items-center mb-6">
        <div className="mb-2">
          <img
            src={imagePreview || profile.image_url || '/default-avatar.png'}
            alt="Profile Preview"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2"
        />
        <button
          type="button"
          onClick={handleImageUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition"
          disabled={!imageFile || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>
      {/* Full Name */}
      <div>
        <label className="block font-semibold mb-2 text-lg">Full Name</label>
        <input
          name="full_name"
          value={profile.full_name || ""}
          onChange={handleChange}
          className="w-full border rounded-2xl px-4 py-3 text-base"
          placeholder="Your full name"
          required
        />
      </div>
      {/* About */}
      <div>
        <label className="block font-semibold mb-2 text-lg">About</label>
        <textarea
          name="bio"
          value={profile.bio || ""}
          onChange={handleChange}
          className="w-full border rounded-2xl px-4 py-3 text-base"
          rows={4}
          placeholder="Tell us about yourself, your experience, and your goals..."
        />
      </div>
      {/* Experience */}
      <div>
        <label className="block font-semibold mb-2 text-lg">Experience</label>
        {(profile.experience || []).map((exp, idx) => (
          <div key={exp.id} className="border rounded-2xl p-4 mb-2 flex flex-col gap-2 bg-gray-50">
            <input
              type="text"
              placeholder="Title"
              value={exp.title}
              onChange={e => handleExpChange(idx, "title", e.target.value)}
              className="border rounded-2xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={e => handleExpChange(idx, "company", e.target.value)}
              className="border rounded-2xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Start Date"
              value={exp.start_date}
              onChange={e => handleExpChange(idx, "start_date", e.target.value)}
              className="border rounded-2xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="End Date"
              value={exp.end_date}
              onChange={e => handleExpChange(idx, "end_date", e.target.value)}
              className="border rounded-2xl px-3 py-2"
            />
            <textarea
              placeholder="Description"
              value={exp.description}
              onChange={e => handleExpChange(idx, "description", e.target.value)}
              className="border rounded-2xl px-3 py-2"
              rows={2}
            />
            <button type="button" onClick={() => removeExperience(idx)} className="text-red-500 text-xs self-end rounded-full px-3 py-1 hover:bg-red-100">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addExperience} className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition mt-2">Add Experience</button>
      </div>
      {/* Education */}
      <div>
        <label className="block font-semibold mb-2 text-lg">Education</label>
        {(profile.education || []).map((edu, idx) => (
          <div key={edu.id} className="border rounded-2xl p-4 mb-2 flex flex-col gap-2 bg-gray-50">
            <input
              type="text"
              placeholder="School"
              value={edu.school}
              onChange={e => handleEduChange(idx, "school", e.target.value)}
              className="border rounded-2xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={e => handleEduChange(idx, "degree", e.target.value)}
              className="border rounded-2xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Field"
              value={edu.field}
              onChange={e => handleEduChange(idx, "field", e.target.value)}
              className="border rounded-2xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="Start Date"
              value={edu.start_date}
              onChange={e => handleEduChange(idx, "start_date", e.target.value)}
              className="border rounded-2xl px-3 py-2"
            />
            <input
              type="text"
              placeholder="End Date"
              value={edu.end_date}
              onChange={e => handleEduChange(idx, "end_date", e.target.value)}
              className="border rounded-2xl px-3 py-2"
            />
            <button type="button" onClick={() => removeEducation(idx)} className="text-red-500 text-xs self-end rounded-full px-3 py-1 hover:bg-red-100">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addEducation} className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition mt-2">Add Education</button>
      </div>
      {/* Skills */}
      <div>
        <label className="block font-semibold mb-2 text-lg">Skills</label>
        <div className="flex gap-2 mb-2 flex-wrap">
          <input
            type="text"
            placeholder="Add a skill"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            className="border rounded-2xl px-3 py-2 flex-1"
          />
          <button type="button" onClick={addSkill} className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition">Add</button>
        </div>
        <ul className="flex flex-wrap gap-2">
          {(profile.skills || []).map((skill, idx) => (
            <li key={idx} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center gap-1">
              {skill}
              <button type="button" onClick={() => removeSkill(idx)} className="text-red-500 text-xs ml-1 rounded-full px-2 py-1 hover:bg-red-100">x</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Recommendations */}
      {/* <div>
        <label className="block font-semibold mb-2 text-lg">Recommendations</label>
        <div className="flex gap-2 mb-2 flex-wrap">
          <input
            type="text"
            placeholder="Add a recommendation (text only)"
            value={recInput}
            onChange={e => setRecInput(e.target.value)}
            className="border rounded-2xl px-3 py-2 flex-1"
          />
          <button type="button" onClick={addRecommendation} className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-600 transition">Add</button>
        </div>
        <ul>
          {(profile.recommendations || []).map((rec, idx) => (
            <li key={idx} className="flex items-center gap-2 mb-1">
              <span className="text-gray-700">{rec}</span>
              <button type="button" onClick={() => removeRecommendation(idx)} className="text-red-500 text-xs ml-2 rounded-full px-2 py-1 hover:bg-red-100">Remove</button>
            </li>
          ))}
        </ul>
      </div> */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-blue-700 transition"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save All Changes"}
      </button>
    </form>
  );
} 