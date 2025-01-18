import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import './Calendar.css';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h3>{format(currentDate, 'yyyy年 MM月')}</h3>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        <div className="weekday">日</div>
        <div className="weekday">一</div>
        <div className="weekday">二</div>
        <div className="weekday">三</div>
        <div className="weekday">四</div>
        <div className="weekday">五</div>
        <div className="weekday">六</div>
        {Array(monthStart.getDay()).fill(null).map((_, i) => (
          <div key={`empty-${i}`} className="day empty" />
        ))}
        {days.map(day => (
          <div
            key={day.toISOString()}
            className={`day ${isToday(day) ? 'today' : ''}`}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar; 