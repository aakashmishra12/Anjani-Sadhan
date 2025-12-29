import React, { useState, useEffect } from 'react';
import { JourneyStep } from '../types';
import { CatMascot } from './CatMascot';
import { CheckCircle2, Circle, Clock, MapPin, Train, Navigation, Share2, Signal, Map, Heart, Footprints, ShieldCheck, Sparkles } from 'lucide-react';
import { getUpcomingMetroTrains } from '../constants';

interface FocusCardProps {
  step: JourneyStep;
  userLocation: { lat: number; lng: number } | null;
  isLocationEnabled?: boolean;
  gpsAccuracy?: number | null;
}

const WALKING_QUOTES = [
  "Walking is the best medicine!",
  "Every step makes you stronger!",
  "Glow, don't sweat. You got this!",
  "Own your path, Queen!",
  "Healthy body, happy mind.",
  "Almost there! Keep shining!",
  "Your daily dose of cardio!"
];

const GENERAL_SAFETY_TIPS = [
  "If something feels wrong, trust yourself, pause, and gently step away.",
  "Walk tall, baby, with confidence — you belong everywhere you go.",
  "Keep one ear free — I want you aware and safe."
];

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3; 
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const formatDistance = (meters: number) => {
  const km = meters / 1000;
  if (km < 0.1) return `${Math.round(meters)} m`; 
  return `${km.toFixed(2)} km`;
};

