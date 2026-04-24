import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, Building, ShieldCheck, X, Loader2, CheckCircle2 } from 'lucide-react';

const RazorpaySim = ({ amount, isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState('select-method'); // select-method, processing, success
  const [selectedMethod, setSelectedMethod] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setStep('select-method');
      setSelectedMethod(null);
    }
  }, [isOpen]);

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess({ transactionId: `PAY${Math.random().toString().substring(2, 10)}` });
      }, 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative"
        >
          {/* Header section */}
          <div className="bg-[#1f6f5d] px-6 py-4 text-white flex justify-between items-center relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1f6f5d] font-black text-xs">
                SN
              </div>
              <div>
                <h3 className="font-bold leading-tight">Savali Nivara NGO</h3>
                <p className="text-xs opacity-80 flex items-center gap-1">
                  <ShieldCheck size={12} /> Test Mode Payment
                </p>
              </div>
            </div>
            {step === 'select-method' && (
              <button onClick={onClose} className="opacity-70 hover:opacity-100 transition-opacity">
                <X size={20} />
              </button>
            )}
          </div>

          <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">Amount to pay</p>
            <p className="text-3xl font-black text-slate-800">₹{parseFloat(amount).toLocaleString('en-IN')}</p>
          </div>

          <div className="p-6">
            {step === 'select-method' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <p className="font-bold text-slate-700 mb-4">Select Payment Method</p>
                <div className="space-y-3">
                  {[
                    { id: 'upi', name: 'UPI', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm' },
                    { id: 'card', name: 'Card', icon: CreditCard, desc: 'Visa, MasterCard, RuPay' },
                    { id: 'netbanking', name: 'Net Banking', icon: Building, desc: 'All leading banks supported' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        selectedMethod === method.id
                          ? 'border-[#1f6f5d] bg-emerald-50'
                          : 'border-slate-100 bg-white hover:border-emerald-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${selectedMethod === method.id ? 'bg-[#1f6f5d] text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <method.icon size={20} />
                      </div>
                      <div className="text-left flex-1">
                        <p className={`font-bold ${selectedMethod === method.id ? 'text-[#1f6f5d]' : 'text-slate-700'}`}>{method.name}</p>
                        <p className="text-xs text-slate-500">{method.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                
                <button
                  disabled={!selectedMethod}
                  onClick={handlePay}
                  className="w-full mt-6 bg-[#1f6f5d] text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#165042] transition-colors shadow-lg"
                >
                  Pay Now
                </button>
              </motion.div>
            )}

            {step === 'processing' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 flex flex-col items-center text-center">
                <Loader2 size={48} className="animate-spin text-[#1f6f5d] mb-6" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Processing Payment...</h3>
                <p className="text-slate-500">Please do not close this window</p>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 flex flex-col items-center text-center">
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                  className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Payment Successful!</h3>
                <p className="text-slate-500">Redirecting back...</p>
              </motion.div>
            )}
          </div>
          
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-center flex items-center justify-center gap-2 text-slate-400 text-xs">
            <ShieldCheck size={14} /> Secured by Mock Razorpay
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RazorpaySim;
