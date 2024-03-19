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
import DomainCard from "./DomainCard";
import QuestionsCard from "./QuestionsCard";

function AddQuestionsHomepage() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                
                <QuestionsCard
                  color="info"
                  title="VLSI FRESHER_1"
                  description="Fresher-1"
                  date="just updated"
                  area ='VLSI_FRESHER_1'
                  image="https://upload.wikimedia.org/wikipedia/commons/9/94/VLSI_Chip.jpg"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                
                <QuestionsCard
                  color="info"
                  title="VLSI FRESHER_2"
                  description="Fresher-2"
                  date="just updated"
                  area ='VLSI_FRESHER_2'
                  image="https://upload.wikimedia.org/wikipedia/commons/9/94/VLSI_Chip.jpg"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                
                <QuestionsCard
                  color="info"
                  title="VLSI FRESHER_3"
                  description="Fresher-3"
                  date="just updated"
                  area ='VLSI_FRESHER_3'
                  image="https://upload.wikimedia.org/wikipedia/commons/9/94/VLSI_Chip.jpg"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                
                <QuestionsCard
                  color="info"
                  title="VLSI FRESHER_4"
                  description="Fresher-4"
                  date="just updated"
                  area ='VLSI_FRESHER_4'
                  image="https://upload.wikimedia.org/wikipedia/commons/9/94/VLSI_Chip.jpg"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                
                <QuestionsCard
                  color="info"
                  title="VLSI QUESTIONS"
                  description="Fresher/Experience"
                  date="just updated"
                  area ='VLSI'
                  image="https://upload.wikimedia.org/wikipedia/commons/9/94/VLSI_Chip.jpg"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <QuestionsCard
                  color="success"
                  title="EMBEDED QUESTIONS"
                  description="Fresher/Experience"
                  area='EMBEDDED'
                  image="https://www.tessolve.com/wp-content/uploads/2022/06/embedded-system-micro.jpg"
                //   description={
                //     <>
                //       (<strong>+15%</strong>) increase in today sales.
                //     </>
                //   }
                  date="just updated"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <QuestionsCard
                  color="dark"
                  title="SOFTWARE"
                  description="Python"
                  area='SOFTWARE'
                  date="just updated"
                  image="https://www.tatvasoft.com/outsourcing/wp-content/uploads/2023/06/Application-Software.jpg"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}
          </Grid>
        </MDBox>
    
      </MDBox>
      <MDBox>
        
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddQuestionsHomepage;
