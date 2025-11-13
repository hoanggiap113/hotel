import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  checkIn: string | null;
  checkOut: string | null;
  capacity: number;
}

const loadInitState = (): SearchState => {
  if (typeof window === "undefined") {
    return { checkIn: null, checkOut: null, capacity: 1 };
  }
  try {
    const storedData = localStorage.getItem("searchState");
    if (storedData) {
      return JSON.parse(storedData) as SearchState;
    }
  } catch (err) {
    console.error("Lỗi khi parse searchState:", err);
    localStorage.removeItem("searchState");
  }
  return { checkIn: null, checkOut: null, capacity: 1 };
};

const initialState: SearchState = loadInitState();
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchCriteria(state, action: PayloadAction<Partial<SearchState>>) {
      Object.assign(state, action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("searchState", JSON.stringify(state));
      }
    },
    clearSearch(state) {
      const defaultState: SearchState = {
        checkIn: null,
        checkOut: null,
        capacity: 1,
      };
      Object.assign(state, defaultState);

      if (typeof window !== "undefined") {
        localStorage.removeItem("searchState");
      }
    },
    loadSearchFromStorage(state) {
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem("searchState");
        if (storedData) {
          Object.assign(state, JSON.parse(storedData));
        }
      }
    },
  },
});

export const { updateSearchCriteria, clearSearch, loadSearchFromStorage } =
  searchSlice.actions;
export default searchSlice.reducer;