export const FocusCard: React.FC<FocusCardProps> = ({ step, userLocation, isLocationEnabled, gpsAccuracy }) => {
  const [upcomingTrains, setUpcomingTrains] = useState<number[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(WALKING_QUOTES[Math.floor(Math.random() * WALKING_QUOTES.length)]);
  }, [step.id]);

  // Update Metro Timer
  useEffect(() => {
    const updateTrains = () => {
      setUpcomingTrains(getUpcomingMetroTrains());
    };
    updateTrains();
    const timer = setInterval(updateTrains, 30000);
    return () => clearInterval(timer);
  }, []);

  // Calculate Distance
  useEffect(() => {
    if (userLocation) {
      const d = calculateDistance(userLocation.lat, userLocation.lng, step.location.lat, step.location.lng);
      setDistance(d);
    } else {
      setDistance(null);
    }
  }, [userLocation, step]);

  const handleShareLocation = async () => {
    let shareUrl = 'https://anjani-commute.app';
    
    // Construct Google Maps link if user location is available
    if (userLocation) {
        shareUrl = `https://www.google.com/maps/search/?api=1&query=${userLocation.lat},${userLocation.lng}`;
    }

    const text = `I'm currently at ${step.title}. ${distance ? `Approx ${formatDistance(distance)} away.` : ''} Track me here:`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'My Live Location - Anjani',
                text: text,
                url: shareUrl
            });
        } catch (error) {
            console.warn("Share failed or cancelled:", error);
        }
    } else {
        try {
            await navigator.clipboard.writeText(`${text} ${shareUrl}`);
            alert("Location link copied to clipboard!");
        } catch (err) {
            alert(`Shared: ${shareUrl}`);
        }
    }
  };

  const hasArrived = distance && distance < step.location.radius;
  const isWeakSignal = gpsAccuracy && gpsAccuracy > 60;
  
  // Logic to determine which Widget to show
  const isWalkingStep = step.type === 'walk' || step.type === 'destination';
  const isRideStep = step.type === 'ride';
  // Show metro timings for Start (0) and Walk to Metro (1)
  const showMetroTimings = (step.id === 0 || step.id === 1) && upcomingTrains.length > 0;

  // Determine badge text and style
  let badgeText = "ACTIVE STEP";
  let badgeStyle = "bg-[#4DB6AC] text-white"; // Soft Teal

  if (hasArrived) {
    if (step.type === 'destination') {
        badgeText = "You made it.";
        badgeStyle = "bg-[#FFB74D] text-white shadow-md shadow-orange-200 animate-pulse";
    } else {
        badgeText = "ARRIVED";
    }
  }

  return (
    <div className="px-6 mb-4">
      <div className="daynest-card p-6 relative overflow-visible bg-white">
        
        {/* Header Badge */}
        <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-2">
                 <div className={`${badgeStyle} text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 transition-all`}>
                    {hasArrived ? (step.type === 'destination' ? <Sparkles size={14} /> : <CheckCircle2 size={14} />) : <Navigation size={14} />}
                    <span className="uppercase tracking-wider">{badgeText}</span>
                 </div>
                 {isWeakSignal && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-orange-400 bg-orange-50 px-2 py-1 rounded-full border border-orange-100">
                        <Signal size={10} />
                        <span>Weak GPS</span>
                    </div>
                 )}
             </div>
             
             {/* Distance or Loading State */}
             <span className="text-[#FF8A65] font-bold text-sm">
                {distance !== null 
                    ? (hasArrived ? "You are here" : `${formatDistance(distance)} away`)
                    : (isLocationEnabled ? "Locating..." : "")
                }
             </span>
        </div>

        {/* Title & Cat */}
        <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
                {/* Increased Font Size for Place Name */}
                <h2 className="text-4xl font-black text-[#455A64] leading-tight mb-2 tracking-tight">{step.title}</h2>
                <div className="flex items-center gap-2 text-[#90A4AE]">
                   <Clock size={16} />
                   <span className="text-base font-medium">{step.durationMinutes} mins estimated</span>
                </div>
            </div>
            <div className="flex-shrink-0">
                 <CatMascot mood={step.catMood} />
            </div>
        </div>

        {/* --- DYNAMIC WIDGETS SECTION --- */}

        {/* 1. WALKING WIDGET (Steps + Morale) */}
        {isWalkingStep && (
            <div className="mb-6 bg-gradient-to-br from-[#FFF8E1] to-[#FFECB3] rounded-[24px] p-5 border border-[#FFE0B2] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Footprints size={80} className="text-[#FF9800]" />
                </div>
                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2 text-[#EF6C00]">
                            <div className="bg-white p-2 rounded-full shadow-sm">
                                <Footprints size={20} fill="currentColor" />
                            </div>
                            <span className="font-black text-sm uppercase tracking-wide">Walk Mode</span>
                        </div>
                        <div className="text-right">
                            <span className="text-4xl font-black text-[#E65100]">{step.meta.primaryValue}</span>
                            <span className="text-[10px] font-bold text-[#EF6C00] block uppercase tracking-widest">Steps Remaining</span>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center bg-white/80 p-3 rounded-lg backdrop-blur-sm border border-white/50">
                        <Heart className="text-[#FF7043] w-5 h-5 flex-shrink-0 animate-pulse" fill="currentColor" />
                        <p className="text-sm font-bold text-[#5D4037] italic leading-tight">"{quote}"</p>
                    </div>
                </div>
            </div>
        )}

        {/* 2. METRO TIMINGS WIDGET (For Start & Walk to Metro) */}
        {showMetroTimings && (
           <div className="mb-6 bg-[#F9FBE7] rounded-[24px] p-5 border border-[#E6EE9C]">
              <div className="flex justify-between items-center mb-4">
                 <div className="flex items-center gap-3">
                    <div className="bg-[#DCE775] p-2 rounded-lg text-[#558B2F]">
                        <Train size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-[#558B2F] uppercase">Metro</p>
                        <p className="text-xs text-[#9E9D24] font-bold">To Ghatkopar</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className="text-4xl font-black text-[#558B2F]">{upcomingTrains[0]}</span>
                    <span className="text-base text-[#558B2F] font-bold ml-1">min</span>
                 </div>
              </div>
              <div className="flex gap-2">
                 {upcomingTrains.slice(1, 3).map((time, i) => (
                    <div key={i} className="flex-1 bg-white/60 rounded-lg py-2 text-center border border-[#F0F4C3]">
                        <span className="text-sm font-bold text-[#827717]">{time} min</span>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* 3. SAFETY TIPS WIDGET (Reminders) */}
        {isRideStep && (
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 px-1">
                    <ShieldCheck size={18} className="text-[#80CBC4]" />
                    <h3 className="font-extrabold text-sm text-[#546E7A]">Just little things I remind you of.</h3>
                </div>
                <div className="grid gap-3">
                    {GENERAL_SAFETY_TIPS.map((tip, i) => (
                        /* Lighter Pastel Background for Safety Tips */
                        <div key={i} className="flex items-start gap-3 bg-[#E0F7FA] p-4 rounded-[20px] border border-[#B2EBF2] shadow-sm relative overflow-hidden group hover:bg-[#B2EBF2] transition-colors">
                            {/* Decorative background element */}
                            <div className="absolute -right-4 -top-4 w-12 h-12 bg-white rounded-full opacity-40 group-hover:scale-110 transition-transform"></div>
                            
                            <div className="bg-white text-[#0097A7] w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-sm border border-[#B2EBF2]">
                                {i + 1}
                            </div>
                            <p className="text-[#006064] text-sm font-semibold leading-snug relative z-10 mt-0.5">
                                {tip}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- END WIDGETS --- */}

        {/* Info Box */}
        <div className="bg-[#FAFAFA] rounded-xl p-4 border border-gray-100 mb-6">
            <div className="flex gap-3">
                <Circle className="text-[#FFCA28] flex-shrink-0 mt-1" size={16} fill="currentColor" />
                <div>
                     <p className="text-base font-bold text-[#455A64] leading-snug">
                        {step.description}
                     </p>
                     <p className="text-sm text-[#90A4AE] mt-2 italic">
                        "{step.proTip}"
                     </p>
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-3">
            {/* Navigation Button for Walking Steps */}
            {step.navigationLink && (
                <a 
                    href={step.navigationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#FFB74D] text-white py-4 rounded-xl text-sm font-bold shadow-md hover:bg-[#FFA726] active:scale-95 transition-all"
                >
                    <Map size={18} />
                    <span>Open Walking Path</span>
                </a>
            )}

            {/* Share Button */}
            <button 
                onClick={handleShareLocation}
                className="w-full flex items-center justify-center gap-2 bg-[#546E7A] text-white py-4 rounded-xl text-sm font-bold shadow-md hover:bg-[#455A64] active:scale-95 transition-all"
            >
                <Share2 size={18} />
                <span>Share My Location</span>
            </button>
        </div>

      </div>
    </div>
  );
};