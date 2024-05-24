import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAnnouncements } from "../../../ApiService";
import { read } from "xlsx";

const initialState = {
  announcement: [],
};

export const getAnnouncementData = createAsyncThunk("getAnnouncementData", async () => {
  const accessToken = sessionStorage.getItem("token");
  try {
    const result = await getAnnouncements(accessToken);

    return result;
  } catch (error) {
    console.log(error);
  }
});

export const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnnouncementData.fulfilled, (state, action) => {
        state.announcement = action.payload;
      })
      .addCase(getAnnouncementData.rejected, (state, action) => {
        state.announcement = null; // Clear the task state on rejection
      });
  },
});

export default announcementSlice.reducer;
