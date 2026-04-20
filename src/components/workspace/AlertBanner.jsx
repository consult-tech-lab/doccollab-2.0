import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export default function AlertBanner({ alert, onDismiss }) {
  useEffect(() => {
    if (alert) {
      const t = setTimeout(onDismiss, 5000);
      return () => clearTimeout(t);
    }
  }, [alert]);

  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-red-500 text-white shadow-xl shadow-red-500/30 max-w-sm w-full mx-4"
        >
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-bold">Urgent Alert Sent</p>
            <p className="text-xs opacity-90">{alert}</p>
          </div>
          <button onClick={onDismiss}><X className="w-4 h-4" /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}