import { React, useEffect } from "react";
import { useNavigate } from "react-router";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import BasicLayoutLanding from "layouts/authentication/components/CandidateTestLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Divider } from "@mui/material";
import MDButton from "components/MDButton";


const Instructions = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the localStorage data related to the assessment
    localStorage.removeItem("mcqquestions");
    localStorage.removeItem("selectedAnswers");
    localStorage.removeItem("hasFetched");
  }, []);

  const handleStart = () => {
    navigate("/getMCQQuestionsForTest");
  };

  return (
    <BasicLayoutLanding image={bgImage} >
      <Card
      sx={{
        marginTop: '30px',
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
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            Instructions
          </MDTypography>
        </MDBox>
        <MDBox ml={5} mt={2}>
        <MDTypography variant="h5" fontSize='16px' textTransform="capitalize" textAlign='start'>
            Dear Candidate, 
          </MDTypography>
          <MDTypography ml={5} textAlign='start' component="div" fontSize='16px' variant="button" color="text" fontWeight="regular">
            Please go through the Test Master instructions before you commence the test.
          </MDTypography>
        </MDBox>
        <MDBox display="flex" py={1} pr={2} pl={5} mt={1} >
          <MDTypography variant="button" fontSize='16px' fontWeight="bold" textTransform="capitalize">
          Use a reliable internet connection: &nbsp;
          </MDTypography>
          <MDTypography variant="button" fontSize='16px' fontWeight="regular" color="text">
            Make sure you have a
              reliable internet connection and that your device is charged or
              plugged in.
          </MDTypography>
        </MDBox>
        <MDBox display="flex" py={1} pr={2} pl={5} >
          <MDTypography variant="button" fontSize='16px' fontWeight="bold" textTransform="capitalize">
          Use a quiet environment: &nbsp;
          </MDTypography>
          <MDTypography variant="button" fontSize='16px' fontWeight="regular" color="text">
          Choose a quiet place to take the test where you won't be disturbed.
          </MDTypography>
        </MDBox>
        <MDBox display="flex" py={1} pr={2} pl={5}  >
          <MDTypography variant="button" fontSize='16px' fontWeight="bold" textTransform="capitalize">
          Use an appropriate device: &nbsp;
          </MDTypography>
          <MDTypography variant="button" fontSize='16px' fontWeight="regular" color="text">
            Make sure you have a
              reliable internet connection and that your device is charged or
              plugged in.
          </MDTypography>
        </MDBox>
        <MDBox display="flex" py={1} pr={2} pl={5} >
          <MDTypography variant="button" fontSize='16px' fontWeight="bold" textTransform="capitalize">
          Keep track of time: &nbsp;
          </MDTypography>
          <MDTypography variant="button" fontSize='16px' fontWeight="regular" color="text">
          Make sure to keep track of time and pace yourself throughout the test.
          </MDTypography>
        </MDBox>
        <MDBox display="flex" py={1} pr={2} pl={5} >
          <MDTypography variant="button" fontSize='16px' fontWeight="bold" textTransform="capitalize">
          Answer all questions: &nbsp;
          </MDTypography>
          <MDTypography variant="button" fontSize='16px' fontWeight="regular" color="text">
          Make sure to keep track of time and pace yourself throughout the test.
          </MDTypography>
        </MDBox>
        {/* <MDBox display="flex" py={1} pr={2} pl={5} >
          <MDTypography variant="button" fontSize='16px' fontWeight="bold" textTransform="capitalize">
          Keep track of time: &nbsp;
          </MDTypography>
          <MDTypography variant="button" fontSize='16px' fontWeight="regular" color="text">
          Make sure to keep track of time and pace yourself throughout the test.
          </MDTypography>
        </MDBox> */}
        <MDBox display="flex" py={1} pr={2} pl={5} >
          <MDTypography variant="button" fontSize='16px' fontWeight="bold" textTransform="capitalize">
          Don't cheat: &nbsp;
          </MDTypography>
          <MDTypography variant="button" fontSize='16px' fontWeight="regular" color="text">
          Do not cheat or attempt to cheat in any way.
              This is a test of your abilities and cheating will only hurt your
              results.
          </MDTypography>
        </MDBox>
        <MDBox display="flex" py={1} pr={2} pl={5} >
          <MDTypography variant="button" fontSize='16px' fontWeight="bold" textTransform="capitalize">
          Contact support if needed: &nbsp;
          </MDTypography>
          <MDTypography variant="button" fontSize='16px' fontWeight="regular" color="text">
          Do not cheat in any way.
              This is a test of your abilities and cheating will only hurt your
              results.
          </MDTypography>
        </MDBox>
        <MDBox pt={1} pb={3} px={3}>
          <MDBox component="form" role="form" method="POST" >
            <MDBox mt={4} mb={1} >
              <MDButton variant="gradient" color="info"  type="submit" onClick={handleStart}>
                Take Test
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    {/* <Card> */}
      {/* <MDTypography className="d-flex justify-content-center align-items-center vh-100"> */}
      {/* <MDBox pt={6} pb={3}>
        <MDTypography className="text-center">
        <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <MDTypography variant="h6" color="white">
                  Candidate List Table
                </MDTypography>

        </MDBox>
          <MDTypography>Test Instructions</MDTypography>
          <Divider/>
          <ul className="list-unstyled">
            <li className="mb-4">
              <b>Use a reliable internet connection:</b> Make sure you have a
              reliable internet connection and that your device is charged or
              plugged in.
            </li>
            <li className="mb-4">
              <b>Use a quiet environment:</b> Choose a quiet place to take the
              test where you won't be disturbed.
            </li>
            <li className="mb-4">
              <b>Use an appropriate device:</b>Use a desktop or laptop computer
              with a large screen if possible. Mobile devices or tablets may not
              be suitable for all types of tests.
            </li>
            <li className="mb-4">
              <b>Keep track of time:</b> Make sure to keep track of time and
              pace yourself throughout the test.
            </li>
            <li className="mb-4">
              <b>Answer all questions:</b> Try to answer all questions to the
              best of your ability. If you are unsure of an answer, make your
              best guess.
            </li>
            <li className="mb-4">
              <b>Don't cheat:</b> Do not cheat or attempt to cheat in any way.
              This is a test of your abilities and cheating will only hurt your
              results.
            </li>
            <li className="mb-4">
              <b>Contact support if needed:</b> If you encounter any technical
              difficulties or have questions during the test, contact the
              support team for assistance.
            </li>
          </ul>
          <button
            className="btn"
            style={{
              backgroundColor: "#544CA4",
              fontFamily: "fantasy",
              marginLeft: "3px",
            }}
          >
            Start
          </button>
        </MDTypography>
      </MDBox> */}
    {/* </Card> */}
    </BasicLayoutLanding>
  );
};

export default Instructions;
