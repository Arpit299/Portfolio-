"use client";

import { motion } from "framer-motion";
import { timelineEntryVariant, timelineDotVariant } from "@/lib/animate";
import type { ExperienceItem } from "@/types";

const experiences: ExperienceItem[] = [
  {
    title: "Software Developer Intern",
    company: "Codexa Labs Pvt. Ltd.",
    period: "August 2025 – Feb 2026",
    description:
      "Building production-grade solutions with modern stack. Contributing to AI-powered features and backend architecture. Focusing on performance optimization and security best practices.",
    isEducation: false,
  },
  {
    title: "Data Science & GenAI Internship",
    company: "GRRAS Solution Pvt. Ltd.",
    period: "2025",
    description:
      "Developed AI solutions using LLMs and prompt engineering. Built RAG systems and experimented with AI agent architectures. Collaborated on data pipeline optimization.",
    isEducation: false,
  },
  {
    title: "Volunteer",
    company: "Sobhasaria Mini Hackathon",
    period: "2024",
    description:
      "Organized and facilitated a mini hackathon event. Mentored participants in full-stack development and AI integration. Judged projects based on innovation and execution.",
    isEducation: false,
  },
  {
    title: "B.Tech in Computer Science",
    company: "Sobhasaria Group of Institution",
    period: "2023 – 2027",
    description:
      "Specialized in AI and Machine Learning. Strong foundation in algorithms, databases, and software architecture. Active in coding competitions and innovation clubs.",
    isEducation: true,
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="section bg-gradient-to-b from-navy-light to-navy-dark"
    >
      <div className="section-container">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 mb-4">
            Experience & <span className="text-accent-cyan">Education</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-cyan to-gold mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-cyan to-gold/30 transform -translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  variants={timelineEntryVariant(isLeft)}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.3 }}
                  className={`relative grid grid-cols-1 sm:grid-cols-2 gap-8 items-center`}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="hidden sm:flex absolute left-1/2 top-8 w-4 h-4 bg-accent-cyan rounded-full border-4 border-navy-dark shadow-lg transform -translate-x-1/2 z-10 cursor-default"
                    variants={timelineDotVariant}
                    whileHover="hover"
                    animate="animate"
                  />

                  {/* Content Container */}
                  <div
                    className={
                      isLeft
                        ? "sm:text-right sm:pr-12"
                        : "sm:col-start-2 sm:pl-12"
                    }
                  >
                    <motion.div
                      className="card"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 25px rgba(100, 255, 218, 0.15)",
                      }}
                    >
                      {/* Badge */}
                      <div className="inline-block mb-3">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            exp.isEducation
                              ? "bg-gold/20 text-gold"
                              : "bg-accent-cyan/20 text-accent-cyan"
                          }`}
                        >
                          {exp.isEducation ? "Education" : "Experience"}
                        </span>
                      </div>

                      {/* Company & Title */}
                      <h3 className="text-h4 text-slate-light mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-accent-cyan font-semibold mb-2">
                        {exp.company}
                      </p>
                      <p className="text-xs text-slate mb-4">{exp.period}</p>

                      {/* Description */}
                      <p className="text-body text-slate">{exp.description}</p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
