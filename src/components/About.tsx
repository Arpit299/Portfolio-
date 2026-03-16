"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { staggerContainerVariant, staggerItemVariant } from "@/lib/animate";

const stats = [
  { value: "2+", label: "Years Engineering Intelligent AI Systems" },
  { value: "3", label: "High-Precision Prompt & AI Builds" },
  { value: "7+", label: "AI Platforms & LLM Tools Mastered" },
  { value: "100%", label: "Outcome-Driven Delivery" },
];

const skills = [
  "Advanced Prompt Architecture",
  "AI Agent & Multi-Agent System Design",
  "Retrieval-Augmented Generation (RAG)",
  "LLM Optimization & Behavior Engineering",
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      ref={containerRef}
      className="section bg-gradient-to-b from-navy-dark to-navy-light"
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
            About<span className="text-accent-cyan"> Arpit Kumawat</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-cyan to-gold mx-auto" />
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: AI Visualization SVG */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-center"
          >
            <svg
              viewBox="0 0 300 300"
              className="w-64 h-64 sm:w-80 sm:h-80"
            >
              {/* Background circles */}
              <motion.circle
                cx="150"
                cy="150"
                r="130"
                fill="none"
                stroke="rgba(100, 255, 218, 0.1)"
                strokeWidth="1"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle
                cx="150"
                cy="150"
                r="100"
                fill="none"
                stroke="rgba(255, 215, 0, 0.1)"
                strokeWidth="1"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              {/* Pulsing core */}
              <motion.circle
                cx="150"
                cy="150"
                r="15"
                fill="rgba(100, 255, 218, 0.8)"
                filter="url(#glow)"
                animate={{
                  r: [15, 20, 15],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Floating particles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.circle
                  key={i}
                  cx="150"
                  cy="150"
                  r="3"
                  fill={i % 2 === 0 ? "rgba(100, 255, 218, 0.6)" : "rgba(255, 215, 0, 0.6)"}
                  animate={{
                    cx: [150, 150 + 60 * Math.cos((i * Math.PI) / 2), 150],
                    cy: [150, 150 + 60 * Math.sin((i * Math.PI) / 2), 150],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}

              {/* Glow filter */}
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-body text-slate mb-6 leading-relaxed">
              I am an AI Consultant specializing in advanced prompt engineering, AI agent systems, and large language model optimization. With deep expertise in architecting intelligent automation and developing fine-tuned AI solutions, I help businesses unlock transformative value through cutting-edge artificial intelligence.
            </p>

            <p className="text-body text-slate mb-6 leading-relaxed">
              My focus includes designing scalable Retrieval-Augmented Generation (RAG) architectures, building custom AI agents, and deploying generative AI systems that streamline workflows, enhance decision-making, and drive innovation. I work with technologies such as OpenAI GPT, Anthropic Claude, Google Gemini, LangChain, and LlamaIndex—crafting tailored solutions that integrate seamlessly into modern tech stacks.
            </p>

            <p className="text-body text-slate mb-6 leading-relaxed">
              From automating complex business processes to pioneering conversational AI and intelligent document analysis, I thrive on solving high-impact problems with precision and creativity. My mission is to make AI not just advanced, but practical, reliable, and impactful.
            </p>

            <p className="text-body text-slate mb-8 leading-relaxed">
              Based in India, I collaborate with forward-thinking startups, enterprises, and individuals who want to stay ahead in the AI-driven era. Let's build intelligent systems that don't just compute—they create value.
            </p>

            {/* Skills Preview */}
            <div className="mb-8">
              <h3 className="text-h4 text-slate-light mb-4">Core Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 glass rounded-full text-sm text-accent-cyan hover:shadow-glow transition-all"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          variants={staggerContainerVariant}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={staggerItemVariant}
              className="card-hover text-center p-6"
            >
              <div className="text-3xl sm:text-4xl font-bold text-accent-cyan mb-2">
                {stat.value}
              </div>
              <p className="text-small text-slate">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
