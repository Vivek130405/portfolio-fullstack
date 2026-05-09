"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, Calendar, RefreshCw, ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Message | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/login");
  };

  const fetchMessages = async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/messages`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      
      if (res.status === 401 || res.status === 403) {
        handleLogout();
        return;
      }

      if (data.success) {
        setMessages(data.data);
      } else {
        setError(data.message || "Failed to fetch messages.");
      }
    } catch {
      setError("Cannot connect to backend. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/login");
    } else {
      fetchMessages();
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background text-white p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-400 hover:text-neon-blue transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 text-sm">Contact Form Messages</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={fetchMessages}
              className="flex items-center gap-2 px-4 py-2 bg-neon-blue/10 border border-neon-blue/40 rounded-full text-neon-blue hover:bg-neon-blue/20 transition-all text-sm"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/40 rounded-full text-red-400 hover:bg-red-500/20 transition-all text-sm"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/3 border border-white/8 rounded-2xl p-4 backdrop-blur-xl">
            <p className="text-gray-500 text-sm">Total Messages</p>
            <p className="text-3xl font-bold text-neon-blue mt-1">{messages.length}</p>
          </div>
          <div className="bg-white/3 border border-white/8 rounded-2xl p-4 backdrop-blur-xl">
            <p className="text-gray-500 text-sm">Latest Message</p>
            <p className="text-white mt-1 text-sm truncate">
              {messages[0]?.name || "No messages yet"}
            </p>
          </div>
          <div className="bg-white/3 border border-white/8 rounded-2xl p-4 backdrop-blur-xl">
            <p className="text-gray-500 text-sm">Status</p>
            <p className="text-green-400 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Authenticated
            </p>
          </div>
        </div>

        {/* Messages */}
        {loading ? (
          <div className="flex justify-center py-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-2 border-neon-blue border-t-transparent rounded-full"
            />
          </div>
        ) : error ? (
          <div className="text-center py-24 text-red-400">{error}</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <MessageSquare size={48} className="mx-auto mb-4 opacity-30" />
            <p>No messages yet.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Message List */}
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(msg)}
                  className={`bg-white/3 border rounded-xl p-4 cursor-pointer hover:border-neon-blue/40 hover:bg-neon-blue/5 transition-all ${
                    selected?._id === msg._id ? "border-neon-blue/60 bg-neon-blue/10" : "border-white/8"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">{msg.name}</p>
                      <p className="text-neon-blue text-sm truncate">{msg.subject}</p>
                      <p className="text-gray-500 text-xs truncate mt-1">{msg.message}</p>
                    </div>
                    <span className="text-xs text-gray-600 shrink-0">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Detail */}
            {selected ? (
              <motion.div
                key={selected._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/3 border border-white/8 rounded-2xl p-6 backdrop-blur-xl h-fit sticky top-6"
              >
                <h3 className="text-xl font-bold text-white mb-2">{selected.subject}</h3>
                <div className="space-y-2 mb-4 text-sm text-gray-400">
                  <p className="flex items-center gap-2"><Mail size={14} className="text-neon-blue" /> {selected.email}</p>
                  {selected.phone && <p className="flex items-center gap-2"><Phone size={14} className="text-neon-blue" /> {selected.phone}</p>}
                  <p className="flex items-center gap-2">
                    <Calendar size={14} className="text-neon-blue" />
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="mt-6 flex items-center justify-center gap-2 py-2 px-4 bg-neon-blue/10 border border-neon-blue/40 rounded-full text-neon-blue hover:bg-neon-blue/20 transition-all text-sm"
                >
                  <Mail size={14} /> Reply via Email
                </a>
              </motion.div>
            ) : (
              <div className="bg-white/3 border border-white/8 rounded-2xl p-6 flex items-center justify-center text-gray-600">
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
