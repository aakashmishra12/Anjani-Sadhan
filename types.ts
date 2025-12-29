export type StepType = 'start' | 'walk' | 'ride' | 'destination';

export interface JourneyStep {
  id: number;
  type: StepType;
  title: string;
  shortTitle: string;
  description: string;
  durationMinutes: number;
  location: {
    lat: number;
    lng: number;
    radius: number; // in meters
  };
  meta: {
    primaryValue: string;
    primaryLabel: string;
    secondaryValue?: string;
    secondaryLabel?: string;
  };
  contextEssential: {
    label: string;
    value: string;
    icon: 'ticket' | 'weather' | 'gate' | 'platform';
  };
  iconType: string;
  proTip: string;
  essentials: string[];
  catMood: 'sleeping' | 'walking' | 'waiting' | 'happy';
  navigationLink?: string;
}

export interface JourneyState {
  currentStepIndex: number;
  isSharingLocation: boolean;
}