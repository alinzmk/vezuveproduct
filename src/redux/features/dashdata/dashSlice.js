import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserPortfolio } from "../../../ApiService";

const initialState = {
  dash: [],
};

export const getDashData = createAsyncThunk('getDashData', async() => {
  const accessToken = (sessionStorage.getItem("token"))
  console.log(accessToken)
  try {
    const result = await getUserPortfolio(accessToken);
    return result
  } catch (error) {
      console.log(error)
  }
})

export const dashSlice = createSlice({
  name: "dash",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getDashData.fulfilled, (state, action)=>{
        state.dash = action.payload
    })
    .addCase(getDashData.rejected, (state, action) => {
      state.dash = null; // Clear the dash state on rejection
    });
  }
})


export default dashSlice.reducer;
