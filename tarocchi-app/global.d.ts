import { DailyTriggerInput } from 'expo-notifications';

declare module 'expo-notifications' {
  interface DailyTriggerInput {
    hour: number;
    minute: number;
    repeats?: boolean;
  }
}