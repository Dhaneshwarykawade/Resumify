// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const particlesInit = async (main) => {
    await loadFull(main);
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
            move: {
              enable: true,
              speed: 1.2,
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" },
            },
            links: {
              enable: true,
              distance: 150,
              color: "#94a3b8",
              opacity: 0.3,
              width: 1,
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 120, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Floating gradient circles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 left-20 w-72 h-72 rounded-full bg-[#2563eb] opacity-20 blur-3xl"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#f59e0b] opacity-20 blur-3xl"
      />

      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] bg-clip-text text-transparent text-center"
        >
          About Resumify
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-300 max-w-4xl text-center leading-relaxed"
        >
          Resumify isn’t just a resume builder—it’s your personal career
          assistant. We empower{" "}
          <span className="text-[#f59e0b] font-semibold">students</span> and{" "}
          <span className="text-[#22d3ee] font-semibold">professionals</span>{" "}
          with AI-powered tools to build outstanding resumes and cover letters
          in minutes.
        </motion.p>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl"
        >
          {/* Feature Cards */}
          {[
            {
              title: "🌍 Multilingual Resumes",
              color: "text-[#f59e0b]",
              desc: "Create resumes in any international language—breaking barriers and opening doors to global opportunities.",
            },
            {
              title: "✍️ AI Cover Letters",
              color: "text-[#22d3ee]",
              desc: "Instantly generate tailored cover letters with AI to match any job description and employer expectations.",
            },
            {
              title: "🤖 Resume Chatbot",
              color: "text-[#f43f5e]",
              desc: "Ask anything related to resumes—formatting, structure, or keywords—and our chatbot provides instant guidance.",
            },
            {
              title: "🎨 Templates for Everyone",
              color: "text-[#a78bfa]",
              desc: "Choose from modern, elegant, and professional templates to stand out while keeping it ATS-friendly.",
            },
            {
              title: "📊 AI ATS Analyzer",
              color: "text-[#34d399]",
              desc: "Get your ATS score instantly with detailed suggestions, missing keywords, and optimization tips to land more interviews.",
            },
            {
              title: "📅 Career Roadmap",
              color: "text-[#fbbf24]",
              desc: "Generate a personalized career growth roadmap with AI—helping you plan internships, jobs, and skill-building for long-term success.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-[#1e293b]/60 shadow-lg backdrop-blur-md border border-white/10"
            >
              <h3 className={`text-2xl font-bold mb-3 ${feature.color}`}>
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14 flex justify-center"
        >
          <a
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-[#f59e0b] to-[#2563eb] text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all"
          >
            Back to Dashboard
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
