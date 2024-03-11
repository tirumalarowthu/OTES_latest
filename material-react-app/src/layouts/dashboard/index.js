/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [testStatusInfo, setTestStatusInfo] = useState({})
  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/candidate/info`)
      setTestStatusInfo(response.data)
      console.log(testStatusInfo["Test Taken"])
      console.log(testStatusInfo["Test Not Taken"])
      console.log(testStatusInfo["totalCount"])
      console.log(testStatusInfo["Test Cancelled"])
      // testStatusInfo.map(item => console.log(item))
    }
    catch (err) {
      console.log(err.message)
    }

  }
  //for getting data of various test status : 
  useEffect(() => {
    getData()

  }, [])
  console.log(testStatusInfo)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/Candidate-List">
                <ComplexStatisticsCard
                  color="secondary"
                  icon="person_add"
                  title="Registered"
                  count={testStatusInfo["totalCount"] ||0}
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/Candidate-List/Filter/testStatus/Test_Not_Taken">
                <ComplexStatisticsCard
                  color="dark"
                  icon="assignment_late"
                  title="Test Not Taken"
                  count={testStatusInfo["Test Not Taken"] || 0}
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/Candidate-List/Filter/testStatus/Test_Taken">
                <ComplexStatisticsCard
                  icon="assignment_turned_in"
                  title="Test Taken"
                  count={testStatusInfo["Test Taken"] || 0}
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/Candidate-List/Filter/testStatus/Evaluated">
                <ComplexStatisticsCard
                  color="success"
                  icon="check_circle"
                  title="Evaluated"
                  count={testStatusInfo["Evaluated"] || 0}
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </Link>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Link to="/Candidate-List/Filter/testStatus/Test_Cancelled">
                <ComplexStatisticsCard
                  color="primary"
                  icon="cancel"
                  title="Cancelled"
                  count={testStatusInfo["Test Cancelled"] || 0}
                  percentage={{
                    color: "",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </Link>
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="check"
                title="Approved"
                count={testStatusInfo["isApproved"]}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="hourglass_top"
                title="Pending Approvals"
                count={testStatusInfo["isNotApproved"]}
                percentage={{
                  color: "",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <MDBox>

      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
