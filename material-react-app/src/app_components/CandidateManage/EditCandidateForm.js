import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// react-router-dom components
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Table, Button, Modal, Form} from "react-bootstrap";
import { Select, MenuItem, InputLabel, FormControl, Divider } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


// import { MenuItem, Select } from '@material-ui/core';

// Authentication layout components
import BasicLayoutEditForm from "app_components/CandidateManage/DashboardNav";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import AuthService from "services/auth-service";
import { AuthContext } from "context";
import axios from "axios";
import { Cabin } from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';



function EditCandidateForm() {
  const authContext = useContext(AuthContext);
  const { email } = useParams();
  // const [candidateList, setCandidateList] = useState([]);
  // const [candidateItem, setCandidateItem] = useState({})
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/get/candidate/${email}`);
            // console.log('Response:', response.data);
            setInputs(response.data)
            setLoading(false)
            // setCandidateList(response.data);

        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    fetchData();
}, []);

// useEffect(() => {
//     const candidate = candidateList.find(candidate => candidate._id === _id);
//     if (candidate) {
//         setInputs(candidate);
//         // console.log(candidate);
//     }
// }, [candidateList, _id]);

    const handleEditModalClose = () => {
        // Redirect to a new page
        navigate('/Candidate-List');
    };

  // const [user, setUser] = useState({});
  const [credentialsErros, setCredentialsError] = useState(null);
//   const [rememberMe, setRememberMe] = useState(false);

//   const [inputs, setInputs] = useState({
//     // email: "tes@gmail.com",
//     // password: "tes@123",
//   });

  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  // const addUserHandler = (newUser) => setUser(newUser);

//   const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    // console.log(inputs)
  };
  const handleEditForm = async (event) => {
    console.log(inputs)
    event.preventDefault();
    if (inputs.result === "On Hold") {
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/updateTestResult/${inputs.email}`, { result: result })
        
      } catch (err) {
        console.log(err.message)
        alert('Failed to update the result. Please update the result again')
      }
    }
    try {
      console.log(inputs._id,"input")
      await axios.put(`${process.env.REACT_APP_API_URL}/edit/${inputs._id}`, inputs);
    
      navigate('/Candidate-List');
    
    } catch (error) {
      console.log(error);
    }
  };

  console.log(inputs.testStatus)
  console.log(inputs,"inputs")
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* <Divider/> */}
      {
          loading ? <MDBox align="center" variant="h6" mb={2} ml={4} mt={3}>
          <CircularProgress color='black' size={30} mt={3} /></MDBox> : <Grid container spacing={6}>
      <Grid item xs={12} sx={{marginTop: '30px'}}>
      <Card style={{width:'60%', margin: '0px auto'}}>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            Edit Candidate Data
          </MDTypography>
         
        </MDBox>
        <MDBox pt={1} pb={3} px={3} >
          <MDBox component="form" role="form" method="POST" onSubmit={handleEditForm}>
          <MDBox mb={1} sx={{ display: "flex", alignItems: "flex-start",  flexDirection: "column", }}>
            <MDTypography component="label" variant="h6" color="" htmlFor="nameInput">
                Name
            </MDTypography>
            <MDInput
                type="text"
                fullWidth
                value={inputs.name}
                id="nameInput"
                name="name"
                onChange={changeHandler}
                error={errors.emailError}
            />
            </MDBox>

            <MDBox mb={2} sx={{ display: "flex", alignItems: "flex-start",  flexDirection: "column", }}>
            <MDTypography component="label" variant="h6" color="" htmlFor="nameInput">
                Email
            </MDTypography>
              <MDInput
                type="email"
                label=""
                fullWidth
                value={inputs.email}
                name="email"
                onChange={changeHandler}
                error={errors.emailError}
                disabled={
                  inputs.testStatus === "Evaluated" || inputs.testStatus === "Test Taken"}
              />
            </MDBox>
            <FormControl sx={{ display: "flex", alignItems: "flex-start",  flexDirection: "column", }}>
            <MDTypography component="label" variant="h6" color="" htmlFor="nameInput">
                Test Status
            </MDTypography>
            <Select
              style={{ width: '100%', height: '40px', textAlign: "start" }}
              label=""
              labelId="test-status-label"
              id="test-status-select"
              value={inputs.testStatus || "Select Status"}
              onChange={(event) => {
                  setInputs({
                      ...inputs,
                      testStatus: event.target.value,
                  });
              }}
              disabled={inputs.testStatus === "Test Taken" || inputs.testStatus === "Evaluated"}
              IconComponent={() => <ArrowDropDownIcon style={{ marginRight: '10px' }}/>}
          >
              {/* <MenuItem value="">Select Status</MenuItem> */}
              {inputs.testStatus === "Test Not Taken" ? (
                  <MenuItem value="Test Cancelled">Cancel Test</MenuItem>
              ) : null}
              {inputs.testStatus === "Test Cancelled" ? (
                  <MenuItem value="Test Not Taken">Test Not Taken</MenuItem>
              ) : null}
              {inputs.testStatus === "Evaluated" ? (
                <MenuItem value = "Evaluated"> Evaluated</MenuItem>
              ): null}
              {inputs.testStatus === "Test Taken" ? (
                <MenuItem value = "Test Taken"> Test Taken</MenuItem>
              ): null}
              {inputs.testStatus && inputs.testStatus !== "Test Taken" && inputs.testStatus !== "Evaluated" ? (
                  <MenuItem value={inputs.testStatus}>{inputs.testStatus}</MenuItem>
              ) : null}
          </Select>
            </FormControl>
            <FormControl sx={{ display: "flex", alignItems: "flex-start",  flexDirection: "column", }}>
            <MDTypography component="label" variant="h6" color="" htmlFor="nameInput">
                Area
            </MDTypography>
            <Select
                style={{ width: '100%', height: '40px', textAlign: "start" }}
                label=""
                labelId="test-status-label"
                id="test-status-select"
                value={inputs.area || "Select Area"}
                error={errors.areaError}
                onChange={(event) => {
                    setInputs({
                        ...inputs,
                        area: event.target.value,
                    });
                }}
                disabled
            >
                {/* {inputs.testStatus === "Test Not Taken" && (
                    <>
                        <MenuItem value="VLSI_FRESHER_1">VLSI_FRESHER_1</MenuItem>
                        <MenuItem value="VLSI_FRESHER_2">VLSI_FRESHER_2</MenuItem>
                        <MenuItem value="VLSI_FRESHER_3">VLSI_FRESHER_3</MenuItem>
                        <MenuItem value="VLSI">VLSI</MenuItem>
                        <MenuItem value="EMBEDDED">EMBEDDED</MenuItem>
                        <MenuItem value="Software">SOFTWARE</MenuItem>
                    </>
                )} */}
                {inputs.testStatus === "Test Not Taken" && (
                    <MenuItem value={inputs.area}>{inputs.area}</MenuItem>
                )}
                {inputs.testStatus === "Evaluated" && (
                    <MenuItem value={inputs.area}>{inputs.area}</MenuItem>
                )}
                {inputs.testStatus === "Test Taken" && (
                    <MenuItem value={inputs.area}>{inputs.area}</MenuItem>
                )}
                {inputs.testStatus === "Test Cancelled" && (
                    <MenuItem value={inputs.area}>{inputs.area}</MenuItem>
                )}
            </Select>

            </FormControl>
            
            
            
            <MDBox mt={4} mb={1}>
                <MDButton
                    style={{ marginRight: '10px' }}
                    variant="gradient"
                    color="info"
                    onClick={handleEditModalClose}
                >
                    Close
                </MDButton>
                <MDButton
                    variant="gradient"
                    color="success"
                    type="submit"
                    sx={{ backgroundColor: 'green' }}
                >
                    Save Changes
                </MDButton>
            </MDBox>

          </MDBox>
        </MDBox>
      </Card>
      </Grid>
      </Grid>}
      <Footer />
    </DashboardLayout>
  );
}

