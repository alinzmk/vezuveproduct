import { useState, useEffect } from "react";
import logo from "../Assets/logo-renkli.png";
import Sidebar2 from "../Modals/Sidebar2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addAnnouncement,
  createUserTask,
  deleteAnnouncement,
  deleteUserTask,
  setUserTasks,
} from "../AdminApiService";
import { getTaskAdmin } from "../../redux/features/admintask/taskAdminSlice";
import AdminPage from "../Modals/AdminPage";
import fetchAdminRedux from "../../redux/fetchAdminRedux";

function Announcements() {
  const accessToken = sessionStorage.getItem("token")
  const [announcementName, setAnnouncementName] = useState("")
  const { announcementadmin } = useSelector((state) => state.announcementadmin);
  const dispatch = useDispatch()
  useEffect(() => {
    if (!announcementadmin || announcementadmin.length === 0) {
        dispatch(fetchAdminRedux());
    }
}, [dispatch, announcementadmin]);

  useEffect(()=>{
    console.log(announcementadmin)
  });

  const handleAddAnnouncement = async () => {
    const success = await addAnnouncement(accessToken, announcementName);
    if (success) {
      console.log('Announcement added successfully!');
      dispatch(fetchAdminRedux())
    } else {
      console.log('Failed to add announcement');
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    const success = await deleteAnnouncement(accessToken, id);
    if (success) {
      console.log(success);
      console.log('Announcement deleted successfully!');
      dispatch(fetchAdminRedux())
    } else {
      console.log(success);
      console.log('Failed to delete announcement');
    }
  };

  //------------------------------------------------------------------------------
  
  //------------------------------------------------------------------------------

  return (
    <>
      <AdminPage pageName={"Duyurular"}>
        <section className="duyurular">
          <div className="row slideleft task-wrapper">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="">
                <input
                  style={{width:"500px", padding:"5px"}}
                  type="text"
                  className="product-input me-3 mb-3"
                  value={announcementName}
                  onChange={(e) => setAnnouncementName(e.target.value)}
                  placeholder="Eklemek İstediğiniz Duyuruyu Giriniz"
                ></input>
                <button className="profile-button ms-auto trans me-3 my-2" onClick={handleAddAnnouncement}> Ekle </button>
                    {announcementadmin && announcementadmin.map((announ, index)=>
                      <div className="d-flex mb-3">
                        <button  className="btn btn-primary" onClick={()=>handleDeleteAnnouncement(announcementadmin[index].id)}>SİL!</button>
                        <h5 className="ms-2">{announcementadmin[index].announcement}</h5>
                      </div>
                    )}
              </div>
            </form>
          </div>
        </section>
      </AdminPage>
    </>
  );
}

export default Announcements;
