
import React from 'react';
import { Service } from './types';

export const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Standard Haircut',
    price: 45,
    duration: '45 min',
    image: 'https://picsum.photos/seed/hair1/400/400',
    description: 'Classic cut and style with precision grooming.'
  },
  {
    id: '2',
    name: 'Full Beard Trim',
    price: 30,
    duration: '30 min',
    image: 'https://picsum.photos/seed/beard1/400/400',
    description: 'Shaping, edging, and hot towel treatment.'
  },
  {
    id: '3',
    name: 'Deluxe Color & Cut',
    price: 120,
    duration: '120 min',
    image: 'https://picsum.photos/seed/color1/400/400',
    description: 'Complete transformation with premium dyes.'
  },
  {
    id: '4',
    name: 'Scalp Treatment',
    price: 60,
    duration: '60 min',
    image: 'https://picsum.photos/seed/scalp1/400/400',
    description: 'Relaxing detox treatment for healthy hair roots.'
  }
];

export const MOCK_TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];
