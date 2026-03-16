"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiMail, FiMapPin, FiLinkedin } from "react-icons/fi";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { successVariant, errorVariant } from "@/lib/animate";

type FormState = "idle" | "loading" | "success" | "error";

interface ContactState {
  status: FormState;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [contactState, setContactState] = useState<ContactState>({
    status: "idle",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactState({ status: "loading", message: "" });

    try {
      // Validate using Zod
      const validatedData = contactFormSchema.parse(formData);

      // Send to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setContactState({
        status: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset form after 3 seconds
      setTimeout(() => {
        setContactState({ status: "idle", message: "" });
      }, 3000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred. Please try again.";
      setContactState({ status: "error", message });

      setTimeout(() => {
        setContactState({ status: "idle", message: "" });
      }, 3000);
    }
  };

  return (
    <section id="contact" className="section bg-gradient-to-b from-navy-dark to-navy-light">
      <div className="section-container max-w-3xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 mb-4">
            Let's <span className="text-accent-cyan">Connect</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-accent-cyan to-gold mx-auto" />
          <p className="text-body text-slate mt-6 max-w-lg mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card text-center"
          >
            <div className="inline-block p-3 bg-accent-cyan/20 rounded-lg mb-4">
              <FiMail className="text-accent-cyan" size={24} />
            </div>
            <h3 className="text-h4 text-slate-light mb-2">Email</h3>
            <p className="text-slate text-sm">kumawatarpit06@gmail.com</p>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="card text-center"
          >
            <div className="inline-block p-3 bg-gold/20 rounded-lg mb-4">
              <FiMapPin className="text-gold" size={24} />
            </div>
            <h3 className="text-h4 text-slate-light mb-2">Location</h3>
            <p className="text-slate text-sm">India</p>
          </motion.div>

          {/* LinkedIn */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="card text-center"
          >
            <a
              href="https://www.linkedin.com/in/arpit-kumawat06"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:scale-105 transition-transform"
            >
              <div className="inline-block p-3 bg-accent-cyan/20 rounded-lg mb-4">
                <FiLinkedin className="text-accent-cyan" size={24} />
              </div>
              <h3 className="text-h4 text-slate-light mb-2">LinkedIn</h3>
              <p className="text-slate text-sm">Connect with me</p>
            </a>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="card"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name Field */}
            <div>
              <label className="block text-slate-light text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-light placeholder-slate/50 focus:outline-none focus:border-accent-cyan focus:bg-white/10 transition-all ${
                  errors.name ? "border-red-500" : ""
                }`}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-slate-light text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-light placeholder-slate/50 focus:outline-none focus:border-accent-cyan focus:bg-white/10 transition-all ${
                  errors.email ? "border-red-500" : ""
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Subject Field */}
          <div className="mb-6">
            <label className="block text-slate-light text-sm font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project inquiry, collaboration, etc."
              className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-light placeholder-slate/50 focus:outline-none focus:border-accent-cyan focus:bg-white/10 transition-all ${
                errors.subject ? "border-red-500" : ""
              }`}
            />
            {errors.subject && (
              <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
            )}
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label className="block text-slate-light text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              rows={5}
              className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-light placeholder-slate/50 focus:outline-none focus:border-accent-cyan focus:bg-white/10 transition-all resize-none ${
                errors.message ? "border-red-500" : ""
              }`}
              required
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={contactState.status === "loading"}
            className="btn btn-primary w-full"
            whileHover={{ scale: contactState.status !== "loading" ? 1.02 : 1 }}
            whileTap={{ scale: contactState.status !== "loading" ? 0.98 : 1 }}
          >
            {contactState.status === "loading" ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>

        {/* Status Messages */}
        <AnimatePresence>
          {contactState.status === "success" && (
            <motion.div
              variants={successVariant}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3"
            >
              <FiCheck className="text-green-500" size={20} />
              <p className="text-green-500">{contactState.message}</p>
            </motion.div>
          )}

          {contactState.status === "error" && (
            <motion.div
              variants={errorVariant}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3"
            >
              <FiX className="text-red-500" size={20} />
              <p className="text-red-500">{contactState.message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
