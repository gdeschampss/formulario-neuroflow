import React from 'react';
import { BackgroundLines } from './components/ui/animated-svg-background';
import NeuroFlowFormCard from './components/NeuroFlowFormCard';
import FloatingBadges from './components/FloatingBadges';
import './index.css';

function App() {
  return (
    <BackgroundLines>
      <div className="app-center-wrapper">
        <FloatingBadges />
        <NeuroFlowFormCard />
      </div>
    </BackgroundLines>
  );
}

export default App;
