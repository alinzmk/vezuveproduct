import { useState } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserPlan } from "../../../ApiService";

const initialState = {
  plan: [],
};



export const getPlanData = createAsyncThunk('getPlanData', async() => {
  const accessToken = (sessionStorage.getItem("token"))
  try {
    const result = await getUserPlan(accessToken);
    return result.userPlan
  } catch (error) {
      console.log(error)
  }
})

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getPlanData.fulfilled, (state, action)=>{
        state.plan = action.payload
    })
    .addCase(getPlanData.rejected, (state, action) => {
      state.plan = null; // Clear the plan state on rejection
    });
  }
})


export default planSlice.reducer;
