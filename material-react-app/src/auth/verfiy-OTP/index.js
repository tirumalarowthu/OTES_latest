import { useEffect, useState } from "react";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import AuthService from "services/auth-service";
import OTPInput from "otp-input-react";

// for the reset I should take from the url the token sent and the email
const verifyOTP = () => {
    // const [OTP,setOTP] = useState("")
    const [loading,setLoading] =useState(false)
    const navigate= useNavigate()
  const [notification, setNotification] = useState(false);

  const [inputs, setInputs] = useState({
    OTP: "",
  });

  const [errors, setErrors] = useState({
    OTPError: false,
    confirmationError: false,
    error: false,
    textError: "",
  });

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  

   const handleSubmitOtp = (e) => {
        e.preventDefault()
        if (inputs.OTP !== null && inputs.OTP.length === 6) {
            setLoading(true)

            //Compare OTP :
            const sendOTP = localStorage.getItem('otp') || null
            console.log(sendOTP)
            if (inputs.OTP === sendOTP) {
                // toast.success("OTP has been Verified Successfully.")
            setNotification(true)
                alert("OTP has been Verified Successfully.")
                navigate("/auth/reset-password")
            } else {
                // toast.warning("Please enter a valid OTP.")
                alert("Please enter a valid OTP.")
                setLoading(false)
            }

        }
    }

  return (
    <CoverLayout image={bgImage}>
         {notification && (
        <MDAlert color="info" mt="20px" dismissible>
          <MDTypography variant="body2" color="white">
            Your OTP has been verfied successful. 
            {/* Go back to
            <MDTypography
              component={Link}
              to="/auth/login"
              variant="body2"
              fontWeight="medium"
              color="white"
            >
              &nbsp;login&nbsp;
            </MDTypography>
            to authenticate. */}
          </MDTypography>
        </MDAlert>
      )}
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Verify OTP
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your new OTP and its confirmation for update
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={handleSubmitOtp}>
            <MDBox mb={2}>
              <MDInput
                type="number"
                label="Enter OTP"
                variant="standard"
                fullWidth
                name="OTP"
                value={inputs.OTP}
                onChange={changeHandler}
                error={errors.OTPError}
              />
            </MDBox>
          
            {/* <OTPInput  value={OTP} secure={false} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} /> */}

            {errors.error && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                {errors.textError}
              </MDTypography>
            )}

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Verify
              </MDButton>
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
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
     
    </CoverLayout>
  );
};

export default verifyOTP;


// useEffect(() => {
//     // get the token and email sent in the url
//     const queryParams = new URLSearchParams(window.location.search);
//     setToken(queryParams.get("token"));
//     setEmail(queryParams.get("email"));
//   }, []);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (inputs.OTP.trim().length < 6) {
//       setErrors({ ...errors, OTPError: true });
//       return;
//     }

//     if (inputs.OTP_confirmation.trim() !== inputs.OTP.trim()) {
//       setErrors({ ...errors, confirmationError: true });
//       return;
//     }

//     const formData = {
//       OTP: inputs.OTP,
//       OTP_confirmation: inputs.OTP_confirmation,
//       email: email,
//       token: token,
//     };

//     const myData = {
//       data: {
//         type: "OTP-reset",
//         attributes: { ...formData },
//       },
//     };

//     try {
//       const response = await AuthService.resetOTP(myData);

//       setInputs({
//         OTP: "",
//         OTP_confirmation: "",
//       });

//       setErrors({
//         OTPError: false,
//         confirmationError: false,
//         error: false,
//         textError: "",
//       });

//       if (errors.OTPError === false && errors.confirmationError === false) {
//         setNotification(true);
//       }
//     } catch (err) {
//       if (err.hasOwnProperty("errors")) {
//         setErrors({ ...errors, error: true, textError: err.errors.OTP[0] });
//       }
//       return null;
//     }
//   };
