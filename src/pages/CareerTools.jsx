// src/pages/CareerTools.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Document, pdfjs } from "react-pdf";
import jsPDF from "jspdf";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

// PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CareerTools = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [resumeScore, setResumeScore] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  // Particle Init
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Handle PDF upload and extract text
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file);
    setResumeScore(null);
    setCoverLetter("");

    const pdf = await pdfjs.getDocument(URL.createObjectURL(file)).promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      text += strings.join(" ") + "\n";
    }

    setResumeText(text);
  };

  // Simple resume analyzer (keyword + length based)
  const analyzeResume = () => {
    if (!resumeText) {
      alert("Please upload a resume first!");
      return;
    }

    const keywords = ["experience", "skills", "education", "projects"];
    let score = 50;
    const wordCount = resumeText.split(/\s+/).length;

    if (wordCount > 300) score += 20;
    if (wordCount > 500) score += 10;

    keywords.forEach((kw) => {
      if (resumeText.toLowerCase().includes(kw)) score += 5;
    });

    if (score > 100) score = 100;
    setResumeScore(score);
  };

  // Generate cover letter referencing uploaded resume
  const generateCoverLetter = () => {
    if (!resumeFile) {
      alert("Please upload a resume first!");
      return;
    }

    setCoverLetter(
      `Dear Hiring Manager,\n\nI am excited to apply for this role. My resume (${resumeFile.name}) highlights my relevant experience and skills, including [mention key skills or achievements]. I am confident I can contribute effectively to your team.\n\nLooking forward to discussing my application.\n\nSincerely,\n[Your Name]`
    );
  };

  // Download cover letter as text-based PDF
  const downloadPDF = () => {
    if (!coverLetter) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 15;
    const lines = pdf.splitTextToSize(coverLetter, pageWidth - 2 * margin);

    pdf.setFontSize(12);
    pdf.text(lines, margin, 20);
    pdf.save("CoverLetter.pdf");
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white flex flex-col overflow-hidden">
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

      {/* Header */}
      <header className="z-10 relative bg-[#1e293b]/80 backdrop-blur-md shadow-md py-4 px-6 flex justify-between items-center sticky top-0">
        <h1 className="text-2xl font-extrabold text-[#f59e0b]">Career Tools</h1>
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-gradient-to-r from-[#f59e0b] to-[#2563eb] rounded-xl font-semibold hover:scale-105 transition"
        >
          Back to Dashboard
        </Link>
      </header>

      {/* Main */}
      <main className="flex-grow relative z-10 container mx-auto px-6 py-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] bg-clip-text text-transparent">
          Boost Your Career 🚀
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Resume Analyzer */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#1e293b]/60 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/10 flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold text-[#f59e0b] mb-4">Resume Score Analyzer</h3>
            <p className="text-gray-300 text-sm text-center mb-4">
              Upload your PDF resume to analyze it and get a score.
            </p>

            <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-4 text-white p-1 rounded" />
            <button
              onClick={analyzeResume}
              className="px-6 py-2 bg-[#10b981] rounded-xl font-semibold hover:scale-105 transition mb-4"
            >
              Analyze Resume
            </button>

            {resumeScore && (
              <p className="text-lg font-bold text-[#f59e0b]">
                Your Resume Score: <span className="text-[#22d3ee]">{resumeScore}/100</span>
              </p>
            )}

            {resumeText && (
              <div className="mt-4 w-full h-60 p-2 border rounded-lg overflow-auto text-sm text-gray-300 whitespace-pre-line">
                <strong>Resume Text Preview:</strong>
                <p>{resumeText.slice(0, 1000)}...</p>
              </div>
            )}
          </motion.div>

          {/* Cover Letter Generator */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#1e293b]/60 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/10 flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold text-[#22d3ee] mb-4">AI Cover Letter Generator</h3>
            <p className="text-gray-300 text-sm text-center mb-4">
              Generate a professional cover letter based on your resume.
            </p>
            <button
              onClick={generateCoverLetter}
              className="px-6 py-2 bg-[#9333ea] rounded-xl font-semibold hover:scale-105 transition mb-4"
            >
              Generate Cover Letter
            </button>

            {coverLetter && (
              <textarea
                className="w-full h-60 p-4 border rounded-lg resize-none text-sm text-gray-300 mb-4 bg-[#0f172a]/50"
                value={coverLetter}
                readOnly
              />
            )}

            {coverLetter && (
              <button
                onClick={downloadPDF}
                className="px-6 py-2 bg-[#f59e0b] rounded-xl font-semibold hover:scale-105 transition"
              >
                Download PDF
              </button>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="z-10 relative bg-[#1e293b]/80 py-10 text-center text-gray-400">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-[#f59e0b]">Resumify</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default CareerTools;
