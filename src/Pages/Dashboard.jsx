import "../App.css";
import { useEffect, useState } from "react";
import LineChart from "../Modals/Linechart";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import fetchAllRedux from "../redux/fetchAllRedux";
import UserPage from "../Modals/UserPage";

function Dashboard() {
  const accessToken = sessionStorage.getItem("token");
  const navigate = useNavigate();
  if (!accessToken) {
    navigate("/");
  }
  //------------------------------------------------------------------------------
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const { plan } = useSelector((state) => state.plan);
  const { dash } = useSelector((state) => state.dash);
  const { task } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  //------------------------------------------------------------------------------
  if (dash.length === 0) {
    dispatch(fetchAllRedux());
  }
  //------------------------------------------------------------------------------

  const getTasksByDate = () => {
    if (!task || !task.tasks) {
      return [];
    }

    const tasksCopy = [...task.tasks];
    const sortedTasks = tasksCopy.sort(
      (a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate)
    );
    const firstThreeTasks = sortedTasks.slice(0, 3);

    return firstThreeTasks;
  };

  const lastTasks = getTasksByDate();

  const totalGrowth = () => {
    if (month !== 0) {
      var prevMonth = month - 1;
    } else if (month === 0) {
      var prevMonth = 11;
    }
    var currentSale = dash.sales[0][month].value;
    var previousSale = dash.sales[0][prevMonth].value;
    var total = currentSale - previousSale;
    return total;
  };

  const totalLastMonthGrowth = () => {
    if (month !== 0) {
      var prevMonth = month - 1;
      var prevprevMotnh = month - 2;
    } else if (month === 0) {
      prevMonth = 11;
      prevprevMotnh = 10;
    }

    console.log(prevprevMotnh);

    if (prevprevMotnh < 0) {
      prevprevMotnh = 0;
    }

    var currentSale = dash.sales[0][prevMonth].value;
    var previousSale = dash.sales[0][prevprevMotnh].value;
    var total = currentSale - previousSale;
    return total;
  };

  const remainingDays = (date) => {
    const today = new Date(); // Get today's date
    const targetDate = new Date(date); // Parse the input date

    // Calculate the time difference in milliseconds
    const timeDifference = targetDate - today;

    // Convert time difference from milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference; // Return the remaining days
  };

  const statusIcon = (status) => {
    if (status === "Finished") {
      return <i class="fa-solid fa-check-double"></i>;
    } else if (status === "In Progress") {
      return <i class="fa-regular fa-clock"></i>;
    } else if (status === "Planned") {
      return <i class="fa-regular fa-file"></i>;
    }
  };

  function formatDate(inputDate) {
    const [datePart, timePart] = inputDate.split(" ");
    const [year, month, day] = datePart.split("-");

    return `${day}/${month}/${year}`;
  }

  const calculatePercentage = (param1) => {
    if (month !== 0) {
      var prevMonth = month - 1;
    } else if (month === 0) {
      var prevMonth = 11;
    }

    var current = parseFloat(param1[month].value);
    var previous = parseFloat(param1[prevMonth].value);

    if (!isNaN(current) && !isNaN(previous)) {
      const change = parseInt(((current - previous) / previous) * 100);
      if (isNaN(change)) {
        return <p className={"plus"}>%{0}</p>;
      } else {
        return <p className={change < 0 ? "minus" : "plus"}>%{change}</p>;
      }
    } else {
      return "no data";
    }
  };

  const calculateGrowthPercentage = () => {
    if (month !== 0) {
      var prevMonth = month - 1;
    } else if (month === 0) {
      var prevMonth = 11;
    }

    var current = parseFloat(totalGrowth());
    var previous = parseFloat(totalLastMonthGrowth());

    if (!isNaN(current) && !isNaN(previous)) {
      const change = parseInt(((current - previous) / previous) * 100);
      if (isNaN(change)) {
        return <p className={"plus"}>%{0}</p>;
      } else {
        return <p className={change < 0 ? "minus2" : "plus2"}>%{change}</p>;
      }
    } else {
      return "no data";
    }
  };

  return (
    <UserPage pageName={"Panel"}>
      <section className="dashboard">
        <div className="row slideleft">
          <div className="col-12 col-lg-6">
            <div className="row d-flex justify-content-between pe-0 pe-lg-3">
              <div className="col-lg-4 col-12 trans mainhov" id="total-sales">
                <div className="col-12 slideup position-relative">
                  <h6>Toplam Satış</h6>
                  {dash.length !== 0 && dash.sales ? (
                    <>
                      <h2>
                        {dash.sales[0][month].value}$
                        <span className="aylık">/aylık</span>
                      </h2>
                      {calculatePercentage(dash.sales[0])}
                    </>
                  ) : (
                    <>
                      <h2>
                        0000$<span className="aylık">/aylık</span>
                      </h2>
                      <p className="plus"></p>
                    </>
                  )}
                </div>
              </div>
              <div
                className="col-lg-3 col-12  trans mainhov"
                id="total-purchases"
              >
                <div className="col-12 slideup">
                  <h6>Toplam Reklam Harcaması</h6>
                  {dash.length !== 0 && dash.ads ? (
                    <>
                      <h2>
                        {dash.ads[0][month].value}$
                        <span className="aylık">/günlük</span>
                      </h2>
                      {calculatePercentage(dash.ads[0])}
                    </>
                  ) : (
                    <>
                      <h2>
                        0000$<span className="aylık">/günlük</span>
                      </h2>
                      <p className="plus">+%0</p>
                    </>
                  )}
                </div>
              </div>
              <div className="col-lg-3 col-12 trans mainhov" id="total-orders">
                <div className="col-12 slideup">
                  <h6>Toplam Sipariş</h6>
                  {dash.length !== 0 && dash.sales_unit ? (
                    <>
                      <h2>
                        {dash.sales_unit[0][month].value}
                        <span className="aylık">/adet</span>
                      </h2>
                      {calculatePercentage(dash.sales_unit[0])}
                    </>
                  ) : (
                    <>
                      <h2>
                        0000<span className="aylık">/adet</span>
                      </h2>
                      <p className="plus">+%0</p>
                    </>
                  )}
                </div>
              </div>
              <div className="col-12 trans mainhov" id="total-growth">
                <div className="col-12 slideup position-relative">
                  <h6>Toplam Büyüme</h6>
                  {dash.length !== 0 && dash.sales ? (
                    <>
                      <h2>
                        {totalGrowth()}$<span className="aylık">/aylık</span>
                      </h2>
                      {calculateGrowthPercentage()}
                    </>
                  ) : (
                    <>
                      <h2>
                        0000$<span className="aylık">/aylık</span>
                      </h2>
                      <p className="plus2">+%0</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-12 col-lg-6 mb-3 d-flex justify-content-between"
            id="customer-info"
          >
            <div className="col-12 ps-1 ps-lg-5 my-auto">
              <h5 className="main-info">
                Aktif hizmetiniz <i class="fa-solid fa-box-open"></i> :{" "}
                <span className="main-info2">
                  {plan ? (
                    <>
                      <span className="main-info2">{plan.currentPlan}</span>
                    </>
                  ) : (
                    <>No Data</>
                  )}
                  {}
                </span>
              </h5>
              <hr className="info-hr" />
              <h5 className="main-info">
                E-Ticaret Uzmanınız <i class="fa-regular fa-user"></i> :{" "}
                <span className="main-info2">
                  {plan ? (
                    <>
                      <span className="main-info2">{plan.expert}</span>
                    </>
                  ) : (
                    <>No Data</>
                  )}
                </span>
              </h5>
              <hr className="info-hr" />
              <h5 className="main-info">
                Uzman İletişim Bilgileri <i class="fa-regular fa-user"></i> :{" "}
                <span className="main-info2">
                  {plan ? (
                    <>
                      <span className="main-info2">{plan.expertmail}</span>
                    </>
                  ) : (
                    <>No Data</>
                  )}
                </span>
              </h5>
              <hr className="info-hr" />
              <h5 className="main-info">
                Kalan Abonelik Süreniz <i class="fa-regular fa-clock"></i> :{" "}
                <span className="main-info2">
                  {plan ? (
                    <>
                      <span className="main-info2">
                        {remainingDays(plan.finishDate)} gün
                      </span>
                    </>
                  ) : (
                    <>No Data</>
                  )}
                </span>
              </h5>
            </div>
          </div>
        </div>
        <div className="row slideleft">
          <div className="col-12 col-lg-6 mb-lg-0 mb-3 pe-0 pe-lg-3">
            <div className="row me-1" id="graph">
              <div className="col-12 text-center">
                <h3 className="p-3">Satış Raporu</h3>
              </div>
              <div className="col-12 m-0  chart-wrapper">
                <LineChart />
              </div>
            </div>
          </div>
          <div id="status" className="col-12 col-lg-6">
            <div className="col-12 text-center mt-4">
              <h3>Son Durumlar</h3>
            </div>
            <div className="col-12 mt-4">
              {lastTasks.map((task, index) => (
                <div className="row mb-4 d-flex justify-content-between">
                  <div className="col-1 my-auto ms-4">
                    <h2>
                      <i class="fa-regular fa-folder-open"></i>
                    </h2>
                  </div>
                  <div className="col-5 my-auto text-center">
                    {task.taskName}
                  </div>
                  <div className="col-2 my-auto text-center">
                    {formatDate(task.lastUpdate)}
                  </div>
                  <div className="col-3 my-auto text-center">
                    {task.taskStatus} {statusIcon(task.taskStatus)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </UserPage>
  );
}

export default Dashboard;