export default EditCandidateForm;

// await axios.put(`http://13.233.161.128/appicant/update/comments`, { email: inputs.email, comment: `The applicant's test result has been updated from On Hold to <b> ${result} </b>`, commentBy: "TES System", cRound: "Online Assessment Test", nextRound: "Veera", status: "Hiring Manager" })
        // window.location.reload()
//   const index = candidateList.findIndex((candidateItem) => {
    //     // console.log('candidateItem:', candidateItem);
    //     return candidateItem._id === inputs._id;
    //   });
    //   const updatedCandidates = [...candidateList];
    // //   console.log(updatedCandidates)
    //   updatedCandidates[index].name = inputs.name;
    //   updatedCandidates[index].email = inputs.email;
    // //   updatedCandidates[index].testStatus = testStatus;
    //   updatedCandidates[index].area = inputs.area;
    //   updatedCandidates[index].mcqCount = inputs.mcqCount;
    //   updatedCandidates[index].codeCount = inputs.codeCount;
    //   updatedCandidates[index].paragraphCount = inputs.paragraphCount;
    //   setInputs(updatedCandidates);
    //   setShowEditModal(false);
      // window.location.reload();
 {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}

 {/* <MDBox mb={2}>
            <Select
                value={inputs.testStatus}
                onChange={(event) => {
                inputs({
                    ...inputs,
                    testStatus: event.target.value,
                });
                }}
                disabled={
                inputs.testStatus === "Test Taken" ||
                inputs.testStatus === "Evaluated"
                }
            >
                <MenuItem value="">Select status</MenuItem>
                <MenuItem value="Test Cancelled">Cancel Test</MenuItem>
                <MenuItem value="Test Not Taken">Test Not Taken</MenuItem>
            </Select>
            </MDBox> */}

            
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}

            {/* {credentialsErros && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                {credentialsErros}
              </MDTypography>
            )} */}
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Forgot your password? Reset it{" "}
                <MDTypography
                  component={Link}
                  to="/auth/forgot-password"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  here
                </MDTypography>
              </MDTypography>
            </MDBox> */}
            {/* <MDBox mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/auth/register"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
//   const submitHandler = async (e) => {
//     // check rememeber me?
//     e.preventDefault();

//     const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//     if (inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat)) {
//       setErrors({ ...errors, emailError: true });
//       return;
//     }

//     if (inputs.password.trim().length < 6) {
//       setErrors({ ...errors, passwordError: true });
//       return;
//     }

//     // const newUser = { email: inputs.email, password: inputs.password };
//     // addUserHandler(newUser);

//     // const myData = {
//     //   data: {
//     //     type: "token",
//     //     attributes: { ...newUser },
//     //   },
//     // };

//     try {
//       // const response = await AuthService.login(myData);
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/loginEvaluator`, inputs)
//       authContext.login(response.access_token, response.refresh_token);
//     } catch (res) {
//       if (res.hasOwnProperty("message")) {
//         setCredentialsError(res.message);
//       } else {
//         setCredentialsError(res.errors[0].detail);
//       }
//     }

//     return () => {
//       setInputs({
//         email: inputs.name,
//         password: "",
//       });

//       setErrors({
//         emailError: false,
//         passwordError: false,
//       });
//     };
//   };
  

  
//   const handleEditModalClose = (item) => {
//     // console.log(item)
//   }


{/* <FormControl sx={{ display: "flex", alignItems: "flex-start",  flexDirection: "column", }}>
                <MDTypography component="label" variant="body2" color="text" htmlFor="nameInput">
                    Result
                </MDTypography>
                <Select
                    style={{ width: '100%', height: '40px', textAlign:"start"}}
                    label = ""
                    labelId="test-status-label"
                    // readOnly
                    id="test-status-select"
                    value={inputs.result || "Select Area"}
                    error={errors.areaError}
                    onChange={(event) => {
                    setInputs({
                        ...inputs,
                        result: event.target.value,
                    });
                    }}
                    disabled={
                      inputs.result === "Pass" ||
                      inputs.result === "Fail"
                    }
                    
                >
                    <MenuItem value="On Hold">ON HOlD</MenuItem>
                    <MenuItem value="Pass">PASS</MenuItem>
                    <MenuItem value="Fail">FAIL</MenuItem>
                </Select>
            </FormControl> */}
            {/* <MDBox mb={2} sx={{ display: "flex", alignItems: "flex-start",  flexDirection: "column", }}>
            <MDTypography component="label" variant="body2" color="text" htmlFor="nameInput">
                Area
            </MDTypography>
                <MDInput
                    type="text"
                    label=""
                    fullWidth
                    // defaultValue=""
                    value={inputs.area}
                    name="area"
                    onChange={changeHandler}
                    error={errors.areaError}
                />
            </MDBox> */}
            {/* <MDBox>
              {inputs.result === "On Hold" && (
              <FormControl>
                <InputLabel>Result</InputLabel>
                <Select
                  value={inputs.result}
                  onChange={(e) => setInputs(e.target.value)}
                >
                  <MenuItem value="On Hold">On Hold</MenuItem>
                  <MenuItem value="Pass">Pass</MenuItem>
                  <MenuItem value="Fail">Fail</MenuItem>
                </Select>
              </FormControl>
            )}
            </MDBox> */}