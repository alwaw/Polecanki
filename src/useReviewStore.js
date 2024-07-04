import { create } from "zustand";

const useReviewStore = create((set, get) => ({
  title: [],
  setTitle: (newTitle) => set({ title: newTitle }),
  //title array:
  //dataAPI,
  //title,
  //titleImageSrc,
  //rating,
  //id,
  //review

  //dataAPI - id, title, URL image, overview, rating (tmdb), genre tags
  dataAPI: {},
  setDataAPI: (dataAPI) => set({ dataAPI }),

  //review and review state
  review: "",
  reviewState: "empty",
  setReview: (review) => set({ review }),
  setReviewState: (reviewState) => set({ reviewState }),

  //star rate from user
  userStarRate: 0,
  setUserStarRate: (userStarRate) => set({ userStarRate }),

  findTvSeriesById: (id) => {
    const tvSeries = get().title.find((obj) => obj.id === id);
    return tvSeries;
  },

  editTVSeries: (titleObject) => {
    const allTitles = get().title;

    //Checking if there exists an object in the [title] array
    //with the same id as the object passed to the function.
    const existingTitle = allTitles.find((obj) => obj.id === titleObject.id);
    if (existingTitle) {
      const updatedTitles = allTitles.map((obj) =>
        obj.id === titleObject.id ? { ...obj, ...titleObject } : obj
      );
      set({ title: updatedTitles });
    }
  },
  reset: () => {
    set({ dataAPI: {} });
    set({ reviewState: "empty" });
    set({ review: "" });
    set({ userStarRate: 0 });
  },
}));

export default useReviewStore;
