"use client";

import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { staggerContainerVariant, staggerItemVariant } from "@/lib/animate";
import type { ProjectItem } from "@/types";

const projects: ProjectItem[] = [
  {
    id: "1",
    title: "Hiring Compass",
    description:
      "An intelligent AI-powered hiring platform using RAG and LLM integration for candidate evaluation. Built with Next.js, PostgreSQL, and advanced prompt engineering techniques.",
    tags: ["Next.js", "RAG", "OpenAI", "PostgreSQL", "TypeScript"],
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    liveUrl: "https://hiringcompass.example.com",
    githubUrl: "https://github.com/Arpit299/hiring-compass",
  },
  {
    id: "2",
    title: "AI Notes Summarizer",
    description:
      "Intelligent note-taking application built in Google Colab with Python. Uses Claude API to generate smart summaries with advanced prompt engineering techniques.",
    tags: ["Python", "Google Colab", "Claude API", "NLP", "Jupyter"],
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    liveUrl: "https://ainotessummarizer.example.com",
    githubUrl: "https://github.com/Arpit299/ai-notes-summarizer",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section bg-navy-dark">
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
            Featured <span className="text-accent-cyan">Projects</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-cyan to-gold mx-auto" />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainerVariant}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={staggerItemVariant}
              className="group h-full"
            >
              <motion.div
                className="relative h-full card overflow-hidden"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(100, 255, 218, 0.2)",
                }}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                  <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />
                </div>

                {/* Content Section */}
                <h3 className="text-h4 text-slate-light mb-2">{project.title}</h3>
                <p className="text-body text-slate mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-accent-cyan/20 text-accent-cyan rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-auto">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 btn btn-primary text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiExternalLink size={16} />
                      Live
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 btn btn-secondary text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiGithub size={16} />
                      Code
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-slate mb-6">Want to see more projects?</p>
          <motion.a
            href={process.env.NEXT_PUBLIC_GITHUB_URL || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Visit GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
