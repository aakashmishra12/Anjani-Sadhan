import React from 'react';
import { JourneyStep } from './types';
import { Navigation, Footprints, Train, MapPin } from 'lucide-react';

export const getIcon = (type: string, className?: string) => {
  const props = { className };
  switch (type) {
    case 'start': return <Navigation {...props} />;
    case 'walk': return <Footprints {...props} />;
    case 'ride': return <Train {...props} />;
    case 'destination': return <MapPin {...props} />;
    default: return <Navigation {...props} />;
  }
};

// Advanced Helper to simulate Metro frequency based on Mumbai Metro Line 1 Peak Hours
export const getUpcomingMetroTrains = (): number[] => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  // Metro Operational Hours: 05:30 to 23:30
  const currentTimeMins = hours * 60 + minutes;
  const startMins = 5 * 60 + 30;
  const endMins = 23 * 60 + 30;

  if (currentTimeMins < startMins || currentTimeMins > endMins) {
    return []; // Service Closed
  }

  // Determine Frequency
  let frequency = 8; // Default Non-Peak
  
  const isMorningPeak = (hours >= 8 && hours < 11) || (hours === 11 && minutes <= 30);
  const isEveningPeak = (hours >= 17 && hours < 20) || (hours === 20 && minutes <= 30);

  if (isMorningPeak || isEveningPeak) {
    frequency = 4;
  }

  // Calculate delay to next train
  const remainder = minutes % frequency;
  const nextTrainIn = frequency - remainder;

  return [nextTrainIn, nextTrainIn + frequency, nextTrainIn + frequency * 2];
};

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 0,
    type: 'start',
    title: 'Andheri Railway Stn',
    shortTitle: 'Railway',
    description: 'Start at Platform 1',
    durationMinutes: 0,
    location: {
      lat: 19.119677, 
      lng: 72.846649, 
      radius: 300 // Covers the railway station area
    },
    meta: {
      primaryValue: '3 min',
      primaryLabel: 'Next Train',
      secondaryValue: 'Crowded',
      secondaryLabel: 'Status'
    },
    contextEssential: {
      label: 'Exit',
      value: 'Skywalk',
      icon: 'platform'
    },
    iconType: 'start',
    proTip: 'Use the North Foot Over Bridge for a faster exit to the Metro.',
    essentials: ['Ladies Washroom', 'RPF Police Post', 'Sanitary Pads Machine', 'RailWire Free WiFi'],
    catMood: 'waiting'
  },
  {
    id: 1,
    type: 'walk',
    title: 'Walk to Metro Stn',
    shortTitle: 'Skywalk',
    description: 'Connect via Skywalk',
    durationMinutes: 6,
    location: {
      lat: 19.120800, 
      lng: 72.848800, 
      radius: 400 // Covers the path and metro station entrance
    },
    meta: {
      primaryValue: '450',
      primaryLabel: 'Steps',
      secondaryValue: '6 min',
      secondaryLabel: 'Walk'
    },
    contextEssential: {
      label: 'Weather',
      value: '30°C',
      icon: 'weather'
    },
    iconType: 'walk',
    proTip: 'Keep left on the skywalk to avoid the rush.',
    essentials: ['ATM', 'Pharmacy', 'Cold Water Dispenser', 'Security Guard'],
    catMood: 'walking',
    navigationLink: 'https://www.google.com/maps/dir/?api=1&destination=Andheri+Metro+Station&travelmode=walking'
  },
  {
    id: 2,
    type: 'ride',
    title: 'Metro to Chakala',
    shortTitle: 'Metro',
    description: 'Get down at JB Nagar',
    durationMinutes: 12,
    location: {
      lat: 19.111400, 
      lng: 72.862400, 
      radius: 1500 // Wide radius to keep this active during the train ride
    },
    meta: {
      primaryValue: '4 min',
      primaryLabel: 'Freq',
      secondaryValue: 'AC On',
      secondaryLabel: 'Comfort'
    },
    contextEssential: {
      label: 'Coach',
      value: 'First',
      icon: 'ticket'
    },
    iconType: 'ride',
    proTip: 'The first coach is reserved for ladies. Board from the front.',
    essentials: ['Women Only Coach', 'Mobile Charging', 'Emergency Intercom', 'Station Master'],
    catMood: 'waiting'
  },
  {
    id: 3,
    type: 'destination',
    title: 'Walk to MIDC',
    shortTitle: 'MIDC',
    description: 'Final stretch to Office',
    durationMinutes: 8,
    location: {
      lat: 19.115400, 
      lng: 72.867800, 
      radius: 600 // Covers the MIDC area near Akruti
    },
    meta: {
      primaryValue: '950',
      primaryLabel: 'Steps',
      secondaryValue: '10:45',
      secondaryLabel: 'ETA'
    },
    contextEssential: {
      label: 'Gate',
      value: 'Entry',
      icon: 'gate'
    },
    iconType: 'destination',
    proTip: 'Grab a quick chai at the tapri near the junction!',
    essentials: ['Cafe', 'Shared Auto Stand', 'Medical Store', 'Police Patrol'],
    catMood: 'happy',
    navigationLink: 'https://www.google.com/maps/dir/?api=1&destination=Akruti+Plaza,+MIDC,+Andheri+East&travelmode=walking'
  },
];