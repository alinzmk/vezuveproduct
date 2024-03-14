import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUserData, getUserPlan, getUserPortfolio } from "../../../admin/AdminApiService";

const initialState = {
  dashadmin: [],
};

export const getDashAdmin = createAsyncThunk('getDashAdmin', async() => {
  const accessToken = (sessionStorage.getItem("token"))
  const userID = parseInt(sessionStorage.getItem("selectedCustomer"))
  try {
    const result = await getUserPortfolio(accessToken, userID);
    console.log(result)
    return result
  } catch (error) {
      console.log(error)
  }
})

export const dashAdminSlice = createSlice({
  name: "planadmin",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getDashAdmin.fulfilled, (state, action)=>{
        state.dashadmin = action.payload
    })
    .addCase(getDashAdmin.rejected, (state, action) => {
      state.dashadmin = null; // Clear the dash state on rejection
    });
  }
})


export default dashAdminSlice.reducer;
