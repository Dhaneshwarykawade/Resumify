import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../components/Firebase2";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import { motion } from "framer-motion";

const particlesInit = async (main) => {
  await loadFull(main);
};



// Step configuration for the multi-step form
const STEPS = [
  { id: "contact", label: "Contact Info", icon: "👤" },
  { id: "summary", label: "Summary", icon: "📝" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "certifications", label: "Certifications", icon: "🏆" },
  { id: "achievements", label: "Achievements", icon: "⭐" },
  { id: "optional", label: "Optional", icon: "➕" },
];

// Language options
const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
];

const CreateResumeMultiStep = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const baseUrl = " https://resumify-backend-7hhm.onrender.com"

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [languageLoading, setLanguageLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const defaultTranslatedLabels = {
    achievements: "Achievements",
    certifications: "Certifications",
    education: "Education",
    email: "Email",
    experience: "Experience",
    fullName: "Full Name",
    github: "GitHub",
    hobbies: "Hobbies",
    internship: "Internship",
    languages: "Languages",
    linkedin: "LinkedIn",
    location: "Location",
    phone: "Phone",
    projects: "Projects",
    skills: "Skills",
    summary: "Summary",
    title: "Title",
    volunteer: "Volunteer",
  };
  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    location: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
    internship: "",
    certifications: "",
    achievements: "",
    languages: "",
    volunteer: "",
    hobbies: "",
    translatedLabels: { ...defaultTranslatedLabels },// Initially set to default English labels
  });

  // Localized labels state
  const [labels, setLabels] = useState({
    fullName: "Full Name",
    title: "Professional Title",
    email: "Email",
    phone: "Phone Number",
    linkedin: "LinkedIn URL",
    github: "GitHub / Portfolio URL",
    location: "Location (City, State)",
    summary: "Professional Summary / Objective",
    skills: "Key Skills (separate by commas)",
    experience: "Work Experience",
    education: "Education",
    projects: "Projects",
    internship: "Internship Experience",
    certifications: "Certifications / Trainings",
    achievements: "Achievements / Awards",
    languages: "Languages",
    volunteer: "Volunteer Work / Social Initiatives",
    hobbies: "Hobbies / Interests",
    next: "Next",
    back: "Back",
    save: "Save Resume",
    update: "Update Resume",
  });

  /**
   * Loading Screen Component
   */
  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600 mx-auto"></div>
            {/* Inner pulsing dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            ✨Resumify - AI Resume Builder
          </h2>
          <p className="text-gray-600 animate-pulse">
            Loading your workspace...
          </p>
        </div>
        {/* Loading dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );

  /**
   * Shows success toast notification
   * @param {string} message - Success message to display
   */
  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        color: "white",
        fontWeight: "500",
        borderRadius: "12px",
      },
    });
  };

  /**
   * Shows error toast notification
   * @param {string} message - Error message to display
   */
  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
        color: "white",
        fontWeight: "500",
        borderRadius: "12px",
      },
    });
  };

  /**
   * Shows info toast notification
   * @param {string} message - Info message to display
   */
  const showInfoToast = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
        color: "white",
        fontWeight: "500",
        borderRadius: "12px",
      },
    });
  };

  /**
   * Fetches translated labels from backend API
   * @param {string} languageCode - The target language code
   */
  const fetchTranslatedLabels = async (languageCode) => {
    setLanguageLoading(true);
    showInfoToast(
      `🌐 Loading ${
        LANGUAGES.find((l) => l.code === languageCode)?.name
      } translations...`
    );

    try {
      const response = await fetch(
        `${baseUrl}/api/labels/${languageCode}`
      );
      if (response.ok) {
        const data = await response.json();
        setLabels(data);
        showSuccessToast(
          `✅ Language changed to ${
            LANGUAGES.find((l) => l.code === languageCode)?.name
          }!`
        );
      } else {
        throw new Error("Failed to fetch translations");
      }
    } catch (err) {
      console.error("Failed to load translated labels:", err);
      showErrorToast(
        "❌ Failed to load translations. Using English as fallback."
      );
    } finally {
      setLanguageLoading(false);
    }
  };

  // Fetch translations when language changes
  useEffect(() => {
    if (selectedLanguage !== defaultLanguage) {
      fetchTranslatedLabels(selectedLanguage);
      setDefaultLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500); // Show loading for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  /**
   * Handles form input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Validates current step fields
   * @returns {boolean} - Whether current step is valid
   */
  const validateStep = () => {
    const requiredFields = {
      0: ["fullName", "email", "phone"],
      1: ["summary"],
      2: ["skills"],
      3: ["experience"],
      4: ["education"],
      5: ["projects", "internship"], // Either projects OR internship required
    };

    const fields = requiredFields[currentStep];
    if (!fields) return true;

    if (currentStep === 5) {
      return formData.projects.trim() || formData.internship.trim();
    }

    return fields.every((field) => formData[field].trim());
  };

  /**
   * Navigates to next step if validation passes
   */
  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    } else {
      showErrorToast("⚠️ Please fill all required fields before proceeding.");
    }
  };

  /**
   * Navigates to previous step
   */
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  /**
   * Translates resume data to selected language
   * @returns {Object} - Translated resume data
   */
  const translateResumeData = async () => {
    if (selectedLanguage === "en") return formData;

    try {
      showInfoToast("🔄 Translating your resume content...");
      const response = await fetch(
        `${baseUrl}/api/translateResume`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeData: {
              ...formData,
              translatedLabels: {},
              language: selectedLanguage,
            },
            targetLang: selectedLanguage,
          }),
        }
      );

      if (response.ok) {
        const translatedData = await response.json();
        showSuccessToast("✨ Resume content translated successfully!");
        return translatedData;
      } else {
        throw new Error("Translation failed");
      }
    } catch (error) {
      console.error("Translation failed:", error);
      showErrorToast("❌ Translation failed. Saving in original language.");
      return formData; // Return original data if translation fails
    }
  };

  /**
   * Submits the resume form (create or update)
   */
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const translatedData = await translateResumeData();

      if (id) {
        // Update existing resume
        const docRef = doc(db, "resumes", id);
        await updateDoc(docRef, {
          ...translatedData,
          updatedAt: new Date(),
        });
        showSuccessToast("🎉 Resume updated successfully!");
      } else {
        // Create new resume
        await addDoc(collection(db, "resumes"), {
          ...translatedData,
          userId: user.uid,
          createdAt: new Date(),
        });
        showSuccessToast("🚀 Resume created successfully!");
      }

      // Navigate after a brief delay to show the success message
      setTimeout(() => navigate("/my-resumes"), 2000);
    } catch (err) {
      console.error("Save failed:", err);
      showErrorToast("❌ Failed to save resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Renders the current step's form fields
   * @returns {JSX.Element} - Step content
   */
  const renderStep = () => {
    const inputClass =
      "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none";
    const textareaClass = `${inputClass} resize-none`;

    switch (currentStep) {
      case 0: // Contact Info
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder={labels.fullName}
                value={formData.fullName}
                onChange={handleChange}
                className={inputClass}
                required
              />
              <input
                type="text"
                name="title"
                placeholder={labels.title}
                value={formData.title}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                placeholder={labels.email}
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder={labels.phone}
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <input
              type="text"
              name="location"
              placeholder={labels.location}
              value={formData.location}
              onChange={handleChange}
              className={inputClass}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="url"
                name="linkedin"
                placeholder={labels.linkedin}
                value={formData.linkedin}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                type="url"
                name="github"
                placeholder={labels.github}
                value={formData.github}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        );

      case 1: // Summary
        return (
          <textarea
            name="summary"
            placeholder={labels.summary}
            value={formData.summary}
            onChange={handleChange}
            rows="6"
            className={textareaClass}
            required
          />
        );

      case 2: // Skills
        return (
          <textarea
            name="skills"
            placeholder={labels.skills}
            value={formData.skills}
            onChange={handleChange}
            rows="4"
            className={textareaClass}
            required
          />
        );

      case 3: // Experience
        return (
          <textarea
            name="experience"
            placeholder={labels.experience}
            value={formData.experience}
            onChange={handleChange}
            rows="6"
            className={textareaClass}
            required
          />
        );

      case 4: // Education
        return (
          <textarea
            name="education"
            placeholder={labels.education}
            value={formData.education}
            onChange={handleChange}
            rows="4"
            className={textareaClass}
            required
          />
        );

      case 5: // Projects & Internships
        return (
          <div className="space-y-4">
            <textarea
              name="projects"
              placeholder={labels.projects}
              value={formData.projects}
              onChange={handleChange}
              rows="4"
              className={textareaClass}
            />
            <textarea
              name="internship"
              placeholder={labels.internship}
              value={formData.internship}
              onChange={handleChange}
              rows="4"
              className={textareaClass}
            />
          </div>
        );

      case 6: // Certifications
        return (
          <textarea
            name="certifications"
            placeholder={labels.certifications}
            value={formData.certifications}
            onChange={handleChange}
            rows="4"
            className={textareaClass}
          />
        );

      case 7: // Achievements
        return (
          <textarea
            name="achievements"
            placeholder={labels.achievements}
            value={formData.achievements}
            onChange={handleChange}
            rows="4"
            className={textareaClass}
          />
        );

      case 8: // Optional
        return (
          <div className="space-y-4">
            <input
              type="text"
              name="languages"
              placeholder={labels.languages}
              value={formData.languages}
              onChange={handleChange}
              className={inputClass}
            />
            <textarea
              name="volunteer"
              placeholder={labels.volunteer}
              value={formData.volunteer}
              onChange={handleChange}
              rows="3"
              className={textareaClass}
            />
            <textarea
              name="hobbies"
              placeholder={labels.hobbies}
              value={formData.hobbies}
              onChange={handleChange}
              rows="3"
              className={textareaClass}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  // Show loading screen on initial load
  if (initialLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* Show overlay loading when submitting or translating */}
      {(loading || languageLoading) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4 shadow-2xl">
            <div className="mb-6">
              <div className="relative mx-auto w-16 h-16">
                <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {loading ? "🚀 Saving Resume" : "🌐 Loading Translation"}
            </h3>
            <p className="text-gray-600 text-sm">
              {loading
                ? "Please wait while we save your resume..."
                : "Fetching translations, please wait..."}
            </p>
            <div className="flex justify-center space-x-1 mt-4">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      )}
          <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] flex flex-col items-center py-8 px-4 text-white relative overflow-hidden">        
            <div className="relative z-10 max-w-4xl mx-auto">
          {/* Particle Background */}
  <Particles
    id="tsparticles"
    init={particlesInit} // create a function like About.jsx
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
        modes: { repulse: { distance: 120, duration: 0.4 }, push: { quantity: 4 } },
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

          
          {/* Header */}
          <motion.div
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="text-center mb-8"
>
  <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] bg-clip-text text-transparent">
    ✨ Resumify - AI Resume Builder
  </h1>
  <p className="text-gray-300 max-w-2xl mx-auto">
    Create your professional resume in minutes with AI-powered tools.
  </p>
</motion.div>


          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep + 1} of {STEPS.length}
              </span>
              <span className="text-sm font-medium text-indigo-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
           <div className="w-full bg-gray-700 rounded-full h-2">
  <div
    className="bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] h-2 rounded-full transition-all duration-300 ease-out"
    style={{ width: `${progress}%` }}
  />
