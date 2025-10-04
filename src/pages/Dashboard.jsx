// src/pages/Dashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FileText, PlusCircle, User, Sparkles, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import resumifyLogo from "/resumify.png";
import Resume1 from "../assets/images/Resume1.webp";
import Resume2 from "../assets/images/Resume2.jpg";
import Resume3 from "../assets/images/Resume3.png";
import Resume4 from "../assets/images/Resume4.jpg";
import Resume5 from "../assets/images/Resume5.avif";
import Chatbot from "../components/Chatbot";

// Templates
const templates = [
  { id: 1, name: "Modern", img: Resume1 },
  { id: 2, name: "Minimal", img: Resume2 },
  { id: 3, name: "Elegant", img: Resume3 },
  { id: 4, name: "Creative", img: Resume4 },
  { id: 5, name: "Professional", img: Resume5 },
];

// FAQs
const faqs = [
  {
    question: "How do I create a resume?",
    answer:
      "Click on 'Create Resume' and choose a template. Fill in your details step by step and save.",
  },
  {
    question: "Can I edit my resume later?",
    answer:
      "Yes! All your resumes are saved in 'My Resumes'. You can edit, download, share or delete them anytime.",
  },
  {
    question: "Does Resumify support multiple languages?",
    answer:
      "Absolutely! You can select a language when creating a resume. AI suggestions are also available in multiple languages.",
  },
  {
    question: "Can AI optimize my resume for ATS?",
    answer:
      "Yes! The AI Resume Tips section analyzes your resume and provides actionable suggestions for ATS optimization.",
  },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [progress] = useState(65);
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && scrollRef.current) {
        scrollRef.current.scrollBy({ left: 270, behavior: "smooth" });
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const particlesInit = async (main) => await loadFull(main);

  const handleLanguageSelect = (langCode) => {
    navigate(`/create-resume?lang=${langCode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white relative overflow-hidden flex flex-col">
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

      {/* Navbar - Grid Layout */}
<header className="bg-[#0f172a]/90 backdrop-blur-xl shadow-lg py-4 px-8 sticky top-0 z-50 border-b border-gray-700/50">
  <div className="grid grid-cols-3 items-center">
    {/* Left: Logo + Brand */}
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center gap-3"
    >
      <motion.img
        whileHover={{ rotate: 15, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200 }}
        src={resumifyLogo}
        alt="Resumify Logo"
        className="h-12 w-auto object-contain cursor-pointer drop-shadow-[0_0_10px_#22d3ee]"
      />
      <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] bg-clip-text text-transparent hover:brightness-125 transition">
        Resumify
      </h1>
    </motion.div>

    {/* Center: Nav Links with Glow */}
    <nav className="hidden md:flex justify-center gap-10 text-sm font-semibold">
      {[
        { name: "About", to: "/about" },
        { name: "Contact", to: "/contact" },
        { name: "Privacy Policy", to: "/privacy-policy" },
      ].map((link, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.1 }}
          className="relative group"
        >
          <Link
            to={link.to}
            className="text-gray-300 hover:text-white transition duration-300"
          >
            {link.name}
          </Link>
          {/* Neon underline effect */}
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-[#f59e0b] via-[#22d3ee] to-[#2563eb] group-hover:w-full transition-all duration-500 rounded-full shadow-[0_0_10px_#22d3ee]"></span>
        </motion.div>
      ))}
    </nav>

    {/* Right: User Info + Logout */}
    <div className="flex justify-end items-center gap-6">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-200 text-sm font-medium bg-gray-800/60 px-3 py-1 rounded-full shadow-inner"
      >
        {user?.email}
      </motion.span>
      <motion.button
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 15px rgba(245,158,11,0.8)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={logout}
        className="px-5 py-2 bg-gradient-to-r from-[#ef4444] via-[#f59e0b] to-[#2563eb] text-white rounded-xl font-semibold shadow-md transition-all"
      >
        Logout
      </motion.button>
    </div>
  </div>
</header>


      {/* Cover Page Hero Section */}
      <section className="relative min-h-[88vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-gradient-to-r from-[#22d3ee] via-[#2563eb] to-[#f59e0b] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

        {/* Hero Content */}
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative -top-6 text-5xl md:text-7xl font-extrabold mb-7 
             bg-gradient-to-r from-[#f59e0b] via-[#22d3ee] to-[#2563eb] 
             bg-clip-text text-transparent 
             drop-shadow-[0_0_25px_rgba(37,99,235,0.4)]"
        >
          Build Resumes That Shine ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-300 leading-relaxed"
        >
          Create{" "}
          <span className="text-[#f59e0b] font-semibold">
            ATS-friendly resumes
          </span>{" "}
          with
          <span className="text-[#22d3ee] font-semibold">
            {" "}
            elegant templates
          </span>
          ,
          <span className="text-[#2563eb] font-semibold">
            {" "}
            AI-powered suggestions
          </span>
          , and
          <span className="text-[#f59e0b] font-semibold">
            {" "}
            multilingual support
          </span>{" "}
          — designed for ambitious professionals 🚀.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        >
          <Link
            to="/create-resume"
            className="inline-block px-12 py-4 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] text-white font-semibold rounded-2xl shadow-[0_0_25px_rgba(37,99,235,0.7)] hover:shadow-[0_0_35px_rgba(37,99,235,0.9)] hover:scale-110 transition-transform"
          >
            🚀 Start Now
          </Link>
        </motion.div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 flex flex-col items-center">
          <span className="text-sm mb-3 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] bg-clip-text text-transparent font-semibold tracking-wide">
            Scroll Down
          </span>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-12 h-12 rounded-full border-2 border-transparent bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] p-[2px] cursor-pointer hover:scale-110 transition"
          >
            <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-12 bg-[#0f172a]">
        {/* Section heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Choose Your Resume Template
          </h2>
          <p className="mt-3 text-gray-400">
            Select from a variety of modern & professional designs.
          </p>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-6 scrollbar-hide"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="min-w-[250px] bg-[#1e293b] rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl relative group"
            >
              <img
                src={template.img}
                alt={template.name}
                className="w-full h-80 object-cover"
              />
              <div className="p-4 flex flex-col items-center relative z-10">
                <h3 className="font-semibold text-white">{template.name}</h3>
                <Link
                  to={`/create-resume?template=${template.id}`}
                  className="mt-3 px-4 py-2 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] text-white rounded-lg hover:scale-105 transition transform"
                >
                  Use Template
                </Link>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b] via-[#2563eb] to-[#22d3ee] opacity-0 group-hover:opacity-20 rounded-xl transition-all pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Explore Resumify Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
          {[
            {
              to: "/create-resume",
              icon: <PlusCircle className="w-6 h-6 text-white" />,
              title: "Create Resume",
              desc: "Start building your resume with smart, modern templates.",
            },
            {
              to: "/my-resumes",
              icon: <FileText className="w-6 h-6 text-white" />,
              title: "My Resumes",
              desc: "Manage and access your saved resumes anytime.",
            },
            {
              to: "/profile",
              icon: <User className="w-6 h-6 text-white" />,
              title: "My Profile",
              desc: "Update your personal details, settings, and preferences.",
            },
            {
              to: "/ai-tips",
              icon: <Sparkles className="w-6 h-6 text-white" />,
              title: "AI Resume Tips",
              desc: "Get AI suggestions to optimize your resume instantly.",
            },
            {
              to: "/career-tools",
              icon: <BarChart3 className="w-6 h-6 text-white" />,
              title: "Career Tools",
              desc: "Analyze your resume score, generate cover letters, and more.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative group"
            >
              <Link
                to={card.to}
                className="bg-[#1e293b] rounded-2xl shadow-lg p-6 hover:shadow-2xl transition group block h-full relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="group-hover:scale-125 transition">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{card.title}</h3>
                </div>
                <p className="text-gray-300 text-sm relative z-10">
                  {card.desc}
                </p>
                {/* Gradient overlay for hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] opacity-0 group-hover:opacity-20 rounded-2xl transition-all pointer-events-none"></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-14 relative z-10 bg-[#1e293b]/60">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          What Our Users Say
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Amit Sharma",
              role: "Software Engineer",
              text: "Resumify helped me land my dream job! The AI tips were a game-changer.",
            },
            {
              name: "Sarah Lee",
              role: "Marketing Manager",
              text: "I love the modern templates and the multilingual feature made my CV shine.",
            },
            {
              name: "David Wilson",
              role: "HR Recruiter",
              text: "As a recruiter, I recommend Resumify to candidates—it ensures ATS-ready resumes.",
            },
          ].map((t, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-[#111827] p-6 rounded-2xl shadow-lg border border-[#2563eb]/30"
            >
              <p className="text-gray-300 italic mb-4">“{t.text}”</p>
              <h4 className="font-bold text-white">{t.name}</h4>
              <span className="text-sm text-gray-400">{t.role}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-14 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Why Choose Resumify?
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "50K+", label: "Resumes Built" },
            { number: "20+", label: "Templates" },
            { number: "30+", label: "Languages Supported" },
            { number: "95%", label: "User Satisfaction" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="bg-[#1e293b] rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-3xl font-extrabold text-[#f59e0b]">
                {stat.number}
              </h3>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-14 relative z-10 bg-[#0f172a]/70">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Career Tips & Insights
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Top 10 Resume Mistakes to Avoid",
              link: "/blog/resume-mistakes",
            },
            {
              title: "How to Ace Your Next Interview",
              link: "/blog/interview-tips",
            },
            {
              title: "AI Tools That Boost Your Job Hunt",
              link: "/blog/ai-job-tools",
            },
          ].map((post, idx) => (
            <Link
              key={idx}
              to={post.link}
              className="bg-[#1e293b] p-6 rounded-xl hover:scale-105 transition shadow-md block"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm">Read more →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-14 relative z-10 bg-[#1e293b]/70">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Stay Updated 🚀
          </h2>
          <p className="text-gray-300 mb-6">
            Get career tips, resume hacks, and the latest job market insights
            straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-xl text-white w-full sm:w-auto"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#22d3ee] text-white rounded-xl shadow-md hover:scale-105 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Resume Builder FAQ
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="bg-[#1e293b] rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <details className="p-4 cursor-pointer group">
                <summary className="flex justify-between items-center font-semibold list-none text-white">
                  {faq.question}
                  <span className="ml-4 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-gray-300">{faq.answer}</p>
              </details>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#111827]/80 backdrop-blur-md shadow-inner py-10 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Resumify</span>. All rights
          reserved.
        </p>
        <div className="flex justify-center gap-6 mt-4 text-gray-300">
          <Link to="/about" className="hover:text-[#f59e0b] transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-[#f59e0b] transition">
            Contact
          </Link>
          <Link
            to="/privacy-policy"
            className="hover:text-[#f59e0b] transition"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="mt-6">
          <Chatbot />
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
