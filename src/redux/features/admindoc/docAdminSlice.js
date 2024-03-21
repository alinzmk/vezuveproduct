import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDocuments } from "../../../admin/AdminApiService";

const initialState = {
  docadmin: [],
};

export const getDocAdmin = createAsyncThunk('getDocAdmin', async() => {
  const accessToken = (sessionStorage.getItem("token"))
  const userID = parseInt(sessionStorage.getItem("selectedCustomer"))
  try {
    const result = await getUserDocuments(accessToken, userID);
    return result.userDocuments
  } catch (error) {
      console.log(error)
  }
})

export const docAdminSlice = createSlice({
  name: "docadmin",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getDocAdmin.fulfilled, (state, action)=>{
        state.docadmin = action.payload
    })
    .addCase(getDocAdmin.rejected, (state, action) => {
      state.docadmin = null; // Clear the dash state on rejection
    });
  }
})

export default docAdminSlice.reducer;
