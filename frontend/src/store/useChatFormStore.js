import { create } from 'zustand';

export const useChatFormStore = create((set) => ({
  step: 0,
  answers: {
    name: '',
    email: '',
    message: '',
  },
  errorMsg: '',

  setStep: (step) => set({ step }),
  setAnswer: (field, value) => set((state) => ({
    answers: { ...state.answers, [field]: value },
    errorMsg: '',
  })),
  setErrorMsg: (errorMsg) => set({ errorMsg }),

  nextStep: () => set((state) => ({ step: state.step + 1, errorMsg: '' })),
  prevStep: () => set((state) => ({ step: Math.max(0, state.step - 1), errorMsg: '' })),

  resetForm: () => set({
    step: 0,
    answers: { name: '', email: '', message: '' },
    errorMsg: '',
  }),
}));

export default useChatFormStore;
