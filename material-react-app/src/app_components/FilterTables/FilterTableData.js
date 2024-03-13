/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components 
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/avatar.webp";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { object } from "prop-types";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";



export default function data() {
  const [candidateList, setCandidateList] = useState([]);
  const eval_email = location.state?.email;
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true)
  const {f_option_value} = useParams()

  const handleEvaluateCandidate = (item) => {
    console.log(item.email,"email")

    if (item.testStatus === "Test Not Taken" || item.testStatus === "Test Cancelled") {
      toast.warn(`${item.testStatus}. Evaluation cannot be performed.`, 
      {
        style: {
          fontSize: '16px', 
        },
      }
    )
      navigate('/Candidate-List')
      return;
    }
    const state = { email: item.email, testStatus: item.testStatus, result: item.result, area:item.area };
    // console.log(state)
    navigate(`/Candidate-List/EvalQuestions/${item.email}`, { state });
  };


  useEffect(() => {  
    getCandidateList();
  }, []);

  const getCandidateList = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get/candidates?filter=testStatus:${f_option_value.replace(/_/g, " ")}`);
        console.log(response.data.results)
        const list = response.data.results
        const emailList = list.map(list1 => list1.email).join(",");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/getTestResults?emails=${emailList}`);
        const testResultsMap = new Map(res.data.map(result => [result.email, result]));
        const updatedCandidates = list.map(list1 => {
            const testResult = testResultsMap.get(list1.email);
            if (testResult && testResult.totalScore !== undefined) {
                const selectedAnswers = testResult.selectedAnswers;
                // // console.log(selectedAnswers)
                const totalQuestions = Object.keys(selectedAnswers).length;
                console.log(totalQuestions)
                return {
                    ...list1,
                    totalScore: testResult.totalScore,
                    total: totalQuestions
                };
            } else {
                return list1;
            }
        });
        setLoading(false)
        setCandidateList(updatedCandidates);
        // console.log(updatedCandidates[1].totalScore)

        const formatedTableData = response.data.results.map((item,index) => 
        { 
          return  {
              s_no : <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                      {index+1}
                    </MDTypography>,
              name: <Author image={team4} name={item.name} email={item.email} />,
              area: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                  {item.area}
                </MDTypography>
              ),
              status: (
                  <MDBox ml={-1}>
                    <MDTypography component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium">{item.testStatus}</MDTypography>
                      {/* {item.testStatus === 'Evaluated' ? (
                          <MDBadge badgeContent={item.testStatus} color="" variant="gradient" size="sm" />
                      ) : (
                          <MDBadge badgeContent={item.testStatus} color="" variant="gradient" size="sm" />
                      )} */}
                  </MDBox>
              ),
              Marks: (
                <MDTypography
                component="a"
                href="#"
                variant="caption"
                color="text"
                fontWeight="medium"
              >
                { item.testStatus === "Evaluated" ? (
                  `${updatedCandidates[index].totalScore}/${updatedCandidates[index].total}`
                ) : (
                  ""
                )}
              </MDTypography>
              
              ),
              action: (
                <>
                  <MDTypography style={{ display:"flex"}}>
                      <MDBox key={item.id}
                          style ={{
                          cursor: "pointer"
                          }} 
                          ml={-1}>
                          
                          <Link to={{ pathname: `/Candidate-List/Edit/${item.email}`, state: { item }}}  >
                              <MDBadge sx={{textDecoration: 'underline', color:'#FFFFFF'}}  badgeContent="Edit" color="info" variant="gradient" size="sm" />
                          </Link>
                      </MDBox>
                     
                        <MDBox key={item.id}
                        onClick={(e) => 
                            handleEvaluateCandidate(item)
                        }
                        style ={{cursor: "pointer"}} ml={0}>
                          {  item.testStatus === "Evaluated" ?
                            <MDBadge sx={{textDecoration: 'underline', color:'#FFFFFF'}} badgeContent={item.testStatus === "Evaluated" ?"Re-Evaluate":"Evaluate"} color={item.testStatus === "Evaluated" ?"primary" :"secondary"} variant="gradient" size="sm" /> :
                            <MDBadge  sx={{textDecoration: item.testStatus === "Test Taken"?'underline':"", color:'#FFFFFF'}}  badgeContent={item.testStatus === "Test Not Taken" ?"Evaluate":"Evaluate"} disabled color={item.testStatus === "Test Not Taken" ?"warning" :"secondary"} variant="gradient" size="sm" /> 

                          }

                    </MDBox>
                                                  
                  </MDTypography>
                </>
              ),
              Result: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                  {item.result}
                </MDTypography>
              )
            }
      }
      
  
  )

        setCandidateList(formatedTableData);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const customizeColumns = (role) => {
   let columns = [
      { Header: "S.No", accessor: "s_no", align: "left", width: "10%" },
      { Header: "Name", accessor: "name", width: "30%", align: "left" },
    //   { Header: "Email", accessor: "email", align: "left" },
      { Header: "Area", accessor: "area", align: "left" },
      { Header: "Status", accessor: "status", align: "left" },
      // { Header: "Registered ", accessor: "registered_date", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
      { Header: "Marks", accessor: "Marks", align: "center" },
      { Header: "Result", accessor: "Result", align: "center" },
    ]
    switch (role) {
      case "Test Not Taken":
        // Remove the "Marks" and "Result" columns
        return columns.filter((col) => col.accessor !== "Marks" && col.accessor !== "Result");
      case "Evaluated":
        return [
          ...columns,
          // { Header: "Marks", accessor: "Marks", align: "center" },
          // { Header: "Result", accessor: "Result", align: "center" },
        ]; 
      case "Test Taken":
        return columns.filter((col) => col.accessor !== "Marks" && col.accessor !== "Result");
      case "Test Cancelled":
        return columns.filter((col) => col.accessor !== "Marks" && col.accessor !== "Result");
      default:
        return columns;
    }
  };
