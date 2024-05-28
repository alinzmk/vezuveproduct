import { getAnnouncementAdmin } from "./features/adminannaouncement/announcementAdminSlice"
import { getDashAdmin } from "./features/admindash/dashAdminSlice"
import { getDocAdmin } from "./features/admindoc/docAdminSlice"
import { getMarketReqAdmin } from "./features/adminmarketreq/marketreqAdminSlice"
import { getPlanAdmin } from "./features/adminplan/planAdminSlice"
import { getProductAdmin } from "./features/adminproduct/productAdminSlice"
import { getTaskAdmin } from "./features/admintask/taskAdminSlice"
import { getUserAdmin } from "./features/adminuser/userAdminSlice"

export const fetchAdminRedux = () => {
    return dispatch => {
        dispatch(getUserAdmin())
        dispatch(getPlanAdmin())
        dispatch(getDashAdmin())
        dispatch(getProductAdmin())
        dispatch(getTaskAdmin())
        dispatch(getDocAdmin())
        dispatch(getMarketReqAdmin())
        dispatch(getAnnouncementAdmin())
    }
}

export default fetchAdminRedux
