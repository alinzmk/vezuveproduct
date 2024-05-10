import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPartnerData } from "../../../ApiService";

const initialState = {
  partner: [],
};

export const getPartnerData = createAsyncThunk('getPartnerData', async() => {
  const accessToken = (sessionStorage.getItem("token"))

  try {
    const result = await getAllPartnerData(accessToken);
    return result
  } catch (error) {
      console.log(error)
  }
})

export const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getPartnerData.fulfilled, (state, action)=>{
        state.partner = action.payload
    })
    .addCase(getPartnerData.rejected, (state, action) => {
      state.partner = null;
    });
  }
})


export default partnerSlice.reducer;
