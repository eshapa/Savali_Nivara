import React from 'react';
import { motion } from 'framer-motion';
import { Check, ClipboardList, Truck, PackageCheck, HeartHandshake, IndianRupee } from 'lucide-react';

const TransparencyTracker = ({ status, type }) => {
  const isMoney = type === 'money';

  const moneySteps = [
    { key: "received", label: "Received", icon: IndianRupee },
    { key: "processing", label: "Processing", icon: ClipboardList },
    { key: "assigned", label: "Assigned to Branch", icon: PackageCheck },
    { key: "utilized", label: "Utilized", icon: HeartHandshake }
  ];

  const itemSteps = [
    { key: "submitted", label: "Submitted", icon: ClipboardList },
    { key: "reviewed", label: "Reviewed by NGO", icon: Check },
    { key: "pickup", label: "Pickup / Drop-off", icon: Truck },
    { key: "received", label: "Received at Branch", icon: PackageCheck },
    { key: "distributed", label: "Distributed", icon: HeartHandshake }
  ];

  const steps = isMoney ? moneySteps : itemSteps;

  // Let's mock the current active step index based on the string status
  const getActiveIndex = () => {
    const s = status?.toLowerCase() || "";
    if (isMoney) {
      if (s.includes("utiliz")) return 3;
      if (s.includes("assign")) return 2;
      if (s.includes("process")) return 1;
      return 0; // received
    } else {
      if (s.includes("distribut")) return 4;
      if (s.includes("receiv")) return 3;
      if (s.includes("pickup") || s.includes("drop")) return 2;
      if (s.includes("review")) return 1;
      return 0; // submitted
    }
  };

  const activeIndex = getActiveIndex();

  return (
    <div className="w-full py-8">
      <div className="flex justify-between relative max-w-4xl mx-auto px-4">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0" />
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-[#1f6f5d] -translate-y-1/2 z-0" 
          initial={{ width: "0%" }}
          animate={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {steps.map((step, index) => {
          const isActive = index <= activeIndex;
          const isCurrent = index === activeIndex;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-md transition-colors duration-500
                  ${isActive ? 'bg-[#1f6f5d] text-white' : 'bg-slate-100 text-slate-400'}
                  ${isCurrent ? 'ring-4 ring-emerald-100' : ''}`}
              >
                {isActive && !isCurrent ? <Check size={20} /> : <step.icon size={20} />}
              </motion.div>
              <div className={`text-xs font-bold text-center max-w-[80px] ${isActive ? 'text-[#1f6f5d]' : 'text-slate-400'}`}>
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 text-center bg-emerald-50 rounded-xl p-4 border border-emerald-100 max-w-xl mx-auto">
        <p className="text-emerald-800 font-medium text-sm">
          {activeIndex === 0 && "Your donation has been recorded securely."}
          {activeIndex > 0 && activeIndex < steps.length - 1 && "Your donation is currently being processed by our team."}
          {activeIndex === steps.length - 1 && "Your contribution has reached the beneficiaries. Thank you!"}
        </p>
      </div>
    </div>
  );
};

export default TransparencyTracker;
