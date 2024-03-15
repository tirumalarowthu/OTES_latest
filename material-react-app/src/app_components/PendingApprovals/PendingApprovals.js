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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import CircularProgress from '@mui/material/CircularProgress';

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
import pendingApprovalsData from "./pendingApprovalsData";
import MDInput from "components/MDInput";
import { Select, MenuItem, InputLabel, FormControl, Divider } from '@mui/material';

import { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';

// import projectsTableData from "layouts/tables/data/projectsTableData";

function PendingApprovals() {
  // const [searchQuery, setSearchQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { columns, rows, loading } = pendingApprovalsData();
  // console.log(rows,"rows data")
  //   const { columns: pColumns, rows: pRows } = projectsTableData();

  const filterCandidates = () => {
    if (!searchQuery) {
      return rows;
    } else {
      return rows.filter((candidate) => {
        const name = candidate.name.props.name.toLowerCase();
        const email = candidate.name.props.email.toLowerCase();
        return name.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
      });
    }
  };

  // State to hold filtered data for display
  const [filteredCandidates, setFilteredCandidates] = useState(filterCandidates());

  // Update filteredCandidates when searchQuery changes
  useEffect(() => {
    setFilteredCandidates(filterCandidates());
  }, [searchQuery, rows]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2} p={1.5}
                variant="gradient"
                bgColor="warning"
                borderRadius="lg"
                coloredShadow="info"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <MDTypography variant="h6" color="white" mt={0.7} >
                  Pending Approvals Table
                </MDTypography>
                {/* <MDTypography style={{ background: "white", width: "50%", marginBottom: "10px", borderRadius: "10px" }}>
                  <MDInput 
                  onChange={(e)=>setSearchQuery(e.target.value)}
                  style={{ width: "100%" }} autofil={false} label="Search user by name or email" />
                </MDTypography> */}
            <FormControl>
                  <MDInput
                  type="search"
                  placeholder="Search by name or email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    borderColor: '#1A73E8',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    width: '275px',
                  
                  '& input': {
                    // border: '2px solid black',
                    // borderColor: '#1A73E8', 
                    // backgroundColor: '#FFFFFF',
                    padding: '8px',
                    paddingLeft: '40px', 
                  },
                }}
                />
                <SearchIcon sx={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#1A73E8' }} />
              </FormControl>
              </MDBox>
              <MDBox pt={3}>
              {loading ? (
                  <MDBox align="center" variant="h6" mb={2} ml={4}>
                    <CircularProgress color='black' size={30} /></MDBox>
                ) : (
                  <>
                    {filteredCandidates.length > 0 ? (
                      <DataTable
                        table={{ columns, rows:filteredCandidates }}
                        isSorted={true}
                        entriesPerPage={false}
                        showTotalEntries={true}
                        noEndBorder
                      />
                    ) : (
                      <MDTypography align="center" variant="h6" mb={2} ml={4}>
                        {rows.length > 0 && searchQuery != "" ? "No Matching Candidates Found" : ""}
                        {rows.length === 0 && searchQuery === "" ? "No Candidates" : ""}                      </MDTypography>
                    )}
                  </>
                )}

              </MDBox>

            </Card>
          </Grid>
          {/* <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PendingApprovals
