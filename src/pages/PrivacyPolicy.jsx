// src/pages/PrivacyPolicy.jsx
import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const PrivacyPolicy = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const points = [
    {
      title: "🔒 Data Security",
      desc: "All personal and resume data is stored securely using modern encryption and security standards.",
      color: "#f59e0b",
    },
    {
      title: "🤝 No Third-Party Sharing",
      desc: "Your information is never shared with third parties without explicit consent.",
      color: "#22d3ee",
    },
    {
      title: "📄 Transparency",
      desc: "We clearly communicate how your data is used to provide our resume building services.",
      color: "#34d399",
    },
    {
      title: "🧑‍💻 User Control",
      desc: "You can update, download, or delete your personal information anytime from your profile.",
      color: "#a78bfa",
    },
    {
      title: "📈 Analytics & Improvement",
      desc: "We use anonymized data to improve our platform, never compromising personal details.",
      color: "#f43f5e",
    },
    {
      title: "📧 Support & Assistance",
      desc: "Reach out anytime at privacy@resumify.com for privacy-related queries.",
      color: "#fbbf24",
    },
  ];

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
            move: { enable: true, speed: 1.2, outModes: { default: "out" } },
            links: { enable: true, distance: 150, color: "#94a3b8", opacity: 0.3, width: 1 },
          },
          interactivity: { events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" }, resize: true }, modes: { repulse: { distance: 120, duration: 0.4 }, push: { quantity: 4 } } },
          detectRetina: true,
        }}
      />

      {/* Floating gradient circles */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }} className="absolute top-20 left-20 w-72 h-72 rounded-full bg-[#2563eb] opacity-20 blur-3xl" />
      <motion.div initial={{ scale: 0 }} animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }} className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-[#f59e0b] opacity-20 blur-3xl" />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-5xl w-full">
        <motion.h1 initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="text-5xl md:text-6xl font-extrabold mb-12 text-center bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] bg-clip-text text-transparent">
          Privacy Policy
        </motion.h1>

        {/* Timeline/Sections */}
        <div className="relative">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center mb-12 md:space-x-8 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Icon circle */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full border-4" style={{ borderColor: point.color }}></div>
              </div>

              {/* Text content */}
              <div className="mt-4 md:mt-0 text-left md:w-3/4">
                <h3 className="text-2xl font-bold mb-2" style={{ color: point.color }}>
                  {point.title}
                </h3>
                <p className="text-gray-300">{point.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }} className="flex justify-center mt-10">
          <a href="/" className="px-8 py-4 bg-gradient-to-r from-[#f59e0b] to-[#2563eb] text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all">
            Back to Dashboard
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
