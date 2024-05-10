import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPackages, getAllPartnerData, getMarketRequirements } from "../../../ApiService";

const initialState = {
  marketreq: [],
};

export const getMarketReqData = createAsyncThunk('getMarketReqData', async() => {
  const accessToken = (sessionStorage.getItem("token"))

  try {
    const result = await getMarketRequirements(accessToken);
    return result.requirements
  } catch (error) {
      console.log(error)
  }
})

export const packageSlice = createSlice({
  name: "marketreq",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getMarketReqData.fulfilled, (state, action)=>{
        state.marketreq = action.payload
    })
    .addCase(getMarketReqData.rejected, (state, action) => {
      state.marketreq = null;
    });
  }
})


export default packageSlice.reducer;
