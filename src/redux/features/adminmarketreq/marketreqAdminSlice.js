import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMarketRequirements } from "../../../admin/AdminApiService";

const initialState = {
  marketreqadmin: [],
};

export const getMarketReqAdmin = createAsyncThunk('getMarketReqAdmin', async() => {
  const accessToken = (sessionStorage.getItem("token"))
  const userID = parseInt(sessionStorage.getItem("selectedCustomer"))
  try {
    const result = await getMarketRequirements(accessToken, userID);
    return result.requirements
  } catch (error) {
      console.log(error)
  }
})

export const marketreqAdminSlice = createSlice({
  name: "marketreqadmin",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getMarketReqAdmin.fulfilled, (state, action)=>{
        state.marketreqadmin = action.payload
    })
    .addCase(getMarketReqAdmin.rejected, (state, action) => {
      state.marketreqadmin = null;
    });
  }
})

export default marketreqAdminSlice.reducer;