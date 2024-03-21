import { useState } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserData } from "../../../ApiService";

const initialState = {
  profile: [],
};

export const getProfileData = createAsyncThunk('getProfileData', async() => {
  const accessToken = (sessionStorage.getItem("token"))

  try {
    const result = await getUserData(accessToken);
    return result.userData
  } catch (error) {
      console.log(error)
  }
})

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileData.fulfilled, (state, action)=>{
        state.profile = action.payload
    })
    .addCase(getProfileData.rejected, (state, action) => {
      state.profile = null; // Clear the profile state on rejection
    });
  }
})


export default profileSlice.reducer;
