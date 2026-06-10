/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';
import {
  Sparkle,
  ArrowUpRight,
  Figma,
  Framer,
  Palette,
  PenTool,
  Layers,
  Type,
  Aperture,
  Chrome,
  Camera,
  Brush,
  Box,
  Wand2,
  Copy,
  Check,
  Send,
  X,
  Volume2,
  VolumeX,
  Clock,
  Briefcase,
  Users,
  Award
} from 'lucide-react';

// Define the milestone metrics
interface Metric {
  value: string;
  label: string;
  detail: string;
  colorClass: string;
}

const METRICS_DATA: Metric[] = [
  {
    value: "10M+",
    label: "Raised for startups",
    detail: "Series A & Seed rounds backed by premier VC firms",
    colorClass: "from-amber-200 to-yellow-500"
  },
  {
    value: "45+",
    label: "Custom digital products",
    detail: "High-end visual systems & responsive web systems launched",
    colorClass: "from-blue-200 to-cyan-400"
  },
  {
    value: "12",
    label: "Industry recognitions",
    detail: "Features from curated design galleries and publications",
    colorClass: "from-indigo-200 to-purple-400"
  }
];

// Software mapping
interface SoftwareItem {
  id: string;
  name: string;
}

const ROW_1_SOFTWARE: SoftwareItem[] = [
  { id: 'Figma', name: 'Figma' },
  { id: 'Framer', name: 'Framer' },
  { id: 'Palette', name: 'Color Palette' },
  { id: 'PenTool', name: 'Pen Tool' },
  { id: 'Layers', name: 'Layers' },
  { id: 'Type', name: 'Typography' },
  { id: 'Aperture', name: 'Aperture' },
  { id: 'Chrome', name: 'Chrome dev' }
];

const ROW_2_SOFTWARE: SoftwareItem[] = [
  { id: 'Camera', name: 'Capture' },
  { id: 'Brush', name: 'Illustration' },
  { id: 'Box', name: '3D Modelling' },
  { id: 'Wand2', name: 'AI Generation' },
  { id: 'Figma', name: 'Figma' },
  { id: 'Framer', name: 'Framer' },
  { id: 'Type', name: 'Typography' },
  { id: 'Layers', name: 'Layers' }
];

