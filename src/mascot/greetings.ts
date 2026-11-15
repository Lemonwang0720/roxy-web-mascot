import { dialogue } from './dialogue.js';

function period(now: Date): keyof typeof dialogue.arrival {
  const hour = now.getHours();
  if (hour < 5) return 'night';
  if (hour < 11) return 'morning';
  if (hour < 14) return 'noon';
  if (hour < 18) return 'afternoon';
  return 'evening';
}
type Period = keyof typeof dialogue.arrival;
type Greeting = Partial<Record<Period, string>> | string;
export type DialogueOptions = {
  arrival?: Greeting;
  wake?: Greeting;
  rest?: string[];
  click?: string[];
};

function greeting(custom: Greeting | undefined, defaults: Record<Period, string>, now: Date) {
  const key = period(now);
  const value = typeof custom === 'string' ? custom : custom?.[key];
  return typeof value === 'string' && value.trim() ? value : defaults[key];
}

function lines(custom: string[] | undefined, defaults: string[]) {
  const valid = Array.isArray(custom)
    ? custom.filter((line) => typeof line === 'string' && line.trim())
    : [];
  return valid.length ? valid : defaults;
}

export function createGreetings(custom: DialogueOptions = {}) {
  return {
    arrivalGreeting: (now = new Date()) => greeting(custom.arrival, dialogue.arrival, now),
    wakeGreeting: (now = new Date()) => greeting(custom.wake, dialogue.wake, now),
    restGreetings: lines(custom.rest, dialogue.rest),
    clickGreetings: lines(custom.click, dialogue.click),
  };
}
