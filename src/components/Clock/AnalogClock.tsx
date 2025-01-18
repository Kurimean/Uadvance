import React, { useEffect, useRef } from 'react';
import { TimeData } from '../../types/clock';
import './AnalogClock.css';

interface AnalogClockProps {
  time: TimeData;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ time }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawClock = () => {
      const radius = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 绘制表盘
      ctx.beginPath();
      ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 绘制时针
      const hour = time.hours % 12;
      const hourAngle = (hour + time.minutes / 60) * 30 * Math.PI / 180;
      drawHand(ctx, hourAngle, radius * 0.5, radius, 6);

      // 绘制分针
      const minuteAngle = time.minutes * 6 * Math.PI / 180;
      drawHand(ctx, minuteAngle, radius * 0.7, radius, 4);

      // 绘制秒针
      const secondAngle = time.seconds * 6 * Math.PI / 180;
      drawHand(ctx, secondAngle, radius * 0.9, radius, 2);
    };

    drawClock();
  }, [time]);

  const drawHand = (
    ctx: CanvasRenderingContext2D,
    angle: number,
    length: number,
    radius: number,
    width: number
  ) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(radius, radius);
    ctx.lineTo(
      radius + Math.sin(angle) * length,
      radius - Math.cos(angle) * length
    );
    ctx.stroke();
  };

  return (
    <div className="analog-clock">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="clock-canvas"
      />
    </div>
  );
};

export default React.memo(AnalogClock); 