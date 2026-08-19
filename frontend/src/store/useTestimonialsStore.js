import { create } from 'zustand';
import { testimonialsData } from '../data/testimonials';

export const useTestimonialsStore = create((set) => ({
  testimonials: testimonialsData,

  addTestimonial: (newTestimonial) => set((state) => ({
    testimonials: [newTestimonial, ...state.testimonials]
  })),

  updateTestimonials: (newList) => set({ testimonials: newList })
}));
