import { dialogue } from './dialogue.js';

function period(now: Date): keyof typeof dialogue.arrival {
  const hour = now.getHours();
  if (hour < 5) return 'night';
  if (hour < 11) return 'morning';
  if (hour < 14) return 'noon';
  if (hour < 18) return 'afternoon';
  return 'evening';
}
export function wakeGreeting(now = new Date()) {
  return dialogue.wake[period(now)];
}
export function arrivalGreeting(now = new Date()) {
  return dialogue.arrival[period(now)];
}
export const restGreetings = dialogue.rest;
export const clickGreetings = dialogue.click;
