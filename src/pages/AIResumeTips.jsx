// src/pages/AIResumeTips.jsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Upload, CheckCircle } from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const AIResumeTips = () => {
  const [resumeText, setResumeText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(" https://resumify-backend-7hhm.onrender.com/api/analyzeResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Backend error:", errData);
        alert(errData.error || "Server error");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setScore(data.score ?? 0);
      setKeywords(
        Array.isArray(data.keywords)
          ? data.keywords.map((k, idx) => ({ word: k, count: idx + 1 }))
          : []
      );
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume. Please try again.");
    }

    setLoading(false);
  };

  const handleAnalyzeFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("resumeFile", file);

    try {
      const res = await fetch(" https://resumify-backend-7hhm.onrender.com/api/analyzeResumeFile", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setScore(data.score ?? 0);
      setKeywords(
        Array.isArray(data.keywords)
          ? data.keywords.map((k, idx) => ({ word: k, count: idx + 1 }))
          : []
      );
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
    } catch (err) {
      console.error(err);
      alert("File analysis failed.");
    }
    setLoading(false);
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
      <header className="z-10 relative bg-[#1e293b]/80 backdrop-blur-md shadow-md py-6 px-8 sticky top-0 flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-[#f59e0b] flex items-center gap-2">
          <Wand2 />
          AI Resume Tips
        </h1>
        <p className="text-gray-300 text-sm">
          Get AI suggestions to optimize your resume instantly.
        </p>
      </header>

      {/* Main Section */}
      <main className="container mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10 relative z-10">
        {/* Resume Input */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 bg-[#1e293b]/60 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/10 flex flex-col"
        >
          <h2 className="text-xl font-semibold text-[#f59e0b] mb-4">Paste Your Resume</h2>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume content here..."
            className="w-full h-64 border border-gray-700 rounded-lg p-4 focus:ring-2 focus:ring-[#f59e0b] focus:outline-none resize-none bg-[#0f172a]/50 text-gray-200"
          />

          <div className="mt-4 flex gap-4">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="px-6 py-2 bg-[#f59e0b] text-white rounded-lg font-semibold shadow-md hover:bg-[#d97706] transition disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.txt,.docx"
              onChange={handleAnalyzeFile}
            />

            {/* Visible Upload Button */}
            <button
              onClick={() => fileInputRef.current.click()}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium shadow hover:bg-gray-600 transition flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload File
            </button>
          </div>
        </motion.div>

        {/* Analysis Results */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 flex flex-col gap-6"
        >
          {/* ATS Score */}
          <div className="bg-[#1e293b]/60 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/10 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-[#f59e0b] mb-4">ATS Score</h2>
            {score !== null ? (
              <ResponsiveContainer width="100%" height={250}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="100%"
                  barSize={20}
                  data={[{ name: "Score", value: score, fill: score >= 75 ? "url(#greenGradient)" : "url(#amberGradient)" }]}
                >
                  <defs>
                    <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="amberGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                  <RadialBar minAngle={15} clockWise dataKey="value" cornerRadius={10} />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold fill-gray-200"
                  >
                    {score}%
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400">Run analysis to see your ATS score.</p>
            )}
          </div>

          {/* Keywords */}
          <div className="bg-[#1e293b]/60 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/10">
            <h2 className="text-xl font-semibold text-[#22d3ee] mb-4">Keyword Analysis</h2>
            {keywords.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {keywords.map((k, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="px-3 py-1 bg-[#22d3ee]/20 text-white font-medium rounded-full"
                  >
                    {k.word} <span className="text-gray-400">({k.count})</span>
                  </motion.span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Paste a resume to see keywords.</p>
            )}
          </div>

          {/* Suggestions */}
          <div className="bg-[#1e293b]/60 p-6 rounded-2xl shadow-lg backdrop-blur-md border border-white/10">
            <h2 className="text-xl font-semibold text-[#9333ea] mb-4">Suggestions</h2>
            {loading ? (
              <p className="text-gray-400 italic">AI is analyzing your resume...</p>
            ) : suggestions.length > 0 ? (
              <ul className="space-y-3">
                {suggestions.map((tip, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle className="text-[#10b981] mt-1 w-5 h-5" />
                    <span className="text-gray-200">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">
                Paste your resume and click <span className="font-medium">Analyze</span> to get AI-powered suggestions.
              </p>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AIResumeTips;
