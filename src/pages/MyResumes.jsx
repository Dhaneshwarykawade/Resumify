// src/pages/MyResumes.jsx
import React, { useEffect, useState } from "react";
import { db } from "../components/Firebase2";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import {
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookShareButton,
  WhatsappIcon,
  LinkedinIcon,
  TwitterIcon,
  EmailIcon,
  FacebookIcon,
} from "react-share";

import ResumePreview from "../components/ResumePreview";
import { pdf } from "@react-pdf/renderer";
import ResumeTemplate1 from "../pages/ResumeTemplate1"; // import your template(s)

const MyResumes = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewResume, setPreviewResume] = useState(null);
  const [shareResume, setShareResume] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const navigate = useNavigate();

  const fetchResumes = async () => {
    setLoading(true);
    const q = query(collection(db, "resumes"), where("userId", "==", user.uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setResumes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      await deleteDoc(doc(db, "resumes", id));
      fetchResumes();
    }
  };

  const handleShare = (resume) => setShareResume(resume);

  const handlePrint = async (resume) => {
    const Template =
      selectedTemplate === "template1"
        ? ResumeTemplate1
        : selectedTemplate === "template2"
        ? ResumeTemplate2
        : ResumeTemplate3;

    const blob = await pdf(<Template resume={resume} />).toBlob();
    const blobURL = URL.createObjectURL(blob);
    const printWindow = window.open(blobURL);
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
      };
    }
  };

  const particlesInit = async (main) => await loadFull(main);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] relative overflow-hidden px-6 py-16 text-white">
      {/* Particles */}
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
            move: { enable: true, speed: 1.2, outModes: { default: "out" } },
            links: { enable: true, distance: 150, color: "#94a3b8", opacity: 0.3, width: 1 },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" }, resize: true },
            modes: { repulse: { distance: 120, duration: 0.4 }, push: { quantity: 4 } },
          },
          detectRetina: true,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-12 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] bg-clip-text text-transparent text-center"
        >
          My Resumes
        </motion.h1>

        {loading ? (
          <p className="text-gray-300 text-center">Loading...</p>
        ) : resumes.length === 0 ? (
          <p className="text-gray-300 text-center">No resumes found.</p>
        ) : (
          <div className="relative timeline">
            {resumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="timeline-item mb-8 flex flex-col md:flex-row items-start md:items-center gap-4"
              >
                {/* Timeline marker */}
                <div className="timeline-marker bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] w-5 h-5 rounded-full mt-2 md:mt-0" />
                {/* Content */}
                <div className="flex-1 p-6 rounded-xl border border-white/10 bg-[#1e293b]/50 backdrop-blur-md shadow-lg flex flex-col justify-between hover:scale-105 transition-transform duration-300">
                  <div>
                    <h2 className="text-2xl font-bold text-[#f59e0b]">{resume.fullName}</h2>
                    {resume.title && <p className="text-gray-300 mt-1">{resume.title}</p>}
                    {resume.skills && (
                      <p className="text-gray-400 mt-2 text-sm">
                        Skills: {Array.isArray(resume.skills) ? resume.skills.join(", ") : resume.skills}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 justify-end">
                    <button onClick={() => setPreviewResume(resume)} className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                      Preview
                    </button>
                    <button onClick={() => navigate(`/edit-resume/${resume.id}`)} className="px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition">
                      Edit
                    </button>
                    <button onClick={() => handleShare(resume)} className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                      Share
                    </button>
                    <button onClick={() => handleDelete(resume.id)} className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition">
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Vertical line for timeline */}
            <div className="absolute top-0 left-2.5 md:left-2 w-1 h-full bg-gradient-to-b from-[#f59e0b] via-[#2563eb] to-[#22d3ee] opacity-40"></div>
          </div>
        )}

        {/* Preview and Share Modals same as before */}
        {previewResume && <PreviewModal resume={previewResume} onClose={() => setPreviewResume(null)} />}
        {shareResume && <ShareModal resume={shareResume} onClose={() => setShareResume(null)} />}
      </div>
    </div>
  );
};

// Optional: Extract Preview and Share Modals as separate components for cleaner code
const PreviewModal = ({ resume, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-[#0f172a] w-11/12 md:w-3/4 h-4/5 p-4 rounded-xl shadow-lg flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-white">Resume Preview</h3>
        <button onClick={onClose} className="px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700 transition">
          Close ✕
        </button>
      </div>
      <div className="flex-1 overflow-auto border rounded-lg bg-white p-6 text-gray-800">
        <ResumePreview resume={resume} />
      </div>
    </div>
  </div>
);

const ShareModal = ({ resume, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-[#1e293b] w-96 p-6 rounded-xl shadow-lg flex flex-col items-center text-white">
      <h3 className="text-xl font-bold mb-4">Share Resume</h3>
      <div className="flex gap-3">
        <WhatsappShareButton url={`${window.location.origin}/resume/${resume.id}`} title={`Check out my resume: ${resume.fullName}`}>
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
        <LinkedinShareButton url={`${window.location.origin}/resume/${resume.id}`} title={`Resume - ${resume.fullName}`}>
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>
        <TwitterShareButton url={`${window.location.origin}/resume/${resume.id}`} title={`Check out my resume: ${resume.fullName}`}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <FacebookShareButton url={`${window.location.origin}/resume/${resume.id}`}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <EmailShareButton url={`${window.location.origin}/resume/${resume.id}`} subject="My Resume" body="Please check out my resume here:">
          <EmailIcon size={40} round />
        </EmailShareButton>
      </div>
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition">
        Close ✕
      </button>
    </div>
  </div>
);

export default MyResumes;
