import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TextPreview({ contactName, phoneNumber }) {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!contactName || !phoneNumber) return;

    const timers = [
      setTimeout(() => setStep(1), 2000), // Show instruction
      setTimeout(() => setStep(2), 3000), // Show typing
      setTimeout(() => setStep(3), 5000), // Show message
    ];

    return () => timers.forEach(clearTimeout);
  }, [nacontactNameme, phoneNumber]);

  const sendText = () => {
    setSent(true);
    setStep(4);
    // You can hook this up to your backend via fetch/AJAX here
  };

  return (
    <div className="text-message-container bg-white rounded-xl p-4 shadow-md max-w-md mx-auto mt-6">
      {/* Header */}
      <div className="flex items-center mb-4">
        <img src="/Media/TBT_Logo.png" alt="Logo" className="h-8 mr-2" />
        <div className="font-bold text-gray-800">Tom Built This</div>
      </div>

      {/* Instruction Bubble */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            key="instruction"
            className="text-bubble system-message bg-gray-200 rounded-xl px-4 py-2 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Below is the text message that will be sent to: {phoneNumber}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Typing Indicator */}
      <AnimatePresence>
        {(step === 2 || step === 4) && (
          <motion.div
            key="typing"
            className="typing-indicator flex space-x-1 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Bubble */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            key="message"
            className="text-bubble bg-blue-500 text-white rounded-xl px-4 py-2 self-end mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Hey there {contactName}! Here is an example text message you would receive from Tom Built This
          </motion.div>
        )}
      </AnimatePresence>

      {/* Receipt */}
      {step >= 3 && (
        <div className="text-xs text-right text-gray-500">
          {sent ? 'Delivered' : 'Ready to send'}
        </div>
      )}

      {/* Send Button */}
      {step >= 3 && !sent && (
        <div className="text-center mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={sendText}
          >
            Send Text Message
          </button>
        </div>
      )}

      {/* Final Confirmation Bubble */}
      <AnimatePresence>
        {step === 4 && (
          <motion.div
            key="followup"
            className="text-bubble system-message bg-gray-100 text-gray-800 rounded-xl px-4 py-2 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            You should receive a text message shortly from +18333022086
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}