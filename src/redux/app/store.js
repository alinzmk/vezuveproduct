import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profiledata/profileSlice";
import planReducer from "../features/plandata/planSlice";
import dashReducer from "../features/dashdata/dashSlice";
import taskReducer from "../features/taskdata/taskSlice";
import productReducer from "../features/productdata/productSlice";
import docReducer from "../features/docdata/docSlice";
import partnerReducer from "../features/partnerdata/partnerSlice";
import marketreqReducer from "../features/marketreqdata/marketreqSlice";
import servicepkgsReducer from "../features/servicepkgsdata/servicepkgsSlice";
import announcementReducer from "../features/annaouncementdata/announcementSlice";
import userAdminReducer from "../features/adminuser/userAdminSlice";
import planAdminReducer from "../features/adminplan/planAdminSlice";
import dashAdminReducer from "../features/admindash/dashAdminSlice";
import productAdminReducer from "../features/adminproduct/productAdminSlice";
import taskAdminReducer from "../features/admintask/taskAdminSlice";
import docAdminReducer from "../features/admindoc/docAdminSlice";
import marketreqAdminReducer from "../features/adminmarketreq/marketreqAdminSlice";
import announcementAdminReducer from "../features/adminannaouncement/announcementAdminSlice";
import productdetailAdminReducer from "../features/adminproductdetail/productdetailAdminSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    plan: planReducer,
    dash: dashReducer,
    task: taskReducer,
    product: productReducer,
    doc: docReducer,
    partner: partnerReducer,
    servicepkgs: servicepkgsReducer,
    marketreq: marketreqReducer,
    announcement: announcementReducer,
    useradmin: userAdminReducer,
    planadmin: planAdminReducer,
    dashadmin: dashAdminReducer,
    productadmin: productAdminReducer,
    taskadmin: taskAdminReducer,
    docadmin: docAdminReducer,
    marketreqadmin: marketreqAdminReducer,
    announcementadmin: announcementAdminReducer,
    productdetailadmin: productdetailAdminReducer,

  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;