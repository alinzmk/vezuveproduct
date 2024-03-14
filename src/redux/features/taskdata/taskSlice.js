import { useState } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserTasks } from "../../../ApiService";

const initialState = {
  task: [],
};



export const getTaskData = createAsyncThunk('getTaskData', async() => {
  const accessToken = (sessionStorage.getItem("token"))
  console.log(accessToken)
  try {
    const result = await getUserTasks(accessToken);
    return result.tasks
  } catch (error) {
      console.log(error)
  }
    

})

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskData.fulfilled, (state, action)=>{
        state.task = action.payload
    })
    .addCase(getTaskData.rejected, (state, action) => {
      state.task = null; // Clear the task state on rejection
    });
  }
})


export default taskSlice.reducer;