</div>

          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mb-8 overflow-x-auto pb-2">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center min-w-0 flex-1 ${
                  index <= currentStep ? "text-indigo-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-1 transition-all duration-200 ${
                    index <= currentStep
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step.icon}
                </div>
                <span className="text-xs font-medium text-center leading-tight">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="bg-[#1e293b]/60 shadow-xl rounded-2xl border border-white/10 overflow-hidden relative z-20 pointer-events-auto"
>
          {/* Main Form Card */}
            {/* Language Selector */}
            <div className="bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee]
 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-1">
                    {STEPS[currentStep].icon} {STEPS[currentStep].label}
                  </h2>
                  <p className="text-indigo-100 text-sm">
                    Fill out the information below
                  </p>
                </div>
                <div className="ml-4 relative">
                  <label className="block text-sm font-medium mb-2">
                    🌐 Language
                  </label>
                  <div className="relative">
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      disabled={languageLoading || loading}
                      className={`px-3 py-2 rounded-lg border-0 text-gray-800 font-medium min-w-32 pr-8 ${
                        languageLoading || loading
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                    {languageLoading && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <form className="space-y-6">
                {renderStep()}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 0 || loading || languageLoading}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      currentStep === 0 || loading || languageLoading
                 ?"px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] text-white hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg"      
                 : "px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] text-white hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg"
   }`}
                    >
                    ← {labels.back}
                  </button>

                  {currentStep < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={loading || languageLoading}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        loading || languageLoading
                          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#f59e0b] via-[#2563eb] to-[#22d3ee] text-white hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg"
                      }`}
                    >
                      {labels.next} →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading || languageLoading}
                      className={`px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
                        loading || languageLoading
                          ? "bg-gray-400 cursor-not-allowed text-gray-200"
                          : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg"
                      } text-white`}
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Saving...
                        </div>
                      ) : (
                        <>✓ {id ? labels.update : labels.save}</>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

        </motion.div>
        </div>

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            fontFamily: "inherit",
            fontSize: "14px",
            borderRadius: "12px",
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        />
      </div>
    </>
  );
};

export default CreateResumeMultiStep;
