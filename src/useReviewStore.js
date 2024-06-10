import create from 'zustand';

const useReviewStore = create((set) => ({
  review: '',
  reviewState: 'empty',
  setReview: (review) => set({ review }),
  setReviewState: (reviewState) => set({ reviewState }),
}));

export default useReviewStore;
