"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiLogOut, FiInbox, FiCheck, FiDatabase, FiTrendingUp } from "react-icons/fi";

interface DashboardStats {
  totalContacts: number;
  unreadMessages: number;
  projectsCompleted: number;
  yearsExperience: number;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get token from localStorage
    const storedToken = localStorage.getItem("auth-token");
    if (!storedToken) {
      router.push("/admin/login");
      return;
    }

    setToken(storedToken);
    fetchDashboardData(storedToken);
  }, [router]);

  const fetchDashboardData = async (authToken: string) => {
    try {
      setLoading(true);

      // Fetch stats
      const statsRes = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!statsRes.ok) {
        throw new Error("Failed to fetch stats");
      }

      const statsData = await statsRes.json();
      setStats(statsData.data);

      // Fetch messages
      const messagesRes = await fetch("/api/admin/contacts", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!messagesRes.ok) {
        throw new Error("Failed to fetch messages");
      }

      const messagesData = await messagesRes.json();
      setMessages(messagesData.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("auth-token");
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!token) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-cyan" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-dark text-slate-light">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-accent-cyan">Admin Dashboard</h1>
            <p className="text-slate mt-2">Manage your portfolio and messages</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-secondary flex items-center gap-2"
          >
            <FiLogOut />
            Logout
          </button>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-500"
          >
            {error}
          </motion.div>
        )}

        {/* Stats Grid */}
        {stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate text-sm">Total Messages</p>
                  <p className="text-3xl font-bold text-accent-cyan">
                    {stats.totalContacts}
                  </p>
                </div>
                <FiInbox className="text-accent-cyan" size={32} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate text-sm">Unread</p>
                  <p className="text-3xl font-bold text-gold">
                    {stats.unreadMessages}
                  </p>
                </div>
                <FiCheck className="text-gold" size={32} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate text-sm">Projects</p>
                  <p className="text-3xl font-bold text-accent-cyan">
                    {stats.projectsCompleted}
                  </p>
                </div>
                <FiDatabase className="text-accent-cyan" size={32} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate text-sm">Years Exp</p>
                  <p className="text-3xl font-bold text-gold">
                    {stats.yearsExperience}+
                  </p>
                </div>
                <FiTrendingUp className="text-gold" size={32} />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Messages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-slate-light mb-6">Recent Messages</h2>

          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 rounded-lg border ${
                    message.read
                      ? "bg-white/5 border-white/10"
                      : "bg-accent-cyan/10 border-accent-cyan/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-light">
                        {message.name}
                      </h3>
                      <p className="text-sm text-slate">{message.email}</p>
                    </div>
                    {!message.read && (
                      <span className="text-xs bg-accent-cyan/20 text-accent-cyan px-2 py-1 rounded">
                        Unread
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-accent-cyan mb-2">
                    {message.subject}
                  </p>
                  <p className="text-sm text-slate">{message.message.substring(0, 200)}...</p>
                  <p className="text-xs text-slate mt-3">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-slate text-center py-8">No messages yet</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