export default function App() {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMetricTab, setActiveMetricTab] = useState(0);
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({ show: false, msg: '' });

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Visual Branding',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Video playback reference & optional controls
  const [isMuted, setIsMuted] = useState(true);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);

  // Auto Dismiss Toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, msg: '' });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToast({
      show: true,
      msg: `Copied ${label} to clipboard.`
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setToast({ show: true, msg: "Please fill out required fields." });
      return;
    }
    // Simulate API request
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setToast({ show: true, msg: "Success! Proposal sent." });
      // Reset form after a delay
      setTimeout(() => {
        setFormData({ name: '', email: '', projectType: 'Visual Branding', details: '' });
        setIsSubmitted(false);
        setIsModalOpen(false);
      }, 2000);
    }, 1500);
  };

  const getSoftwareIcon = (id: string) => {
    const props = { className: "h-5 w-5 sm:h-6 sm:w-6 text-white/95 transition-all duration-300", strokeWidth: 1.5 };
    switch (id) {
      case 'Figma': return <Figma {...props} />;
      case 'Framer': return <Framer {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'PenTool': return <PenTool {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Type': return <Type {...props} />;
      case 'Aperture': return <Aperture {...props} />;
      case 'Chrome': return <Chrome {...props} />;
      case 'Camera': return <Camera {...props} />;
      case 'Brush': return <Brush {...props} />;
      case 'Box': return <Box {...props} />;
      case 'Wand2': return <Wand2 {...props} />;
      default: return <Wand2 {...props} />;
    }
  };

  // Synchronize playing if needed
  useEffect(() => {
    const playVideos = () => {
      [videoRef1, videoRef2, videoRef3].forEach(ref => {
        if (ref.current) {
          ref.current.muted = true;
          ref.current.play().catch(() => {});
        }
      });
    };
    playVideos();
    // Add event listener to retry on interact for browser autoplay safety
    window.addEventListener('click', playVideos, { once: true });
    return () => window.removeEventListener('click', playVideos);
  }, []);

  return (
    <div id="max-reed-root" className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-between px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8 md:py-10 selection:bg-white/20 selection:text-white relative font-sans overflow-x-hidden">
      
      {/* Background radial soft light gradient for ambient depth */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#324444]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Row */}
      <header id="portfolio-header" className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 md:gap-8 pb-8 md:pb-10 border-b border-white/[0.04]">
        <div className="max-w-3xl flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
            Independent Digital Studio
          </div>
          <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.12] lg:leading-[1.15] font-normal tracking-tight text-white/95">
            Hi, I'm <span className="text-white relative inline-block font-medium">Max Reed<span className="absolute bottom-1.5 left-0 w-full h-[1px] bg-white/30"></span></span>!
          </h1>
          <p className="text-sm md:text-[15px] leading-[1.65] text-white/60 font-light mt-0.5">
            A London-based independent creator shaping sharp visual systems, web-ready products, and story-first campaigns. With a decade of craft behind me, I help ideas move with focus and intention.
          </p>
        </div>

        {/* Let's Team Up button */}
        <div className="flex items-start justify-start xl:items-center xl:justify-end shrink-0 pt-1">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="liquid-glass text-white/95 font-medium text-xs sm:text-[13px] tracking-wide rounded-full px-5 sm:px-7 py-2.5 sm:py-3.5 transition-all text-center flex items-center gap-2 hover:bg-white/5 cursor-pointer"
            id="btn-team-up"
          >
            Let's Team Up Today
            <ArrowUpRight className="h-4 w-4 text-white/80" strokeWidth={1.5} />
          </motion.button>
        </div>
      </header>

      {/* Features Grid */}
      <main id="features-grid-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 flex-1 mt-6 md:mt-8 min-h-0">
        
        {/* Column 1 - Background Card */}
        <div 
          id="card-background" 
          className="rounded-2xl bg-black relative overflow-hidden flex flex-col justify-between p-5 md:p-6 border border-white/5 h-[360px] md:h-auto min-h-[340px] group transition-all duration-500 hover:border-white/10"
        >
          {/* Loop Animation Background video */}
          <video
            ref={videoRef1}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out pointer-events-none"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4"
          />

          {/* Card Top Header */}
          <div className="relative z-10 flex items-center justify-center gap-1.5 w-full">
            <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
            <span className="uppercase tracking-[0.22em] text-[11px] text-white/70 font-semibold font-mono">
              BACKGROUND
            </span>
            <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            <div className="text-white/40 text-[10px] font-mono tracking-widest uppercase">
              // CAREER MILESTONES
            </div>
            
            {/* 4-col timeline grid  */}
            <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-x-2 sm:gap-x-3.5 gap-y-3.5 text-[13px] md:text-sm text-white/95">
              
              {/* Row 1 */}
              <div className="contents group/row text-white/90">
                <span className="font-mono text-white/40 text-[11px] sm:text-xs">2023–Now</span>
                <Sparkle className="h-3 w-3 text-white/60 shrink-0 self-center" strokeWidth={1.5} />
                <span className="font-medium tracking-tight truncate pl-1">Freelance Creative</span>
                <span className="text-right text-white/50 text-[11px] sm:text-xs font-mono">Solo Studio</span>
              </div>

              {/* Solid separator horizontal rules */}
              <div className="col-span-4 h-[1px] bg-white/[0.04]"></div>

              {/* Row 2 */}
              <div className="contents group/row text-white/90">
                <span className="font-mono text-white/40 text-[11px] sm:text-xs">2020–2023</span>
                <Sparkle className="h-3 w-3 text-white/60 shrink-0 self-center" strokeWidth={1.5} />
                <span className="font-medium tracking-tight truncate pl-1">Head of Brand Design</span>
                <span className="text-right text-white/50 text-[11px] sm:text-xs font-mono">Rove Studio</span>
              </div>

              {/* Solid separator */}
              <div className="col-span-4 h-[1px] bg-white/[0.04]"></div>

              {/* Row 3 */}
              <div className="contents group/row text-white/90">
                <span className="font-mono text-white/40 text-[11px] sm:text-xs">2017–2020</span>
                <Sparkle className="h-3 w-3 text-white/60 shrink-0 self-center" strokeWidth={1.5} />
                <span className="font-medium tracking-tight truncate pl-1">Visual Stylist</span>
                <span className="text-right text-white/50 text-[11px] sm:text-xs font-mono">Ember Works</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2 - Stacked rows (Client Voice & 10M+ Raised) */}
        <div id="col-2-stacked" className="flex flex-col gap-4 md:gap-5 h-full">
          
          {/* Top Client Voice */}
          <div 
            id="card-client-voice" 
            className="rounded-2xl bg-[#324444]/40 p-5 md:p-6 noise-overlay relative overflow-hidden border border-white/5 flex flex-col justify-between gap-4 flex-1 transition-all duration-500 hover:border-white/10"
          >
            {/* Dynamic Ambient ShaderGradient Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-80 overflow-hidden rounded-2xl">
              <ShaderGradientCanvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <ShaderGradient
                  {...({
                    animate: "on",
                    axesHelper: "off",
                    brightness: 1.2,
                    cAzimuthAngle: 180,
                    cDistance: 3.6,
                    cPolarAngle: 90,
                    cameraZoom: 1,
                    color1: "#226ab2",
                    color2: "#76b9db",
                    color3: "#a9d7e1",
                    destination: "onCanvas",
                    embedMode: "off",
                    envPreset: "city",
                    format: "gif",
                    fov: 45,
                    frameRate: 10,
                    gizmoHelper: "hide",
                    grain: "on",
                    lightType: "3d",
                    pixelDensity: 1,
                    positionX: -1.4,
                    positionY: 0,
                    positionZ: 0,
                    range: "disabled",
                    rangeEnd: 40,
                    rangeStart: 0,
                    reflection: 0.1,
                    rotationX: 0,
                    rotationY: 10,
                    rotationZ: 50,
                    shader: "defaults",
                    type: "plane",
                    uAmplitude: 1,
                    uDensity: 1.3,
                    uFrequency: 5.5,
                    uSpeed: 0.4,
                    uStrength: 4,
                    uTime: 0,
                    wireframe: false
                  } as any)}
                />
              </ShaderGradientCanvas>
              {/* 50% dark overlay */}
              <div className="absolute inset-0 bg-black/50 z-10" />
            </div>

            <div className="relative z-10 flex items-center justify-start gap-1.5">
              <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
              <span className="uppercase tracking-[0.22em] text-[11px] text-white/70 font-semibold font-mono">
                CLIENT VOICE
              </span>
              <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
            </div>

            <div className="relative z-10 my-1">
              <p className="text-[13px] sm:text-[13.5px] leading-[1.65] text-white/90 font-light italic tracking-wide">
                "Max reshaped our image with a degree of finesse and vision that surpassed what we'd hoped for. The process felt graceful, and the outcomes speak for themselves."
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-3 pt-2 border-t border-white/[0.04]">
              {/* Abstract avatar badge */}
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center font-mono text-[11px] text-teal-100 tracking-wider">
                EB
              </div>
              <div className="text-[12px]">
                <strong className="font-semibold text-white/95">Elena Brooks</strong>
                <span className="text-white/40 block text-[11px] font-light mt-0.5 font-mono">Creative Director — Halcyon</span>
              </div>
            </div>
          </div>

          {/* Bottom 10M+ Raised with loop background video */}
          <div 
            id="card-10m-raised" 
            className="rounded-2xl bg-black relative overflow-hidden flex flex-col justify-between p-5 md:p-6 border border-white/5 h-[230px] md:h-1/2 min-h-[200px] group transition-all duration-500 hover:border-white/10"
          >
            {/* Background Loop Video */}
            <video
              ref={videoRef2}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 pointer-events-none"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4"
            />

            <div className="relative z-10 flex justify-between items-center w-full">
              <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                // PARTNER IMPACT
              </span>
              
              {/* Optional interactive Metric switching pill */}
              <div className="flex gap-1 bg-white/[0.04] p-1 rounded-full border border-white/5">
                {METRICS_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMetricTab(idx);
                    }}
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${activeMetricTab === idx ? 'bg-white w-4' : 'bg-white/20'}`}
                    title="Switch metric"
                  ></button>
                ))}
              </div>
            </div>

            {/* Giant centered display number */}
            <div className="relative z-10 flex flex-col items-center justify-center py-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMetricTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[88px] font-extralight tracking-tight text-white drop-shadow-md select-none font-sans block">
                    {METRICS_DATA[activeMetricTab].value}
                  </span>
                  
                  {/* Bottom caption */}
                  <span className="text-[13px] sm:text-[14px] text-white/85 tracking-wide block mt-1">
                    {METRICS_DATA[activeMetricTab].label}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/40 block max-w-xs mt-1 font-light italic">
                    {METRICS_DATA[activeMetricTab].detail}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Micro-hint to switch tags on click */}
            <div className="relative z-10 w-full text-center">
              <button 
                onClick={() => setActiveMetricTab((prev) => (prev + 1) % METRICS_DATA.length)}
                className="text-[9px] font-mono text-white/40 hover:text-white/70 tracking-wider uppercase transition-colors"
              >
                Click to Rotate Stats →
              </button>
            </div>
          </div>
        </div>

        {/* Column 3 - Stacked rows (Daily Software & Reach Me) */}
        <div id="col-3-stacked" className="flex flex-col gap-4 md:gap-5 h-full">
          
          {/* Top Daily Software card */}
          <div 
            id="card-daily-software" 
            className="rounded-2xl bg-black relative overflow-hidden flex flex-col justify-between p-5 md:p-6 border border-white/5 h-[340px] md:h-2/3 min-h-[300px] group transition-all duration-500 hover:border-white/10"
          >
            {/* Background Loop Video */}
            <video
              ref={videoRef3}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000 ease-out pointer-events-none"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4"
            />

            {/* Label spacing */}
            <div className="relative z-10 flex items-center justify-center gap-1.5 w-full">
              <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
              <span className="uppercase tracking-[0.22em] text-[11px] text-white/70 font-semibold font-mono">
                DAILY SOFTWARE
              </span>
              <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
            </div>

            {/* Interactive description */}
            <div className="relative z-10 text-center text-[12px] text-white/50 px-2 my-2 font-light">
              Crafting in the intersections of visual precision, layout code, and high-fidelity motion graphics.
            </div>

            {/* Marquee Rows Containment with edges masked */}
            <div className="relative z-10 flex flex-col gap-3.5 my-3 py-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              
              {/* Row 1 - Infinite Scroll Left */}
              <div className="flex w-max relative">
                <div className="flex gap-3.5 animate-marquee-left pr-3.5">
                  {ROW_1_SOFTWARE.map((item, idx) => (
                    <div
                      key={`r1-${item.id}-${idx}`}
                      className="icon-box h-16 w-16 rounded-xl shrink-0 flex flex-col items-center justify-center relative group/item border border-white/5 cursor-pointer"
                      title={item.name}
                    >
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10 rounded-t-xl" />
                      {getSoftwareIcon(item.id)}
                      <span className="absolute bottom-1.5 text-[8px] font-mono text-white/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                        {item.id}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Duplicated for smooth loop */}
                <div className="flex gap-3.5 animate-marquee-left" aria-hidden="true">
                  {ROW_1_SOFTWARE.map((item, idx) => (
                    <div
                      key={`r1-dup-${item.id}-${idx}`}
                      className="icon-box h-16 w-16 rounded-xl shrink-0 flex flex-col items-center justify-center relative group/item border border-white/5 cursor-pointer"
                    >
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10 rounded-t-xl" />
                      {getSoftwareIcon(item.id)}
                      <span className="absolute bottom-1.5 text-[8px] font-mono text-white/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                        {item.id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 - Infinite Scroll Right */}
              <div className="flex w-max relative">
                <div className="flex gap-3.5 animate-marquee-right pr-3.5">
                  {ROW_2_SOFTWARE.map((item, idx) => (
                    <div
                      key={`r2-${item.id}-${idx}`}
                      className="icon-box h-16 w-16 rounded-xl shrink-0 flex flex-col items-center justify-center relative group/item border border-white/5 cursor-pointer"
                      title={item.name}
                    >
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10 rounded-t-xl" />
                      {getSoftwareIcon(item.id)}
                      <span className="absolute bottom-1.5 text-[8px] font-mono text-white/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                        {item.id}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Duplicated for smooth loop */}
                <div className="flex gap-3.5 animate-marquee-right" aria-hidden="true">
                  {ROW_2_SOFTWARE.map((item, idx) => (
                    <div
                      key={`r2-dup-${item.id}-${idx}`}
                      className="icon-box h-16 w-16 rounded-xl shrink-0 flex flex-col items-center justify-center relative group/item border border-white/5 cursor-pointer"
                    >
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10 rounded-t-xl" />
                      {getSoftwareIcon(item.id)}
                      <span className="absolute bottom-1.5 text-[8px] font-mono text-white/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                        {item.id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Scroll indicators */}
            <div className="relative z-10 w-full flex items-center justify-between text-[9px] font-mono text-white/30 px-2 mt-1">
              <span>← LEFT SCROLL</span>
              <span>RIGHT SCROLL →</span>
            </div>
          </div>

          {/* Bottom Reach Me card */}
          <div 
            id="card-reach-me" 
            className="rounded-2xl bg-[#324444]/40 p-5 md:p-6 noise-overlay relative overflow-hidden border border-white/5 flex flex-col justify-between gap-5 flex-1 transition-all duration-500 hover:border-white/10"
          >
            {/* Dynamic Ambient ShaderGradient Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-80 overflow-hidden rounded-2xl">
              <ShaderGradientCanvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <ShaderGradient
                  {...({
                    animate: "on",
                    axesHelper: "off",
                    brightness: 1.2,
                    cAzimuthAngle: 180,
                    cDistance: 3.6,
                    cPolarAngle: 90,
                    cameraZoom: 1,
                    color1: "#226ab2",
                    color2: "#76b9db",
                    color3: "#a9d7e1",
                    destination: "onCanvas",
                    embedMode: "off",
                    envPreset: "city",
                    format: "gif",
                    fov: 45,
                    frameRate: 10,
                    gizmoHelper: "hide",
                    grain: "on",
                    lightType: "3d",
                    pixelDensity: 1,
                    positionX: -1.4,
                    positionY: 0,
                    positionZ: 0,
                    range: "disabled",
                    rangeEnd: 40,
                    rangeStart: 0,
                    reflection: 0.1,
                    rotationX: 0,
                    rotationY: 10,
                    rotationZ: 50,
                    shader: "defaults",
                    type: "plane",
                    uAmplitude: 1,
                    uDensity: 1.3,
                    uFrequency: 5.5,
                    uSpeed: 0.4,
                    uStrength: 4,
                    uTime: 0,
                    wireframe: false
                  } as any)}
                />
              </ShaderGradientCanvas>
              {/* 50% dark overlay */}
              <div className="absolute inset-0 bg-black/50 z-10" />
            </div>

            {/* Top row with section label & top-right Arrow Button */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkle className="h-3 w-3 text-white/70" strokeWidth={1.5} />
                <span className="uppercase tracking-[0.22em] text-[11px] text-white/70 font-semibold font-mono">
                  REACH ME
                </span>
              </div>

              {/* Arrow Up Right trigger buttons */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(true)}
                className="h-10 w-10 text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm cursor-pointer"
                title="Send interactive proposal"
              >
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </motion.button>
            </div>

            {/* Interactive Contact Details */}
            <div className="relative z-10 flex flex-col gap-3 py-1">
              
              {/* Dynamic Email Button */}
              <div 
                className="group/item flex items-center justify-between bg-black/20 hover:bg-black/40 border border-white/5 rounded-xl p-3 cursor-pointer transition-all duration-300"
                onClick={() => copyToClipboard("hi@maxreed.com", "Email address")}
              >
                <div>
                  <span className="text-[9px] font-mono text-white/40 block uppercase tracking-wider">EMAIL ME</span>
                  <span className="text-white/95 text-[14px] sm:text-[15px] font-medium tracking-tight">hi@maxreed.com</span>
                </div>
                <Copy className="h-3.5 w-3.5 text-white/30 group-hover/item:text-white/80 transition-colors" strokeWidth={1.5} />
              </div>

              {/* Dynamic Phone Button */}
              <div 
                className="group/item flex items-center justify-between bg-black/20 hover:bg-black/40 border border-white/5 rounded-xl p-3 cursor-pointer transition-all duration-300"
                onClick={() => copyToClipboard("+44 207 81 63", "Phone number")}
              >
                <div>
                  <span className="text-[9px] font-mono text-white/40 block uppercase tracking-wider">CALL DIRECT</span>
                  <span className="text-white/95 text-[14px] sm:text-[15px] font-mono font-medium tracking-tight">+44 207 81 63</span>
                </div>
                <Copy className="h-3.5 w-3.5 text-white/30 group-hover/item:text-white/80 transition-colors" strokeWidth={1.5} />
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* Footer System Credits (Literal, human & ultra clean) */}
      <footer id="portfolio-footer" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-white/[0.04] text-[11px] font-mono text-white/40">
        <div className="flex items-center gap-3">
          <span>© 1996–{new Date().getFullYear()} Max Reed Ltd</span>
          <span>·</span>
          <span>Made in London</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
            ESTABLISHED DECADE
          </span>
          <span className="text-white/20 select-none">|</span>
          <button 
            onClick={() => setToast({ show: true, msg: "Max's studio serves global projects seamlessly." })}
            className="hover:text-white transition-colors"
          >
            AVAILABILITY: Q3 ACTIVE
          </button>
        </div>
      </footer>

      {/* Dynamic Glassmorphic Contact modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.45 }}
              className="liquid-glass border border-white/10 rounded-2xl p-6 sm:p-8 max-w-lg w-full relative z-10 noise-overlay flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
            >
              {/* Header row */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Sparkle className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-lg font-medium tracking-tight text-white">Let's Team Up</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/5 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 text-sm font-sans">
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    Have a vision for your brand design, platform launch, or custom code system? Share the basic details below and Max will get back to you within 24 hours.
                  </p>

                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Brooks Henderson"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="bg-black/40 border border-white/15 focus:border-white/40 rounded-lg px-3.5 py-2.5 text-[13px] text-white/90 outline-none transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. brooks@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="bg-black/40 border border-white/15 focus:border-white/40 rounded-lg px-3.5 py-2.5 text-[13px] text-white/90 outline-none transition-colors"
                    />
                  </div>

                  {/* Project selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Project Category</label>
                    <select
                      value={formData.projectType}
                      onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                      className="bg-[#121c1c] border border-white/15 focus:border-white/40 rounded-lg px-3.5 py-2.5 text-[13px] text-white/90 outline-none transition-colors option:bg-black"
                    >
                      <option value="Visual Branding">Visual Branding & Systems</option>
                      <option value="Full-Stack Engineering">Interactive Web Products</option>
                      <option value="Campaign Collaboration">Story-first Marketing Campaigns</option>
                      <option value="Advisory / Consultation">Direct 1-on-1 Consultation</option>
                    </select>
                  </div>

                  {/* Details field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Project Details & Ambitions</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Shaping a beautiful boutique platform for independent artists. We seek to raise funds in Q4..."
                      value={formData.details}
                      onChange={e => setFormData({ ...formData, details: e.target.value })}
                      className="bg-black/40 border border-white/15 focus:border-white/40 rounded-lg px-3.5 py-2.5 text-[13px] text-white/90 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-white text-black font-semibold text-xs sm:text-[13px] tracking-wider uppercase rounded-lg py-3 transition-colors hover:bg-white/95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                        Submitting Proposal...
                      </>
                    ) : (
                      <>
                        Send Inquiry
                        <Send className="h-3.5 w-3.5 ml-1" />
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-14 w-14 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center"
                  >
                    <Check className="h-7 w-7" strokeWidth={2.5} />
                  </motion.div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-base font-semibold text-white">Proposal Received!</h4>
                    <p className="text-xs text-white/60 max-w-sm mt-1">
                      Thank you for submitting, {formData.name}. Max will review your details alongside Halcyon objectives and follow up very shortly.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-white text-black text-xs font-medium tracking-wide flex items-center gap-2 shadow-2xl"
          >
            <Sparkle className="h-3.5 w-3.5 text-black animate-spin" style={{ animationDuration: '4s' }} />
            <span>{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