//   console.log(candidateList)
  return {
    
    columns: customizeColumns(f_option_value.replace(/_/g, " ")),

    rows: candidateList,
    loading,
  };
}

////code above okay////////
// const serverdata = [
//     {
//       author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
//       function: <Job title="Executive" description="Projects" />,
//       status: (
//         <MDBox ml={-1}>
//           <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
//         </MDBox>
//       ),
//       employed: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           19/09/17
//         </MDTypography>
//       ),
//       action: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           Edit
//         </MDTypography>
//       ),
//     },
//     {
//       author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
//       function: <Job title="Programator" description="Developer" />,
//       status: (
//         <MDBox ml={-1}>
//           <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
//         </MDBox>
//       ),
//       employed: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           24/12/08
//         </MDTypography>
//       ),
//       action: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           Edit
//         </MDTypography>
//       ),
//     },
//     {
//       author: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
//       function: <Job title="Manager" description="Executive" />,
//       status: (
//         <MDBox ml={-1}>
//           <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
//         </MDBox>
//       ),
//       employed: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           04/10/21
//         </MDTypography>
//       ),
//       action: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           Edit
//         </MDTypography>
//       ),
//     },
//     {
//       author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
//       function: <Job title="Programator" description="Developer" />,
//       status: (
//         <MDBox ml={-1}>
//           <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
//         </MDBox>
//       ),
//       employed: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           14/09/20
//         </MDTypography>
//       ),
//       action: (
//         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//           Edit
//         </MDTypography>
//       ),
//     },
//   ]
  // const filterdata = serverdata.map((item) =>
  //       {
  //           return  {
  //               author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
  //               function: <Job title="Programator" description="Developer" />,
  //               status: (
  //                 <MDBox ml={-1}>
  //                   <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
  //                 </MDBox>
  //               ),
  //               employed: (
  //                 <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
  //                   14/09/20
  //                 </MDTypography>
  //               ),
  //               action: (
  //                 <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
  //                   Edit
  //                 </MDTypography>
  //               ),
  //             }
  //       }
  
  // )
  // const Job = ({ title, description }) => (
  //   <MDBox lineHeight={1} textAlign="left">
  //     <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
  //       {title}
  //     </MDTypography>
  //     <MDTypography variant="caption">{description}</MDTypography>
  //   </MDBox>
  // );

  



