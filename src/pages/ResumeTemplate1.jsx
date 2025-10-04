// src/components/ResumeTemplate1.jsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const ResumeTemplate1 = ({ resume }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: "Helvetica",
      backgroundColor: "#f0f4f8",
      color: "#1e293b",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 5,
      color: "#2563eb",
    },
    subHeader: {
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 5,
      color: "#f59e0b",
    },
    text: {
      fontSize: 11,
      marginBottom: 3,
      lineHeight: 1.3,
    },
    section: {
      marginBottom: 10,
    },
  });

  return (
    <Document>
      <Page style={styles.page}>
        {/* Name & Title */}
        <Text style={styles.header}>{resume.fullName || ""}</Text>
        {resume.title && <Text style={styles.text}>{resume.title}</Text>}
        {resume.email && <Text style={styles.text}>📧 {resume.email}</Text>}
        {resume.phone && <Text style={styles.text}>📞 {resume.phone}</Text>}
        {resume.linkedin && <Text style={styles.text}>🔗 {resume.linkedin}</Text>}
        {resume.github && <Text style={styles.text}>🐱 {resume.github}</Text>}
        {resume.location && <Text style={styles.text}>📍 {resume.location}</Text>}

        {/* Summary */}
        {resume.summary && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>
              {resume.translatedLabels?.summary || "Professional Summary"}
            </Text>
            <Text style={styles.text}>{resume.summary}</Text>
          </View>
        )}

        {/* Skills */}
        {resume.skills && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>
              {resume.translatedLabels?.skills || "Skills"}
            </Text>
            <Text style={styles.text}>
              {Array.isArray(resume.skills) ? resume.skills.join(", ") : resume.skills}
            </Text>
          </View>
        )}

        {/* Experience */}
        {resume.experience && resume.experience !== "Fresher" && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>
              {resume.translatedLabels?.experience || "Work Experience"}
            </Text>
            {Array.isArray(resume.experience)
              ? resume.experience.map((exp, i) => (
                  <View key={i} style={{ marginBottom: 5 }}>
                    <Text style={styles.text}>
                      <Text style={{ fontWeight: "bold" }}>{exp.title || ""}</Text>
                      {exp.company && ` at ${exp.company}`}
                      {exp.years && ` (${exp.years})`}
                    </Text>
                    {exp.description && <Text style={styles.text}>{exp.description}</Text>}
                  </View>
                ))
              : <Text style={styles.text}>{resume.experience}</Text>}
          </View>
        )}

        {/* Education */}
        {resume.education && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>
              {resume.translatedLabels?.education || "Education"}
            </Text>
            {Array.isArray(resume.education)
              ? resume.education.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 5 }}>
                    <Text style={styles.text}>
                      <Text style={{ fontWeight: "bold" }}>{edu.degree || ""}</Text>
                      {edu.university && ` - ${edu.university}`}
                      {edu.years && ` (${edu.years})`}
                    </Text>
                    {edu.gpa && <Text style={styles.text}>GPA: {edu.gpa}</Text>}
                    {edu.honors && <Text style={styles.text}>{edu.honors}</Text>}
                  </View>
                ))
              : <Text style={styles.text}>{resume.education}</Text>}
          </View>
        )}

        {/* Projects */}
        {resume.projects && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>
              {resume.translatedLabels?.projects || "Projects"}
            </Text>
            {Array.isArray(resume.projects)
              ? resume.projects.map((proj, i) => (
                  <View key={i} style={{ marginBottom: 5 }}>
                    <Text style={styles.text}>
                      <Text style={{ fontWeight: "bold" }}>{proj.name || ""}</Text>
                    </Text>
                    {proj.description && <Text style={styles.text}>{proj.description}</Text>}
                  </View>
                ))
              : <Text style={styles.text}>{resume.projects}</Text>}
          </View>
        )}

        {/* Certifications */}
        {resume.certifications && resume.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>
              {resume.translatedLabels?.certifications || "Certifications"}
            </Text>
            {resume.certifications.map((cert, i) => (
              <Text key={i} style={styles.text}>• {cert}</Text>
            ))}
          </View>
        )}

        {/* Achievements */}
        {resume.achievements && resume.achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Achievements</Text>
            {resume.achievements.map((ach, i) => (
              <Text key={i} style={styles.text}>• {ach}</Text>
            ))}
          </View>
        )}

        {/* Languages */}
        {resume.languages && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>
              {resume.translatedLabels?.languages || "Languages"}
            </Text>
            {Array.isArray(resume.languages)
              ? resume.languages.map((lang, i) => (
                  <Text key={i} style={styles.text}>
                    {typeof lang === "object" ? `${lang.language || ""} (${lang.proficiency || ""})` : lang}
                  </Text>
                ))
              : <Text style={styles.text}>{resume.languages}</Text>}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumeTemplate1;
