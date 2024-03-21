import { useState } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserDocuments } from "../../../ApiService";

const initialState = {
  doc: [],
};



export const getDocData = createAsyncThunk('getDocData', async() => {
  const accessToken = (sessionStorage.getItem("token"))
  try {
    const result = await getUserDocuments(accessToken);
    return result.userDocuments
  } catch (error) {
      console.log(error)
  }
    

})

export const docSlice = createSlice({
  name: "doc",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getDocData.fulfilled, (state, action)=>{
        state.doc = action.payload
    })
    .addCase(getDocData.rejected, (state, action) => {
      state.doc = null; // Clear the doc state on rejection
    });
  }
})


export default docSlice.reducer;
