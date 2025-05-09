// components/common/ConfirmModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { y: "-50%", opacity: 0, scale: 0.9 },
  visible: { y: "0", opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const ConfirmModal = ({ isOpen, onCancel, onConfirm, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl"
            variants={modal}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Are you sure?
            </h2>
            <p className="text-gray-600 mb-6">{message || "This action cannot be undone."}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
               Yes, Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