// // Material Dashboard 2 React components 
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDBadge from "components/MDBadge";

// // Images
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/avatar.webp";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
 
// export default function data() {
//   const [pendingApprovals, setPendingApprovals] = useState([]);
//   const [loading,setLoading] = useState(true)

//   //for handling pending approvals : 
//   const handleApprovals = async (id, decide, name) => {
//     const confirmMessage = decide
//       ? `Do you want to allow ${name} to write online test ?`
//       : `Do you want to reject ${name}? And also permanently delete ${name}`;
//     if (window.confirm(confirmMessage)) {
//       try {
//         await axios.patch(`${process.env.REACT_APP_API_URL}/confirm/approval/${id}/${decide}`);
//         window.location.reload(false);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   useEffect(() => { 
//     getPendingApprovals();
//   }, []);
//   const getPendingApprovals = async () => {
//     try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/get/candidates?Filter=testStatus:Evaluated`);
//         console.log(response.data.results)
//         setLoading(false)
//         const formatedTableData = response.data.results.map((item,index) =>
//         {
//             return  {
//                 s_no : <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//                         {index+1}
//                       </MDTypography>,
//                 name: <Author image={team4} name={item.name} email="" />,
//                 email:( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//                 {item.email}
//               </MDTypography>),
//                 area: (
//                   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//                   {item.area}
//                 </MDTypography>
//                   // <MDBox ml={-1}>
//                   //   <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
//                   // </MDBox>
//                 ),
//                 registered_date_de: (
//                   <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//                     {new Date().toDateString()}
//                   </MDTypography>
//                 ),
//                 action: (
//                   <>
//                    {/* <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
//                     Edit
//                   </MDTypography> */}
//                   <MDTypography
//                     style={{
//                       display:"flex"
//                     }}
//                   >
//                   <MDBox 
//                     onClick={() =>
//                             handleApprovals(item._id, true, item.name)
//                           }
//                     style ={{
//                       cursor: "pointer"
//                     }} 
//                     ml={-1}>
//                     <MDBadge  badgeContent="Approve" color="info" variant="gradient" size="sm" />
//                   </MDBox>
//                   <MDBox 
//                      onClick={() =>
//                       handleApprovals(item._id, false, item.name)
//                       }
//                       style ={{
//                         cursor: "pointer"
//                       }} 
//                       ml={0}>
//                     <MDBadge badgeContent="Reject" color="primary" variant="gradient" size="sm" />
//                   </MDBox>
//                   </MDTypography>
//                   </>
                 
//                 ),
                
//               }
//         }
  
//   )

//     setPendingApprovals(formatedTableData);
//     } catch (error) {
//       console.log(error);
//       setLoading(false)
//     }
//   };
//   const Author = ({ image, name, email }) => (
//     <MDBox display="flex" alignItems="center" lineHeight={1}>
//       {/* <MDAvatar src={image} name={name} size="sm" /> */}
//       <MDBox lineHeight={1}>
//         <MDTypography display="block" variant="button" fontWeight="medium">
//           {name}
//         </MDTypography>
//         <MDTypography variant="caption">{email}</MDTypography>
//       </MDBox>
//     </MDBox>
//   );

  
//   console.log(pendingApprovals)
//   return {
//     columns: [
//       { Header: "S.No", accessor: "s_no", align: "left" },
//       { Header: "Name", accessor: "name", width: "35%", align: "left" },
//       { Header: "Email", accessor: "email", align: "left" },
//       { Header: "Area", accessor: "area", align: "center" },
//       // { Header: "Registered ", accessor: "registered_date", align: "center" },
//       { Header: "Action", accessor: "action", align: "center" },
//     ],

//     rows: pendingApprovals,
//     loading,
//   };
// }
