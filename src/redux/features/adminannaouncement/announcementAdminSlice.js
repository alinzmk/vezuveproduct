import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAnnouncements } from "../../../admin/AdminApiService";

const initialState = {
  announcementadmin: [],
};

export const getAnnouncementAdmin = createAsyncThunk("getAnnouncementAdmin", async () => {
  const accessToken = sessionStorage.getItem("token");
  try {
    const result = await getAnnouncements(accessToken);
    console.log("slice")
    console.log(result)
    return result.data;
  } catch (error) {
    console.log(error);
  }
});

export const announcementAdminSlice = createSlice({
  name: "announcementadmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnnouncementAdmin.fulfilled, (state, action) => {
        state.announcementadmin = action.payload;
      })
      .addCase(getAnnouncementAdmin.rejected, (state, action) => {
        state.announcementadmin = null; // Clear the task state on rejection
      });
  },
});

export default announcementAdminSlice.reducer;
