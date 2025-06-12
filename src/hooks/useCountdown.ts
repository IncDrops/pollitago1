
"use client";

import { useState, useEffect } from 'react';

export function formatTimeLeft(difference: number): string {
  if (difference <= 0) return 'Ended';

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  let parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`); // Show hours if days are present or hours > 0
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`); // Show minutes if higher units are present or minutes > 0
  parts.push(`${seconds}s`);
  
  // Limit to significant parts, e.g., don't show 0d 0h 5m 10s, just 5m 10s
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

export function useCountdown(endsAt: string | Date): string {
  const [timeLeftFormatted, setTimeLeftFormatted] = useState('');

  useEffect(() => {
    const targetDate = new Date(endsAt).getTime();

    if (isNaN(targetDate)) {
      setTimeLeftFormatted("Invalid date");
      return;
    }

    const calculateAndSetTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      setTimeLeftFormatted(formatTimeLeft(difference));
    };

    calculateAndSetTimeLeft(); // Initial calculation
    const timer = setInterval(calculateAndSetTimeLeft, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [endsAt]);

  return timeLeftFormatted;
}
