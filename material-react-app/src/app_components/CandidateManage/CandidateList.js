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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import IconButton from '@mui/material/IconButton';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';


// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
import CandidateListData from "./CandidateListData";
import MDInput from "components/MDInput";
import { useState ,useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Select, MenuItem, InputLabel, FormControl, Divider } from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Form } from "react-router-dom";
// import SearchIcon from '@mui/icons-material/Search';
// import ClearIcon from '@mui/icons-material/Clear';

// import projectsTableData from "layouts/tables/data/projectsTableData";

function CandidateList() {
  const [searchQuery, setSearchQuery] = useState('');
  const { columns, rows, loading } = CandidateListData();
  // console.log(rows)
  const [data, setData] = useState([]);
  // console.log(loading)
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


  const handleExportExcel = () => {
    // Map the rows data to the format required by the Excel export
    const formattedData = rows.map((candidate, index) => ({
      S_No: index + 1,
      Name: candidate.name.props.name,
      Email: candidate.name.props.email,
      Area: candidate.action.props.children.props.children[0].props.children.props.to.state.item.area,
      TestStatus: candidate.status.props.children.props.badgeContent,
      Marks: candidate.Marks.props.children,
      Result: candidate.Result.props.children,
    }));
  
    // Convert the data to an array of objects suitable for xlsx library
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
  
    // Create a new workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Candidate List');
  
    // Convert the workbook to a binary XLSX file
    const excelFile = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });
  
    // Convert the binary data to a Blob
    const blob = new Blob([s2ab(excelFile)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Save the Blob as a file
    saveAs(blob, 'candidate-list.xlsx');
  };

  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card >
              <MDBox
                mx={2}
                mt={-3}
                py={1}
                px={2}
                p={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <MDTypography variant="h6" color="white" sx={{paddingTop:'10px'}}>
                  Candidate List Table
                </MDTypography>
                <MDBox>
                {!loading && (
                <Button sx={{color: '#FFFFFF', marginRight:'5px',
                '&:hover': {
                  color: '#FFFFFF', // Remove background color on hover
                },
                }} onClick={handleExportExcel} title="Download Excel" startIcon={<CloudDownloadIcon />} style={{fontSize:'11px',}} >Download </Button>
                )}
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
                {/* <Button sx={{color: 'lightblue', marginLeft: '0px'}} onClick={handleExportExcel} title="Download" startIcon={<CloudDownloadIcon />} ></Button> */}
                </MDBox>

              </MDBox>
              <MDBox>
                
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <div align="center" variant="h6" mb={2} ml={4}>
                    <CircularProgress color='black' size={30} /></div>
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
                        {rows.length > 0 ? "No Matching Candidates Found" : "No Candidates"}
                      </MDTypography>
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

export default CandidateList

// /**
// =========================================================
// * Material Dashboard 2 React - v2.1.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-react
// * Copyright 2022 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // @mui material components
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// // Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";
// import IconButton from '@mui/material/IconButton';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import Button from '@mui/material/Button';

// // Data
// // import authorsTableData from "layouts/tables/data/authorsTableData";
// import CandidateListData from "./CandidateListData";
// import MDInput from "components/MDInput";
// import { useState, useEffect } from "react";
// import CircularProgress from '@mui/material/CircularProgress';
// import { Select, MenuItem, InputLabel, FormControl, Divider } from '@mui/material';
// import { DownloadExcel } from 'react-excel-export';
// // import projectsTableData from "layouts/tables/data/projectsTableData";

// function CandidateList() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const { columns, rows, loading } = CandidateListData();
//   // console.log(rows)
//   const [data, setData] = useState([]);
//   // console.log(loading)
//   // console.log(rows,"rows data")
//   //   const { columns: pColumns, rows: pRows } = projectsTableData();
//   const filteredCandidates = rows.filter((candidate) => {
//     const name = candidate.name.props.children || "";
//     const email = candidate.name.props.email || "";
//     return (
//       name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       email.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   });

//   useEffect(() => {
//     // Map the rows data to the format required by the Excel export
//     const formattedData = rows.map((candidate, index) => ({
//       S_No: index + 1,
//       Name: candidate.name.props.name,
//       Email: candidate.name.props.email,
//       Area: candidate.action.props.children.props.children[0].props.children.props.to.state.item.area,
//       TestStatus: candidate.status.props.children.props.badgeContent,
//       Marks: candidate.Marks.props.children,
//       Result: candidate.Result.props.children,

//     }));
  
//     // console.log("Formatted Data:", formattedData); // Log the formatted data
  
//     setData(formattedData); // Update the state with formatted data
//   }, [rows]);
  

  
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox pt={6} pb={3}>
//         <Grid container spacing={6}>
//           <Grid item xs={12}>
//             <Card >
//               <MDBox
//                 mx={2}
//                 mt={-3}
//                 py={1}
//                 px={2}
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//                 style={{ display: "flex", justifyContent: "space-between" }}
//               >
//                 <MDTypography variant="h6" color="white" sx={{paddingTop:'10px'}}>
//                   Candidate List Table
//                 </MDTypography>
//                 <MDBox>
//                 <FormControl component="div" sx={{color: 'black'}}>
//                   <MDInput
//                     type="text" 
//                     sx={{
//                       '& input': {
//                         border: '2px solid black',
//                         borderColor: '#1A73E8', 
//                         backgroundColor: '#98c1d9',
//                         width: '350px',
//                         borderRadius: '8px',
//                         padding: '8px',
//                       }
//                     }}
//                     placeholder="Search by name or email"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </FormControl>
//                 <DownloadExcel
//                    sx={{borderRadius:'8px', paddingTop:'15px', Right:'10px', backgroundColor:'red'}}
//                   data={data}
//                   filename="candidate-list.xlsx"
//                   element={
//                     <Button  sx={{borderRadius:'8px', paddingTop:'15px', Right:'10px', backgroundColor:'red'}}></Button>
//                   }
//                 >
//                   {/* No need for any text here */}
//                 </DownloadExcel>
//                 </MDBox>
                
//                 {/* <MDTypography style={{ background: "white", width: "50%", marginBottom: "10px", borderRadius: "10px" }}>
//                   <MDInput 
//                   onChange={(e)=>setSearchQuery(e.target.value)}
//                   style={{ width: "100%" }} autofil={false} label="Search user by name or email" />
//                 </MDTypography> */}

//               </MDBox>
              
//               <MDBox pt={3}>
//                 {loading ? (
//                   <div align="center" variant="h6" mb={2} ml={4}>
//                     <CircularProgress color='black' size={30} /></div>
//                 ) : (
//                   <>
//                     {rows.length > 0 ? (
//                       <DataTable
//                         table={{ columns, rows:filteredCandidates }}
//                         isSorted={true}
//                         entriesPerPage={false}
//                         showTotalEntries={true}
//                         noEndBorder
//                       />
//                     ) : (
//                       <MDTypography align="center" variant="h6" mb={2} ml={4}>
//                         No Candidates
//                       </MDTypography>
//                     )}
//                   </>
//                 )}
//               </MDBox>
//             </Card>
//           </Grid>
//           {/* <Grid item xs={12}>
//             <Card>
//               <MDBox
//                 mx={2}
//                 mt={-3}
//                 py={3}
//                 px={2}
//                 variant="gradient"
//                 bgColor="info"
//                 borderRadius="lg"
//                 coloredShadow="info"
//               >
//                 <MDTypography variant="h6" color="white">
//                   Projects Table
//                 </MDTypography>
//               </MDBox>
//               <MDBox pt={3}>
//                 <DataTable
//                   table={{ columns: pColumns, rows: pRows }}
//                   isSorted={false}
//                   entriesPerPage={false}
//                   showTotalEntries={false}
//                   noEndBorder
//                 />
//               </MDBox>
//             </Card>
//           </Grid> */}
//         </Grid>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default CandidateList
