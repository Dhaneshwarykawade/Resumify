// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../components/Firebase2";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { updatePassword, deleteUser } from "firebase/auth";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Profile = () => {
  const { user, logout } = useAuth();
  const [resumesCount, setResumesCount] = useState(0);
  const [profile, setProfile] = useState({
    displayName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    bio: "",
    photo: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [preview, setPreview] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [completion, setCompletion] = useState(0);

  // 🔹 Fetch user profile from Firestore
  const fetchUserProfile = async () => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setProfile({
        displayName: data.displayName || user.displayName || "",
        email: user.email || "",
        phone: data.phone || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
        bio: data.bio || "",
        photo: data.photo || user.photoURL || "",
      });
      setPreview(data.photo || user.photoURL || "");
    } else {
      setProfile({
        displayName: user.displayName || "",
        email: user.email || "",
        phone: "",
        linkedin: "",
        github: "",
        bio: "",
        photo: user.photoURL || "",
      });
      setPreview(user.photoURL || "");
    }
  };

  // 🔹 Fetch resume stats
  const fetchResumeStats = async () => {
    if (!user) return;
    const q = query(collection(db, "resumes"), where("userId", "==", user.uid));
    const snapshot = await getDocs(q);
    setResumesCount(snapshot.size);
  };

  useEffect(() => {
    fetchUserProfile();
    fetchResumeStats();
  }, [user]);

  // 🔹 Profile completion
  useEffect(() => {
    const fields = ["displayName", "phone", "linkedin", "github", "bio", "photo"];
    const filled = fields.filter((field) => profile[field] && profile[field].trim() !== "");
    setCompletion(Math.round((filled.length / fields.length) * 100));
  }, [profile]);

  // 🔹 Handle profile picture
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 🔹 Save profile to Firestore
  const handleSave = async () => {
    try {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { ...profile, photo: preview }, { merge: true });
      }
      setProfile((prev) => ({ ...prev, photo: preview }));
      setEditMode(false);
      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile ❌");
    }
  };

  // 🔹 Change password
  const handleChangePassword = async () => {
    if (!newPassword) return alert("Enter a new password!");
    try {
      await updatePassword(user, newPassword);
      alert("Password updated successfully ✅");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      alert("Error: Re-authentication required. Please log out & log in again.");
    }
  };

  // 🔹 Delete account
  const handleDeleteAccount = async () => {
    if (window.confirm("⚠️ Are you sure you want to delete your account?")) {
      try {
        await deleteUser(user);
        alert("Account deleted successfully ❌");
      } catch (err) {
        console.error(err);
        alert("Error: Re-authentication required. Please log out & log in again.");
      }
    }
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // 🔹 Framer-motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.25 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.05 },
  };
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] flex flex-col items-center justify-center px-6 py-16 text-white relative overflow-hidden">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 60, density: { enable: true, area: 800 } },
            color: { value: ["#f59e0b", "#2563eb", "#22d3ee"] },
            shape: { type: "circle" },
            opacity: { value: 0.3 },
            size: { value: { min: 1, max: 4 } },
            move: { enable: true, speed: 1.2, direction: "none", random: false, straight: false, outModes: { default: "out" } },
            links: { enable: true, distance: 150, color: "#94a3b8", opacity: 0.3, width: 1 },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" }, resize: true },
            modes: { repulse: { distance: 120, duration: 0.4 }, push: { quantity: 4 } },
          },
          detectRetina: true,
        }}
      />

      {/* Floating gradient circles */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }} className="absolute top-20 left-20 w-72 h-72 rounded-full bg-[#2563eb] opacity-20 blur-3xl" />
      <motion.div initial={{ scale: 0 }} animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }} className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#f59e0b] opacity-20 blur-3xl" />

      {/* Content Wrapper */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl w-full bg-[#1e293b]/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/10"
      >
        {/* Header */}
        <motion.div variants={cardVariants} className="flex items-center gap-6">
          <div className="relative">
            <img src={preview || "https://via.placeholder.com/120"} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md" />
            {editMode && <input type="file" accept="image/*" onChange={handlePhotoChange} className="absolute bottom-0 left-0 text-xs" />}
          </div>
          <div>
            <motion.h1 variants={cardVariants} className="text-3xl font-extrabold mb-1 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] bg-clip-text text-transparent">{profile.displayName || "User"}</motion.h1>
            <p className="text-gray-300">{profile.email}</p>
            {profile.bio && <p className="mt-1 text-gray-300">{profile.bio}</p>}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-center">
          <motion.div variants={cardVariants} whileHover="hover" className="p-4 bg-[#0f172a]/50 rounded-lg shadow-md border border-white/10">
            <h3 className="text-lg font-bold text-indigo-400">{resumesCount}</h3>
            <p className="text-gray-300">Resumes Created</p>
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover" className="p-4 bg-[#0f172a]/50 rounded-lg shadow-md border border-white/10">
            <h3 className="text-lg font-bold text-green-400">{completion}%</h3>
            <p className="text-gray-300">Profile Completion</p>
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover" className="p-4 bg-[#0f172a]/50 rounded-lg shadow-md border border-white/10">
            <h3 className="text-lg font-bold text-purple-400">Pro</h3>
            <p className="text-gray-300">Account Type</p>
          </motion.div>
        </motion.div>

        {/* Editable Form */}
        <motion.div variants={containerVariants} className="mt-10">
          <h2 className="text-xl font-bold mb-4">{editMode ? "✏️ Edit Profile" : "👤 Profile Details"}</h2>
          <div className="space-y-4">
            {["displayName","phone","linkedin","github","bio"].map((field, i) => (
              <motion.div key={i} variants={cardVariants}>
                {field !== "bio" ? (
                  <input
                    type="text"
                    placeholder={field === "displayName" ? "Full Name" : field === "phone" ? "Phone Number" : field === "linkedin" ? "LinkedIn URL" : "GitHub / Portfolio"}
                    value={profile[field]}
                    disabled={!editMode}
                    onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg bg-[#0f172a]/40 text-white placeholder-gray-400"
                  />
                ) : (
                  <textarea
                    placeholder="Short Bio"
                    value={profile.bio}
                    disabled={!editMode}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg bg-[#0f172a]/40 text-white placeholder-gray-400"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Password Change */}
        <motion.div variants={containerVariants} className="mt-10">
          <h2 className="text-xl font-bold mb-4">🔒 Change Password</h2>
          <motion.div variants={cardVariants} className="flex gap-4">
            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg bg-[#0f172a]/40 text-white placeholder-gray-400" />
            <motion.button variants={buttonVariants} whileHover="hover" onClick={handleChangePassword} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">Update</motion.button>
          </motion.div>
        </motion.div>

        {/* Actions */}
<motion.div variants={containerVariants} className="flex flex-wrap justify-between mt-10 gap-2">
  {editMode ? (
    <>
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        onClick={handleSave}
        className="px-4 py-2 bg-gradient-to-r from-teal-400 to-emerald-500 text-white rounded-lg shadow-lg hover:scale-105 transition"
      >
        Save Changes
      </motion.button>
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        onClick={() => setEditMode(false)}
        className="px-4 py-2 bg-slate-500 text-white rounded-lg shadow-lg hover:bg-slate-600 transition"
      >
        Cancel
      </motion.button>
    </>
  ) : (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      onClick={() => setEditMode(true)}
      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg shadow-lg hover:scale-105 transition"
    >
      Edit Profile
    </motion.button>
  )}
  <motion.button
    variants={buttonVariants}
    whileHover="hover"
    onClick={logout}
    className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-lg shadow-lg hover:scale-105 transition"
  >
    Logout
  </motion.button>
  <motion.button
    variants={buttonVariants}
    whileHover="hover"
    onClick={handleDeleteAccount}
    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-600 text-white rounded-lg shadow-lg hover:scale-105 transition"
  >
    Delete Account
  </motion.button>
</motion.div>

      </motion.div>
    </div>
  );
};

export default Profile;
