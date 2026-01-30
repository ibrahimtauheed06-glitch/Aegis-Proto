import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Shield, Activity, Share2 } from "lucide-react";
import aegisLogo from "figma:asset/a846679f83e3e1d9be2c1025dccef005694afc5d.png";

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    id: 1,
    title: "Welcome to Aegis",
    desc: "Your personal, AI-powered health locker. Secure, smart, and always with you.",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1636215096587-21982fbf5843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1lZGljYWwlMjBzY2llbmNlJTIwYmx1ZSUyMGxpZ2h0JTIwY2xlYW4lMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2OTgwMjYyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    title: "Scan Reports with AI",
    desc: "Instantly digitize your lab reports. Our AI extracts values and spots trends for you.",
    icon: Activity,
    image: "https://images.unsplash.com/photo-1760307837671-63ee641f9f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMG1vZGVybiUyMG1lZGljYWwlMjBsYWJvcmF0b3J5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY5ODAyNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    title: "Share Securely",
    desc: "Generate temporary QR codes for doctors or emergency responders in seconds.",
    icon: Share2,
    image: "https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjBtZWRpY2FsJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2OTgwMjYyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col"
          >
            {/* Image Section */}
            <div className="h-[55%] relative">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10" />
               <img 
                 src={slides[currentSlide].image} 
                 alt="Onboarding" 
                 className="w-full h-full object-cover"
               />
            </div>
            
            {/* Content Section */}
            <div className="px-8 pt-8 flex-1 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
                {React.createElement(slides[currentSlide].icon, { size: 32 })}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{slides[currentSlide].title}</h2>
              <p className="text-slate-500 leading-relaxed">{slides[currentSlide].desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="p-8 pt-0">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, idx) => (
            <div 
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-8 bg-blue-600" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          <ChevronRight size={20} />
        </button>
        
        {currentSlide < slides.length - 1 && (
           <button onClick={onComplete} className="w-full py-4 text-slate-400 text-sm font-medium mt-2">
             Skip
           </button>
        )}
      </div>
    </div>
  );
}