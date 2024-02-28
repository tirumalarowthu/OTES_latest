import { useState, useEffect } from "react";
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
import bgImage from "assets/images/bg-reset-cover.jpeg";
import authService from "services/auth-service";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [isDemo, setIsDemo] = useState(false);
  const [loading,setLoading]= useState(false)
  const [notification, setNotification] = useState(false);
  const navigate = useNavigate()
  const [input, setEmail] = useState({
    email: "",
  });
  const [error, setError] = useState({
    err: false,
    textError: "",
  });


  const changeHandler = (e) => {
    setEmail({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (input.email.trim().length === 0 || !input.email.trim().match(mailFormat)) {
      setError({ err: true, textError: "The email must be valid" });
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/otp/send/${input.email}`)
      console.log(response)
      if (response.status === 200 &&response.data&&response.data.gen_otp && response.data.gen_otp.length===6) {
        console.log(response)
        localStorage.setItem('otp', response.data.gen_otp)
        localStorage.setItem('userEmail',input.email)
        setNotification(true);
        navigate("/auth/verify-OTP")
      }else{
        setLoading(false)
        setError({ err: true, textError: "Something went wrong!" });
      }

      setError({ err: false, textError: "" });
    } catch (err) {
      console.error(err);
     
      if (err.hasOwnProperty("errors")) {
        if (err.errors.hasOwnProperty("email")) {
          setError({ err: true, textError: err.errors.email[0] });
        } else {
          setError({ err: true, textError: "An error occured" });
        }
      }
      setLoading(false)
      return null;
    }
  };

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      {notification && (
        <MDAlert color="info" mt="20px" dismissible>
          <MDTypography variant="body2" color="white">
            {isDemo
              ? "You can't update the password in the demo version"
              : "Please check your email to reset your password."}
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
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Forgot Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={handleSubmit}>
            <MDBox mb={4}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                value={input.email}
                name="email"
                onChange={changeHandler}
                error={error.err}
              />
            </MDBox>
            {error.err && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                {error.textError}
              </MDTypography>
            )}
            <MDBox mt={6} mb={1}>
              {
                loading ? <MDButton variant="gradient" disabled color="warning" fullWidth type="submit">
                Sending OTP...
              </MDButton>:  <MDButton variant="gradient" color="info" fullWidth type="submit">
                Send OTP
              </MDButton>
              }
             
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>

    </CoverLayout>
  );
}

export default ForgotPassword;


 // somthing not right with the data
    // const myData = {
    //   data: {
    //     type: "password-forgot",
    //     attributes: {
    //       redirect_url: `${process.env.REACT_APP_URL}/auth/reset-password`,
    //       ...input,
    //     },
    //   },
    // };