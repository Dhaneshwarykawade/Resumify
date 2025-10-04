// src/pages/EditResume.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../components/Firebase2";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const EditResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const docRef = doc(db, "resumes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setResume(docSnap.data());
        } else {
          alert("Resume not found!");
          navigate("/my-resumes");
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResume((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, subField, value) => {
    const updated = [...(resume[field] || [])];
    updated[index][subField] = value;
    setResume((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field, newItem) => {
    setResume((prev) => {
      const current = prev[field] || [];
      if (current.length > 0) {
        const lastItem = current[current.length - 1];
        const isEmpty = Object.values(lastItem).every((v) => !v);
        if (isEmpty) return prev;
      }
      return { ...prev, [field]: [...current, newItem] };
    });
  };

  const removeArrayItem = (field, index) => {
    setResume((prev) => {
      const updated = [...(prev[field] || [])];
      updated.splice(index, 1);
      return { ...prev, [field]: updated };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "resumes", id);
      await updateDoc(docRef, resume);
      alert("Resume updated successfully!");
      navigate("/my-resumes");
    } catch (error) {
      console.error("Error updating resume:", error);
      alert("Failed to update resume.");
    }
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (!resume) return null;

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.25 } } };
  const cardVariants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const particlesInit = async (main) => await loadFull(main);

  const renderSection = (field, placeholderFields, label) => (
    <div>
      <label className="block text-gray-200 font-medium mb-2">{label}</label>
      {Array.isArray(resume[field]) &&
        resume[field].map((item, i) => (
          <div key={i} className="relative border border-white/20 p-4 rounded-xl mb-3 bg-[#1e293b]/50 backdrop-blur-md">
            {placeholderFields.map(({ name, placeholder }) =>
              name === "description" ? (
                <textarea
                  key={name}
                  placeholder={placeholder}
                  value={item[name] || ""}
                  onChange={(e) => handleArrayChange(field, i, name, e.target.value)}
                  className="w-full border border-white/30 bg-transparent px-3 py-2 rounded-lg mb-2 text-white placeholder-gray-400"
                />
              ) : (
                <input
                  key={name}
                  type="text"
                  placeholder={placeholder}
                  value={item[name] || ""}
                  onChange={(e) => handleArrayChange(field, i, name, e.target.value)}
                  className="w-full border border-white/30 bg-transparent px-3 py-2 rounded-lg mb-2 text-white placeholder-gray-400"
                />
              )
            )}
            <button
              type="button"
              onClick={() => removeArrayItem(field, i)}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              ❌
            </button>
          </div>
        ))}
      <button
        type="button"
        onClick={() =>
          addArrayItem(
            field,
            placeholderFields.reduce((acc, cur) => ({ ...acc, [cur.name]: "" }), {})
          )
        }
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mb-4"
      >
        + Add {label}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] flex flex-col items-center px-6 py-16 relative overflow-hidden text-white">
      <Particles id="tsparticles" init={particlesInit} className="absolute inset-0 z-0" options={{
        background: { color: "transparent" },
        fpsLimit: 60,
        particles: { number: { value: 60, density: { enable: true, area: 800 } }, color: { value: ["#f59e0b","#2563eb","#22d3ee"] }, shape: { type: "circle" }, opacity: { value: 0.3 }, size: { value: { min: 1, max: 4 } }, move: { enable: true, speed: 1.2, direction: "none", random: false, straight: false, outModes: { default: "out" } }, links: { enable: true, distance: 150, color: "#94a3b8", opacity: 0.3, width: 1 } },
        interactivity: { events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" }, resize: true }, modes: { repulse: { distance: 120, duration: 0.4 }, push: { quantity: 4 } } },
        detectRetina: true,
      }} />

      <motion.div initial={{ scale: 0 }} animate={{ scale: [1,1.2,1] }} transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }} className="absolute top-20 left-20 w-72 h-72 rounded-full bg-[#2563eb] opacity-20 blur-3xl" />
      <motion.div initial={{ scale: 0 }} animate={{ scale: [1.2,1,1.2] }} transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }} className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#f59e0b] opacity-20 blur-3xl" />

      <div className="relative z-10 max-w-4xl w-full bg-[#1e293b]/60 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <motion.h2 initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] bg-clip-text text-transparent text-center">
          Edit Resume
        </motion.h2>
        <form onSubmit={handleSave} className="space-y-6">
          {["fullName","title","email","phone","location","linkedin","github"].map((field) => (
            <div key={field}>
              <label className="block text-gray-200 font-medium capitalize mb-1">{field}</label>
              <input type="text" name={field} value={resume[field]||""} onChange={handleChange} className="w-full border border-white/30 bg-transparent px-3 py-2 rounded-lg text-white placeholder-gray-400" />
            </div>
          ))}

          <div>
            <label className="block text-gray-200 font-medium mb-1">Summary</label>
            <textarea name="summary" value={resume.summary||""} onChange={handleChange} rows="4" className="w-full border border-white/30 bg-transparent px-3 py-2 rounded-lg text-white placeholder-gray-400" />
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-1">Skills (comma separated)</label>
            <input type="text" value={Array.isArray(resume.skills)?resume.skills.join(", "):resume.skills||""} onChange={(e)=>setResume(prev=>({...prev, skills:e.target.value.split(",").map(s=>s.trim())}))} className="w-full border border-white/30 bg-transparent px-3 py-2 rounded-lg text-white placeholder-gray-400" />
          </div>

          {renderSection("experience",[{name:"title",placeholder:"Job Title"},{name:"company",placeholder:"Company"},{name:"description",placeholder:"Description"}],"Experience")}
          {renderSection("education",[{name:"degree",placeholder:"Degree"},{name:"university",placeholder:"University"}],"Education")}
          {renderSection("projects",[{name:"name",placeholder:"Project Name"},{name:"description",placeholder:"Description"}],"Project")}
          {renderSection("internship",[{name:"role",placeholder:"Role"},{name:"company",placeholder:"Company"},{name:"description",placeholder:"Description"}],"Internship")}
          {renderSection("volunteerWork",[{name:"organization",placeholder:"Organization"},{name:"role",placeholder:"Role"},{name:"description",placeholder:"Description"}],"Volunteer Work")}

          {["certifications","achievements","languages","hobbies"].map((field)=>(
            <div key={field}>
              <label className="block text-gray-200 font-medium mb-1">{field.charAt(0).toUpperCase()+field.slice(1)} (comma separated)</label>
              <input type="text" value={Array.isArray(resume[field])?resume[field].join(", "):resume[field]||""} onChange={(e)=>setResume(prev=>({...prev,[field]:e.target.value.split(",").map(s=>s.trim())}))} className="w-full border border-white/30 bg-transparent px-3 py-2 rounded-lg text-white placeholder-gray-400" />
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <button type="button" onClick={()=>navigate("/my-resumes")} className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditResume;
