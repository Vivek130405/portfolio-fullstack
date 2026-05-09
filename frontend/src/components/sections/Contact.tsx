"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): boolean => {
    if (!form.name.trim()) { setErrorMsg("Full name is required."); return false; }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setErrorMsg("A valid email is required."); return false; }
    if (!form.subject.trim()) { setErrorMsg("Subject is required."); return false; }
    if (form.message.trim().length < 10) { setErrorMsg("Message must be at least 10 characters."); return false; }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!validate()) return;

    setStatus("loading");

    let emailSent = false;
    let savedToDb = false;

    // 1. Send to Web3Forms directly from browser (this is how it's designed to work)
    try {
      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          subject: `📩 New Portfolio Message: ${form.subject}`,
          message: form.message,
          from_name: "Portfolio Contact Form",
          // Redirect to thank-you (optional, we handle it in UI)
          redirect: "false",
        }),
      });
      const web3Data = await web3Res.json();
      if (web3Data.success) {
        emailSent = true;
        console.log("✅ Email sent via Web3Forms");
      } else {
        console.warn("⚠️ Web3Forms error:", web3Data.message);
      }
    } catch (err) {
      console.warn("⚠️ Web3Forms failed:", err);
    }

    // 2. Also save to backend MongoDB (optional — if backend is running)
    try {
      const backendRes = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const backendData = await backendRes.json();
      if (backendData.success) savedToDb = true;
    } catch {
      // Backend not running is fine — Web3Forms handles email
      console.warn("ℹ️ Backend not available, message not saved to DB.");
    }

    if (emailSent || savedToDb) {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } else {
      setStatus("error");
      setErrorMsg("Failed to send message. Please try again or contact me directly.");
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/60 focus:ring-1 focus:ring-neon-blue/30 transition-all duration-300";

  const contactInfo = [
    { icon: Mail, label: "Email", value: "kakadev055@gmail.com", href: "mailto:kakadev055@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 XXXXX XXXXX", href: "tel:+91XXXXXXXXXX" },
    { icon: MessageSquare, label: "LinkedIn", value: "linkedin.com/in/yourprofile", href: "https://linkedin.com" },
  ];

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-neon-blue font-mono text-sm tracking-[0.3em] uppercase mb-3">Let&apos;s Connect</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto mt-4 rounded-full" />
          <p className="text-gray-400 mt-4 max-w-lg mx-auto">
            Have a project in mind? Want to collaborate? Or just want to say hello? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <GlassCard>
              <h3 className="text-xl font-bold text-white mb-6">Contact Details</h3>
              <div className="space-y-5">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 text-gray-400 hover:text-neon-blue transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center shrink-0 group-hover:bg-neon-blue/20 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
                      <Icon size={16} className="text-neon-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="text-center">
              <p className="text-gray-400 text-sm mb-2">Open to work</p>
              <span className="inline-flex items-center gap-2 text-green-400">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Available for Hire
              </span>
            </GlassCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <GlassCard>
              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>

              {status === "success" ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle size={56} className="text-green-400 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-gray-400">
                    Thank you for contacting me. I&apos;ll get back to you soon!
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 px-6 py-2 bg-neon-blue/10 border border-neon-blue/50 rounded-full text-neon-blue hover:bg-neon-blue/20 transition-all"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-3.5 text-gray-600" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Full Name *"
                        className={`${inputClass} pl-10`}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-3.5 text-gray-600" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email Address *"
                        className={`${inputClass} pl-10`}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-3.5 text-gray-600" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Subject *"
                      className={inputClass}
                      required
                    />
                  </div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your message... (minimum 10 characters)"
                    rows={5}
                    className={inputClass}
                    required
                  />

                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-400 text-sm"
                    >
                      <AlertCircle size={14} />
                      {errorMsg}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,240,255,0.15), rgba(138,43,226,0.15))",
                      border: "1px solid rgba(0,240,255,0.4)",
                      boxShadow: status === "loading" ? "none" : "0 0 20px rgba(0,240,255,0.2)",
                    }}
                  >
                    {status === "loading" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-neon-blue border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Send size={18} className="text-neon-blue" />
                        <span className="text-white">Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
