// src/pages/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { db } from "../components/Firebase2"; // your Firebase config
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.25 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const particlesInit = async (main) => await loadFull(main);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = "Invalid email format";
    }
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        // Save form data to Firestore
        await addDoc(collection(db, "contactMessages"), {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          createdAt: serverTimestamp(),
        });

        setSuccess("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(""), 5000);
      } catch (error) {
        console.error("Error sending message: ", error);
        setSuccess("Failed to send message. Try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  const supportOptions = [
    {
      icon: "💌",
      title: "Email Support",
      desc: "Reach our team anytime via email for quick responses and guidance.",
      value: "support@resumify.com",
      link: true,
      color: "#22d3ee",
    },
    {
      icon: "📞",
      title: "Call Us",
      desc: "Have a query? Call us during business hours and get immediate assistance.",
      value: "+91 98765 43210",
      color: "#f59e0b",
    },
    {
      icon: "🕒",
      title: "24/7 Help",
      desc: "Our support system is online round-the-clock to help you anytime.",
      value: "",
      color: "#34d399",
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

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full text-center">
        <motion.h1 initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="text-5xl md:text-6xl font-extrabold mb-12 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] bg-clip-text text-transparent">
          Contact Us
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} viewport={{ once: true }} className="text-lg md:text-xl text-gray-300 mb-12">
          Need help or have questions about Resumify? Our support team is here to guide you. Choose your preferred way to reach out and we'll respond promptly.
        </motion.p>

        {/* Support Cards */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
          {supportOptions.map((item, i) => (
            <motion.div key={i} variants={cardVariants} whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${item.color}` }} className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-2" style={{ color: item.color }}>{item.title}</h3>
              <p className="text-gray-300 mb-2">{item.desc}</p>
              {item.value && item.link && <a href={item.link} className="text-gray-200 underline">{item.value}</a>}
              {item.value && !item.link && <p className="text-gray-200">{item.value}</p>}
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }} className="mt-16 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
          {success && <p className="text-green-400 mb-4">{success}</p>}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`px-4 py-2 rounded-lg bg-white/20 text-white border ${errors.name ? "border-red-500" : "border-white/30"} focus:outline-none focus:ring-2 focus:ring-[#2563eb]`}
            />
            {errors.name && <p className="text-red-500 text-sm text-left">{errors.name}</p>}

            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`px-4 py-2 rounded-lg bg-white/20 text-white border ${errors.email ? "border-red-500" : "border-white/30"} focus:outline-none focus:ring-2 focus:ring-[#f59e0b]`}
            />
            {errors.email && <p className="text-red-500 text-sm text-left">{errors.email}</p>}

            <textarea
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`px-4 py-2 rounded-lg bg-white/20 text-white border ${errors.message ? "border-red-500" : "border-white/30"} focus:outline-none focus:ring-2 focus:ring-[#22d3ee]`}
            />
            {errors.message && <p className="text-red-500 text-sm text-left">{errors.message}</p>}

            <button type="submit" disabled={loading} className="mt-2 px-6 py-3 bg-gradient-to-r from-[#f59e0b] to-[#2563eb] rounded-xl font-semibold hover:scale-105 transition-all">
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        {/* Back Button */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} viewport={{ once: true }} className="mt-14 flex justify-center">
          <a href="/" className="px-8 py-4 bg-gradient-to-r from-[#f59e0b] to-[#2563eb] text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all">
            Back to Dashboard
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
