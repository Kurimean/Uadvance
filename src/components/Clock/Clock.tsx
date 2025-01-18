import React from 'react';
import { ClockType, ClockSize, ClockTheme } from '../../types/clock';
import { useClock } from '../../hooks/useClock';
import DigitalClock from './DigitalClock';
import AnalogClock from './AnalogClock';
import './Clock.css';

interface ClockProps {
  type: ClockType;
  size?: ClockSize;
  theme?: ClockTheme;
  timezone?: string;
}

const Clock: React.FC<ClockProps> = ({
  type = 'digital',
  size = 'medium',
  theme,
  timezone = 'Asia/Shanghai'
}) => {
  const time = useClock(timezone);

  return (
    <div className={`clock-wrapper ${size}`} style={theme}>
      {type === 'digital' && <DigitalClock time={time} />}
      {type === 'analog' && <AnalogClock time={time} />}
      {type === 'minimal' && <DigitalClock time={time} format="24h" />}
    </div>
  );
};

export default Clock; 