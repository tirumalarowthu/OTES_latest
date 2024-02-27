import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import BasicLayoutLanding from "layouts/authentication/components/CandidateTestLayout";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const Results = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  const buttonHandler = () => {
    navigate("/");
    toast.info(
      "Your test is submitted! Shortly, you will receive a mail regarding your results and further process.", 
      {
        style: {
          fontSize: '16px', 
        },
      }
    );

    setTimeout(() => {
      window.location.reload();
      localStorage.clear();
    }, 3000); // Delay of 5 seconds (5000 milliseconds)
  };

  return (
    <BasicLayoutLanding >
      <MDBox style={{ marginTop: "90px" }}>
        <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize" mt={2} mb={1}>
          "Thank you for taking the test. Good luck!"
        </MDTypography>
        <br />
        <MDButton
          onClick={buttonHandler}
          variant="gradient" color="info"
        >
          Click here to finish
        </MDButton>
      </MDBox>
    </BasicLayoutLanding >
  );
};

export default Results;
