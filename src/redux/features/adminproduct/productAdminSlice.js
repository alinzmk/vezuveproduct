import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUserData, getUserPlan, getUserPortfolio, getUserProducts } from "../../../admin/AdminApiService";

const initialState = {
  productadmin: [],
};

export const getProductAdmin = createAsyncThunk('getProductAdmin', async() => {
  const accessToken = (sessionStorage.getItem("token"))
  const userID = parseInt(sessionStorage.getItem("selectedCustomer"))
  try {
    const result = await getUserProducts(accessToken, userID);
    return result
  } catch (error) {
      console.log(error)
  }
})

export const productAdminSlice = createSlice({
  name: "productadmin",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getProductAdmin.fulfilled, (state, action)=>{
        state.productadmin = action.payload
    })
    .addCase(getProductAdmin.rejected, (state, action) => {
      state.productadmin = null; // Clear the dash state on rejection
    });
  }
})


export default productAdminSlice.reducer;
