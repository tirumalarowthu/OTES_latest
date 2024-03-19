import { useContext, useState } from "react";
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from 'axios';
import { Form } from "react-bootstrap";



// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import AuthService from "services/auth-service";
import { AuthContext } from "context";
import { InputLabel } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function AddCandidate() {
  // const authContext = useContext(AuthContext);
    const [loading,setLoading] = useState(false)
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    area: "Select Area",
    isApproved: true,
  });

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    areaError: false,
    error: false,
    errorText: "",
  });

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate();


  const submitHandler = async (e) => {
      e.preventDefault();
      setLoading(true)
      const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (inputs.name.trim().length === 0) {
      setErrors({ ...errors, nameError: true });
      setLoading(false)
      return;
    }

    if (inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      setLoading(false)
      return;
    }

    if (inputs.area.trim().length < 4) {
      setErrors({ ...errors, areaError: true });
      setLoading(false)
      return;
    } 
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`,inputs)
      if (response && response.data) {
        // console.log(response.data)
        toast.success(`${inputs.name} added successfully`, 
        {
          style: {
            fontSize: '16px', 
          },
        } )
      } 

      setInputs({
        name: "",
        email: "",
        area: "",
      });

      setErrors({
        nameError: false,
        emailError: false,
        areaError: false,
        error: false,
        errorText: "",
      });
      setLoading(false)
    } catch (err) {
      setErrors({ ...errors, error: true, errorText: err.message });
      console.error(err);
      setLoading(false)
    } 
      
    
  };




 
  return (
    <DashboardLayout>
    <DashboardNavbar />
      <Card
      sx={
        {
            margin:"70px auto",
            width:"80%"
        }
      }
      >
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={1}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Add New Candidate
          </MDTypography>
          {/* <MDTypography display="block" variant="button" color="white" mt={1}>
            Enter your name, email and domain to register
          </MDTypography> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
            {/* <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                fullWidth
                name="name"
                value={inputs.name}
                onChange={changeHandler}
                error={errors.nameError}
                inputProps={{
                  autoComplete: "name",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
             
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                value={inputs.email}
                name="email"
                onChange={changeHandler}
                error={errors.emailError}
                inputProps={{
                  autoComplete: "email",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
              
            </MDBox> */}
            
            <MDBox mb={2} >
              <MDInput
                type="text"
                label="Name of the candidate"
                fullWidth
                name="name"
                value={inputs.name}
                onChange={changeHandler}
                error={errors.nameError}
              />
               {errors.nameError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  The name can not be empty
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2} >
              <MDInput
                type="email"
                label="Email of the candidate"
                fullWidth
                value={inputs.email}
                name="email"
                onChange={changeHandler}
                error={errors.emailError}
                inputProps={{
                  autoComplete: "email",
                  form: {
                    autoComplete: "off",
                  },
                }}
              />
              {errors.emailError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  The email must be valid
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
            <Form.Group controlId="questionTypeSelect">
              {/* <Form.Label style={{ fontFamily: "revert-layer", fontWeight: "bold" }}>
                Please Select Your Question Type
              </Form.Label> */}
              <Form.Control
                as="select"
                fullWidth
                name="area"
                value={inputs.area}
                error = {errors.areaError}
                onChange={changeHandler}
                // onChange={(event) => {
                //   setInputs({
                //       ...inputs,
                //       testStatus: event.target.value,
                //   });
                //   }}
                style={{ width: "100%", height: '45px', marginBottom: "0px", border: "1px solid #ced4da", borderRadius: "6px", padding: '10px', color: '#495057' }}
              >
                <option value="">Select Area</option>
                <option value="VLSI_FRESHER_1">VLSI_FRESHER_1</option>
                <option value="VLSI_FRESHER_2">VLSI_FRESHER_2</option>
                {/* <option value="VLSI_FRESHER_3">VLSI_FRESHER_3</option> */}
                <option value="VLSI_FRESHER_1_2">VLSI_FRESHER_1 & VLSI_FRESHER_2</option>
                
                {/* <option value="VLSI">VLSI</option>  */}
                {/* <option value="SOFTWARE">SOFTWARE</option> */}
                {/* <option value="EMBEDDED">EMBEDDED</option> */}
                {/* <option value="TEXT">Paragraph</option> */}
              </Form.Control>
              {errors.areaError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  Please Select Area.
                </MDTypography>
              )}
            </Form.Group>
            {/* <FormSelect
                    style={{ width: '100%', height: '40px', textAlign:"start"}}
                    // label = "Select Area"
                    label="test-status-label"
                    // id="test-status-select"
                    value={inputs.area}
                    name="area"
                >
                    <MenuItem value="">Select Area</MenuItem>
                    <MenuItem value="VLSI">VLSI</MenuItem>
                    <MenuItem value="SOFTWARE">Software</MenuItem>
                    <MenuItem value="EMBEDDED">Embedded</MenuItem>

              </FormSelect> */}
              {/* <MDInput
                type="select"
                label="Area"
                variant="standard"
                fullWidth
                name="area"
                value={inputs.area}
                onChange={changeHandler}
                error={errors.areaError}
              />
              {errors.areaError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  Please select the area !
                </MDTypography>
              )} */}
            </MDBox>
            {/* <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                name="password"
                value={inputs.password}
                onChange={changeHandler}
                error={errors.passwordError}
              />
              {errors.passwordError && (
                <MDTypography variant="caption" color="error" fontWeight="light">
                  The password must be of at least 8 characters
                </MDTypography>
              )}
            </MDBox> */}
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox name="agree" id="agree" onChange={changeHandler} />
              <InputLabel
                variant="standard"
                fontWeight="regular"
                color="text"
                sx={{ lineHeight: "1.5", cursor: "pointer" }}
                htmlFor="agree"
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </InputLabel>
              <MDTypography
                component={Link}
                to="/auth/login"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox> */}
            {/* {errors.agreeError && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                You must agree to the Terms and Conditions
              </MDTypography>
            )}
            {errors.error && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                {errors.errorText}
              </MDTypography>
            )} */}
            <MDBox mt={2} mb={1}>
                {
                    loading ? <MDButton variant="gradient" disabled color="warning" fullWidth type="submit">
                    Adding...
                  </MDButton>: <MDButton variant="gradient" color="info" fullWidth type="submit">
                + Add
              </MDButton>
                }
              
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/auth/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Register
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
      </DashboardLayout>
  );
}

export default AddCandidate;



// const submitHandlerDummy = async (e) => {
//   e.preventDefault();

//   const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//   if (inputs.name.trim().length === 0) {
//     setErrors({ ...errors, nameError: true });
//     return;
//   }

//   if (inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat)) {
//     setErrors({ ...errors, emailError: true });
//     return;
//   }

//   if (inputs.area.trim().length < 4) {
//     setErrors({ ...errors, areaError: true });
//     return;
//   }

//   // if (inputs.password.trim().length < 8) {
//   //   setErrors({ ...errors, passwordError: true });
//   //   return;
//   // }

//   // if (inputs.agree === false) {
//   //   setErrors({ ...errors, agreeError: true });
//   //   return;
//   // }

//   // here will be the post action to add a user to the db
//   const newUser = { name: inputs.name, email: inputs.email, password: inputs.password };

//   const myData = {
//     data: {
//       type: "users",
//       attributes: { ...newUser, password_confirmation: newUser.password },
//       relationships: {
//         roles: {
//           data: [
//             {
//               type: "roles",
//               id: "1",
//             },
//           ],
//         },
//       },
//     },
//   };

//   try {
//     const response = await AuthService.register(myData);
//     // authContext.login(response.access_token, response.refresh_token);

//     setInputs({
//       name: "",
//       email: "",
//       area: "",
//     });

//     setErrors({
//       nameError: false,
//       emailError: false,
//       areaError: false,
//       error: false,
//       errorText: "",
//     });
//   } catch (err) {
//     setErrors({ ...errors, error: true, errorText: err.message });
//     console.error(err);
//   }
// };
