import { ReactNode } from 'react';

export interface Disc {
  id: string;
  title: string;
  artist: string;
  year: string;
  color: string;
  image: string;
  trackList: string[];
  content: ReactNode; 
}