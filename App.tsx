import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FocusCard } from './components/FocusCard';
import { Timeline } from './components/Timeline';
import { BentoGrid } from './components/BentoGrid';
import { LocationModal } from './components/LocationModal';
import { StartScreen } from './components/StartScreen';
import { AnjaniLogo } from './components/AnjaniLogo';
import { JOURNEY_STEPS } from './constants';
import { MapPinOff } from 'lucide-react';

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3; 
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  const locationWatchId = useRef<number | null>(null);

  const handleManualSelect = (index: number) => {
    setCurrentStepIndex(index);
    if ("vibrate" in navigator) navigator.vibrate(10);
  };

  const startWatching = (highAccuracy = true) => {
    if (!navigator.geolocation) return;

    if (locationWatchId.current) navigator.geolocation.clearWatch(locationWatchId.current);

    locationWatchId.current = navigator.geolocation.watchPosition(
      processPosition,
      (err) => {
        console.warn("Location error:", err);
        if (highAccuracy) {
             console.log("Retrying with low accuracy...");
             startWatching(false);
        } else {
             setLocationError("Signal Lost");
        }
      },
      { 
        enableHighAccuracy: highAccuracy, 
        maximumAge: 5000, 
        timeout: 15000 
      }
    );
  };

  const handleEnableLocation = () => {
    setShowPermissionModal(false);
    if ("geolocation" in navigator) {
      setIsLocationEnabled(true);
      startWatching(true);
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const processPosition = useCallback((position: GeolocationPosition) => {
    const { latitude, longitude, accuracy } = position.coords;
    setUserLocation({ lat: latitude, lng: longitude });
    setLocationAccuracy(accuracy);
    setLocationError(null);
    
    let closestStepIndex = -1;
    let minDistance = Infinity;

    // Determine which step we are inside and closest to
    JOURNEY_STEPS.forEach((step, index) => {
      const dist = calculateDistance(latitude, longitude, step.location.lat, step.location.lng);
      
      // We prioritize steps we are actually inside
      if (dist < step.location.radius) {
        if (dist < minDistance) {
          minDistance = dist;
          closestStepIndex = index;
        }
      }
    });

    if (closestStepIndex !== -1 && closestStepIndex !== currentStepIndex) {
      setCurrentStepIndex(closestStepIndex);
      if ("vibrate" in navigator) navigator.vibrate([50, 50, 50]);
    }
  }, [currentStepIndex]);

  useEffect(() => {
    return () => {
      if (locationWatchId.current) navigator.geolocation.clearWatch(locationWatchId.current);
    };
  }, []);

  // Handle Notifications
  useEffect(() => {
    if (hasStarted && "Notification" in window && Notification.permission === "granted") {
      const step = JOURNEY_STEPS[currentStepIndex];
      const nextStep = JOURNEY_STEPS[currentStepIndex + 1];
      
      const title = `Anjani: ${step.shortTitle}`;
      const body = nextStep 
        ? `${step.description}. Next: ${nextStep.shortTitle}` 
        : step.description;

      try {
        new Notification(title, {
          body: body,
          tag: 'anjani-journey-update',
          // Use a generic emoji/icon logic if no image file available
          icon: '/vite.svg' 
        });
      } catch (e) {
        console.error("Notification failed", e);
      }
    }
  }, [currentStepIndex, hasStarted]);

  const handleStartJourney = () => {
    setHasStarted(true);
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  };

  const currentStep = JOURNEY_STEPS[currentStepIndex];

  if (!hasStarted) {
    return <StartScreen onStart={handleStartJourney} />;
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden max-w-lg mx-auto bg-[#FFF9E3]">
      
      {showPermissionModal && (
        <LocationModal 
          onEnable={handleEnableLocation} 
          onSkip={() => setShowPermissionModal(false)} 
        />
      )}

      <div className="relative z-10 flex flex-col min-h-screen w-full">
        
        {/* Fixed Header */}
        <div className="fixed top-0 max-w-lg w-full z-50 bg-[#FFF9E3]/95 backdrop-blur-xl shadow-sm border-b border-[#F0E6D2] left-1/2 -translate-x-1/2 transition-all duration-300">
            <div className="flex items-center justify-between px-5 py-3">
               <div className="flex items-center gap-3">
                   <div className="bg-white p-1 rounded-full shadow-sm border border-orange-50">
                     <AnjaniLogo className="w-9 h-9" />
                   </div>
                   <div className="flex flex-col justify-center">
                       <h1 className="text-xl font-black text-[#5D4037] tracking-tight leading-none mb-0.5">Anjani</h1>
                       <span className="text-[10px] font-bold text-[#E76F51] uppercase tracking-wider">My Baby, Always with You</span>
                   </div>
               </div>
               
               {isLocationEnabled && (
                   <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white/50 backdrop-blur-sm transition-colors ${locationError ? 'border-red-100 bg-red-50/50' : 'border-green-100'}`}>
                        {locationError ? (
                            <MapPinOff className="w-3 h-3 text-red-400" />
                        ) : (
                            <div className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </div>
                        )}
                        <span className={`text-[10px] font-black tracking-wide ${locationError ? 'text-red-400' : 'text-green-600'}`}>
                            {locationError ? 'LOST' : 'LIVE'}
                        </span>
                   </div>
               )}
            </div>
        </div>
        
        {/* Main Content with top padding for fixed header and bottom padding of 59px */}
        <main className="flex-1 flex flex-col relative pb-[59px] pt-[80px] w-full">
          
          <Timeline 
            steps={JOURNEY_STEPS} 
            currentStepIndex={currentStepIndex} 
            onStepSelect={handleManualSelect} 
          />

          <FocusCard 
            step={currentStep} 
            userLocation={userLocation} 
            isLocationEnabled={isLocationEnabled}
            gpsAccuracy={locationAccuracy}
          />
          
          <BentoGrid step={currentStep} />
        </main>
      </div>
      
    </div>
  );
};

export default App;