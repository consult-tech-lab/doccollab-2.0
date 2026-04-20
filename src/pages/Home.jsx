import React from 'react';
import Hero from '@/components/home/Hero';
import CoreFeatures from '@/components/home/CoreFeatures';
import AIPreview from '@/components/home/AIPreview';
import ModeSwitch from '@/components/home/ModeSwitch';
import ScaleStrip from '@/components/home/ScaleStrip';

export default function Home() {
  return (
    <div>
      <Hero />
      <CoreFeatures />
      <AIPreview />
      <ModeSwitch />
      <ScaleStrip />
    </div>
  );
}