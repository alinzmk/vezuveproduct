import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUserData, getUserPlan, getUserPortfolio } from "../../../admin/AdminApiService";

const initialState = {
  planadmin: [],
};

export const getPlanAdmin = createAsyncThunk('getPlanAdmin', async() => {
  const accessToken = (sessionStorage.getItem("token"))
  const userID = parseInt(sessionStorage.getItem("selectedCustomer"))
  try {
    const result = await getUserPlan(accessToken, userID);
    console.log(result)
    return result
  } catch (error) {
      console.log(error)
  }
})

export const planAdminSlice = createSlice({
  name: "planadmin",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getPlanAdmin.fulfilled, (state, action)=>{
        state.planadmin = action.payload
    })
    .addCase(getPlanAdmin.rejected, (state, action) => {
      state.planadmin = null; // Clear the dash state on rejection
    });
  }
})


export default planAdminSlice.reducer;
