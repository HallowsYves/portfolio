import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

export interface Disc {
  id: string;
  title: string;
  artist: string;
  year: string;
  color: string;
  image: StaticImageData | string;
  trackList: string[];
  content: ReactNode; 
}