import React from "react";

const ResumePreview = ({ resume }) => {
  if (!resume) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No Resume Data Available
      </div>
    );
  }
  const handleDownload = () => {
    const printContent = document.querySelector(".resume-content");
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Action Buttons */}
      <div className="max-w-4xl mx-auto mb-4 flex justify-end gap-3 no-print">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors duration-200 font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg resume-content">
        {/* Header Section */}
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold mb-2">{resume.fullName || ""}</h1>
          {resume.title && <p className="text-xl mb-4">{resume.title}</p>}

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {resume.email && (
              <div className="flex items-center gap-2">
                <span>✉</span>
                <span>{resume.email}</span>
              </div>
            )}
            {resume.phone && (
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>{resume.phone}</span>
              </div>
            )}
            {resume.linkedin && (
              <div className="flex items-center gap-2">
                <span>🔗</span>
                <span className="truncate">{resume.linkedin}</span>
              </div>
            )}
            {resume.github && (
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span className="truncate">{resume.github}</span>
              </div>
            )}
            {resume.location && (
              <div className="flex items-center gap-2 md:col-span-2">
                <span>📍</span>
                <span>{resume.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-8">
          {/* Professional Summary */}
          {resume.summary && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-3 border-b-2 border-slate-200 pb-1">
                {resume.translatedLabels.summary || "Professional Summary"}
              </h2>
              <p className="text-slate-700 leading-relaxed">{resume.summary}</p>
            </section>
          )}

          {/* Skills */}
          {resume.skills && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-3 border-b-2 border-slate-200 pb-1">
                {resume.translatedLabels.skills || "Skills"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(resume.skills)
                  ? resume.skills
                  : resume.skills.split(", ")
                ).map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Work Experience */}
          {resume.experience && resume.experience !== "Fresher" && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-3 border-b-2 border-slate-200 pb-1">
                {resume.translatedLabels.experience || "Work Experience"}
              </h2>
              {Array.isArray(resume.experience) ? (
                resume.experience.map((exp, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <div className="font-semibold text-slate-800">
                      {exp.title || ""}
                      {exp.company && (
                        <span className="text-slate-600">
                          {" "}
                          at {exp.company}
                        </span>
                      )}
                      {exp.years && (
                        <span className="text-slate-500 font-normal">
                          {" "}
                          ({exp.years})
                        </span>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-slate-700 mt-2 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-700 leading-relaxed">
                  {resume.experience}
                </p>
              )}
            </section>
          )}

          {/* Education */}
          {resume.education && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-3 border-b-2 border-slate-200 pb-1">
                {resume.translatedLabels.education || "Education"}
              </h2>
              {Array.isArray(resume.education) ? (
                resume.education.map((edu, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="font-semibold text-slate-800">
                      {edu.degree || ""}
                      {edu.university && (
                        <span className="text-slate-600">
                          {" "}
                          - {edu.university}
                        </span>
                      )}
                      {edu.years && (
                        <span className="text-slate-500 font-normal">
                          {" "}
                          ({edu.years})
                        </span>
                      )}
                    </div>
                    {edu.gpa && (
                      <p className="text-slate-700 mt-1">GPA: {edu.gpa}</p>
                    )}
                    {edu.honors && (
                      <p className="text-slate-700 mt-1">{edu.honors}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-700 leading-relaxed">
                  {resume.education}
                </p>
              )}
            </section>
          )}

          {/* Projects */}
          {resume.projects && resume.projects !== "Web Apps" && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-3 border-b-2 border-slate-200 pb-1">
                {resume.translatedLabels.projects || "Projects"}
              </h2>
              {Array.isArray(resume.projects) ? (
                resume.projects.map((proj, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="font-semibold text-slate-800">
                      {proj.name || ""}
                    </div>
                    {proj.description && (
                      <p className="text-slate-700 mt-2 leading-relaxed">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-700 leading-relaxed">
                  {resume.projects}
                </p>
              )}
            </section>
          )}

          {/* Internship Experience */}
          {resume.internship && resume.internship !== "N.A" && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-3 border-b-2 border-slate-200 pb-1">
                {resume.translatedLabels.internship || "Internship Experience"}
              </h2>
              {Array.isArray(resume.internship) ? (
                resume.internship.map((intern, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="font-semibold text-slate-800">
                      {intern.title || ""}
                      {intern.company && (
                        <span className="text-slate-600">
                          {" "}
                          at {intern.company}
                        </span>
                      )}
                      {intern.years && (
                        <span className="text-slate-500 font-normal">
                          {" "}
                          ({intern.years})
                        </span>
                      )}
                    </div>
                    {intern.description && (
                      <p className="text-slate-700 mt-2 leading-relaxed">
                        {intern.description}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-700 leading-relaxed">
                  {resume.internship}
                </p>
              )}
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Certifications */}
            {resume.certifications && resume.certifications.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-slate-800 mb-3 border-b-2 border-slate-200 pb-1">
                  {resume.translatedLabels.certifications || "Certifications"}
                </h2>
                {Array.isArray(resume.certifications) ? (
                  <ul className="space-y-2">
                    {resume.certifications.map((cert, index) => (
                      <li
                        key={index}
                        className="text-slate-700 flex items-start gap-2"
                      >
                        <span className="text-slate-400 mt-1">•</span>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-2">
                    {resume.certifications.split(", ").map((cert, index) => (
                      <li
                        key={index}
                        className="text-slate-700 flex items-start gap-2"
                      >
                        <span className="text-slate-400 mt-1">•</span>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {/* Languages */}
            {resume.languages && (
              <section>
                <h2 className="text-xl font-semibold text-slate-800 mb-3 border-b-2 border-slate-200 pb-1">
                  {resume.translatedLabels.languages || "Languages"}
                </h2>
                {Array.isArray(resume.languages) ? (
                  <div className="space-y-2">
                    {resume.languages.map((lang, index) => (
                      <p key={index} className="text-slate-700">
                        {typeof lang === "object"
                          ? `${lang.language || ""} (${lang.proficiency || ""})`
                          : lang}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-700 leading-relaxed">
                    {resume.languages}
                  </p>
                )}
              </section>
            )}
          </div>

          {/* Achievements */}
          {resume.achievements && resume.achievements.length > 0 && (
            <section className="mb-8 mt-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-3 border-b-2 border-slate-200 pb-1">
                {resume.translatedLabels.achievements || "Achievements"}
              </h2>
              {Array.isArray(resume.achievements) ? (
                <ul className="space-y-2">
                  {resume.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="text-slate-700 flex items-start gap-2"
                    >
                      <span className="text-slate-400 mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2">
                  {resume.achievements.split(", ").map((achievement, index) => (
                    <li
                      key={index}
                      className="text-slate-700 flex items-start gap-2"
                    >
                      <span className="text-slate-400 mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Volunteer Work */}
          {resume.volunteer && resume.volunteer.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-3 border-b-2 border-slate-200 pb-1">
                {resume.translatedLabels.volunteer || "Volunteer Work"}
              </h2>
              {Array.isArray(resume.volunteer) ? (
                resume.volunteer.map((vol, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="font-semibold text-slate-800">
                      {vol.organization || ""}
                    </div>
                    {vol.description && (
                      <p className="text-slate-700 mt-2 leading-relaxed">
                        {vol.description}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-700 leading-relaxed">
                  {resume.volunteer}
                </p>
              )}
            </section>
          )}

          {/* Hobbies & Interests */}
          {resume.hobbies && resume.hobbies.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-3 border-b-2 border-slate-200 pb-1">
                {resume.translatedLabels.hobbies || "Hobbies & Interests"}
              </h2>
              {Array.isArray(resume.hobbies) ? (
                <p className="text-slate-700 leading-relaxed">
                  {resume.hobbies.join(", ")}
                </p>
              ) : (
                <p className="text-slate-700 leading-relaxed">
                  {resume.hobbies}
                </p>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
