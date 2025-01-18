import { useState, useEffect } from 'react';
import { format, formatInTimeZone } from 'date-fns-tz';
import { TimeData } from '../types/clock';

export const useClock = (timezone: string = 'Asia/Shanghai') => {
  const [time, setTime] = useState<TimeData>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    ampm: 'AM',
    timezone: timezone
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours24 = parseInt(formatInTimeZone(now, timezone, 'HH'));
      const hours12 = hours24 % 12 || 12;
      
      setTime({
        hours: hours12,
        minutes: parseInt(format(now, 'mm')),
        seconds: parseInt(format(now, 'ss')),
        ampm: hours24 >= 12 ? 'PM' : 'AM',
        timezone
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return time;
}; 