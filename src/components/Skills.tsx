"use client";

import { motion } from "framer-motion";
import { staggerContainerVariant, staggerItemVariant } from "@/lib/animate";
import type { SkillCategory } from "@/types";

const skillsData: SkillCategory[] = [
  {
    title: "Core Technical Expertise",
    skills: [
      "Prompt Architecture & Optimization",
      "AI Agent Systems",
      "RAG Pipelines",
      "LLM Orchestration",
      "OpenAI & Claude APIs",
      "LangChain",
      "AI Workflow Automation",
    ],
  },
  {
    title: "Tools & Infrastructure",
    skills: [
      "Git/GitHub",
      "Google Gemini",
      "Google Antigravity",
      "Vercel",
      "VS Code",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section bg-navy-dark">
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
            Technical <span className="text-accent-cyan">Skills</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-cyan to-gold mx-auto" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="card"
            >
              <h3 className="text-h4 text-accent-cyan mb-6">{category.title}</h3>

              {/* Skills Tags */}
              <motion.div
                variants={staggerContainerVariant}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={staggerItemVariant}
                    className="group relative"
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center px-4 py-2 glass rounded-lg text-sm text-slate-light hover:text-accent-cyan hover:border-accent-cyan/50 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Technology Stack Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 card bg-gradient-to-r from-accent-cyan/10 to-gold/10 border-accent-cyan/30"
        >
          <h3 className="text-h4 text-slate-light mb-4">AI Stack Overview</h3>
          <p className="text-body text-slate mb-6">
            Modern LLM technologies and agentic frameworks for building structured, reliable, and production-grade AI systems.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["Prompt Architecture", "AI Agent Systems", "RAG Pipelines", "OpenAI & Claude APIs", "LangChain", "LLM Workflow Engineering"].map(
              (tech, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-cyan rounded-full" />
                  <span className="text-sm text-slate-light">{tech}</span>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
