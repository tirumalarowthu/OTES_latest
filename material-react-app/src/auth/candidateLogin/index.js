import { useContext, useState } from "react";

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayoutLanding from "layouts/authentication/components/BasicLayoutLanding";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// import AuthService from "services/auth-service"
import { AuthContext } from "context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function CandidateLogin() {
  const authContext = useContext(AuthContext);

  // const [user, setUser] = useState({});
  const [credentialsErros, setCredentialsError] = useState(null);
  // const [rememberMe, setRememberMe] = useState(false);

  const [inputs, setInputs] = useState({
    email: "tes@gmail.com",
    // password: "tes@123",
  });

  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  // const addUserHandler = (newUser) => setUser(newUser);

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("email", JSON.stringify(inputs["email"]));
    axios
      .post(`${process.env.REACT_APP_API_URL}/verify-emails`, inputs)
      .then((res) => { 
        if (res.status === 200) {
          toast.success("Login Successfully")
          navigate("/candidate/instructions");
        } else {
          console.log("Email is not valid");
          // setErrorMessage("Email not registered");
        }
      })
      .catch((error) => {
        // setErrorMessage(error.response.data.status);
        toast.warning(error.response.data.status)
      });
  };
  // const submitHandler = async (e) => {
  //   // check rememeber me?
  //   e.preventDefault();

  //   const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //   if (inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat)) {
  //     setErrors({ ...errors, emailError: true });
  //     return;
  //   }

  //   if (inputs.password.trim().length < 6) {
  //     setErrors({ ...errors, passwordError: true });
  //     return;
  //   }

  //   // const newUser = { email: inputs.email, password: inputs.password };
  //   // addUserHandler(newUser);

  //   // const myData = {
  //   //   data: {
  //   //     type: "token",
  //   //     attributes: { ...newUser },
  //   //   },
  //   // };

  //   try {
  //     // const response = await AuthService.login(myData);
  //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/loginEvaluator`, inputs)
  //     // console.log(response.data)

  //     localStorage.setItem('eval_info',JSON.stringify(response.data))
  //     console.log(localStorage.getItem("eval_info"))
  //     authContext.login(response.access_token, response.refresh_token);
  //   } catch (res) {
  //     if (res.hasOwnProperty("message")) {
  //       setCredentialsError(res.message);
  //     } else {
  //       setCredentialsError(res.errors[0].detail);
  //     }
  //   }

  //   return () => {
  //     setInputs({
  //       email: "",
  //       password: "",
  //     });

  //     setErrors({
  //       emailError: false,
  //       passwordError: false,
  //     });
  //   };
  // };

  return (
    <BasicLayoutLanding image={bgImage} >
      <Card
      sx={{
        marginTop: '50px',
      }}
      >
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
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Candidate Login
          </MDTypography>
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
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
            <MDBox>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={inputs.email}
                name="email"
                onChange={changeHandler}
                error={errors.emailError}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Log in
              </MDButton>
            </MDBox>
            {/* <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                name="password"
                value={inputs.password}
                onChange={changeHandler}
                error={errors.passwordError}
              />
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
 
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayoutLanding>
  );
}

export default CandidateLogin;
