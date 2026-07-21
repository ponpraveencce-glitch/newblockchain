import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
export default function Contact() {
  const [success, setSuccess] = useState(false);
        <div className="space-y-4 pt-4 text-sm font-medium">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <FiMapPin />
              <MapPin size={16} />
            </div>
            <p>IIT Research Park, Chennai, India</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <FiMail />
              <Mail size={16} />
            </div>
            <p>support@certverify.blockchain</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <FiPhone />
              <Phone size={16} />
            </div>
            <p>+91 (044) 2257-8900</p>
          </div>
        </div>
      </div>
      {/* Form Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-xl space-y-4">
        {success && (
          <div className="p-4 rounded-xl bg-success/10 border border-success/20 text-success text-xs flex gap-2 items-center">
            <FiCheckCircle size={18} />
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex gap-2 items-center">
            <CheckCircle size={18} className="text-emerald-500" />
            <span>Thank you! Your enquiry has been received. Our team will contact you shortly.</span>
          </div>
        )}
