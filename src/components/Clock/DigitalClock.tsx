import React from 'react';
import { TimeData } from '../../types/clock';
import './DigitalClock.css';

interface DigitalClockProps {
  time: TimeData;
  format?: '12h' | '24h';
}

const DigitalClock: React.FC<DigitalClockProps> = ({ time, format = '24h' }) => {
  const formatNumber = (num: number): string => num.toString().padStart(2, '0');

  return (
    <div className="digital-clock">
      <div className="time-display">
        <span className="hours">{formatNumber(time.hours)}</span>
        <span className="separator">:</span>
        <span className="minutes">{formatNumber(time.minutes)}</span>
        <span className="separator">:</span>
        <span className="seconds">{formatNumber(time.seconds)}</span>
        {format === '12h' && <span className="ampm">{time.ampm}</span>}
      </div>
      <div className="timezone">{time.timezone}</div>
    </div>
  );
};

export default React.memo(DigitalClock); 