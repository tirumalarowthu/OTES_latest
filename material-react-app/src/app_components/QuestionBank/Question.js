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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { Divider } from "@mui/material";
import axios from "axios";

function Question({ name, company,area,qnum,c1,c2,c3,c4,questionId,correct_choice, email, vat, noGutter }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  // console.log(c1.includes(correct_choice))
  const handleDeleteQuestion = (questionId) => {
    const confirmMessage = `Do you want to delele following question :  ${name} ?`
    if (window.confirm(confirmMessage)) {
      try {
        axios.delete(`${process.env.REACT_APP_API_URL}/deleteQuestion/${questionId}`)
        alert("Question deleted successfully")
        window.location.reload(false);
      } catch (error) {
        console.log(error);
      }
    }

    axios.delete(`${process.env.REACT_APP_API_URL}/deleteQuestion/${questionId}`)
      .then((response) => {
        console.log(response);
        alert("Question deleted successfully")
        window.location.reload()
        // Handle successful deletion, such as updating the list of questions
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };
  // style={{color:c1.includes(correct_choice) ? 'red':''}}
  function checkAnswer (ans){
    if(ans ==1){
      return "A"
    }else if(ans==2){
      return "B"
    }else if(ans == 3){
      return "C"
    }else if(ans ==4){
      return "D"
    }
    return ans
  }
  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      m={2}
      width="45%"
    //   style={{border:"2px solid red",margin:"2px"}}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        
      <MDBox mb={1} lineHeight={1}>
            <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
              {qnum}) {name}
            </MDTypography>
            <br/>
            <MDTypography  variant="button" fontWeight="light" textTransform="capitalize">
              a) {c1}
            </MDTypography>
            <br/>
            <MDTypography variant="button" fontWeight="light" textTransform="capitalize">
              b) {c2}
            </MDTypography>
            <br/>
            <MDTypography variant="button" fontWeight="light" textTransform="capitalize">
              c) {c3}
            </MDTypography>
            <br/>
            <MDTypography variant="button" fontWeight="light" textTransform="capitalize">
              d) {c4}
            </MDTypography>
        </MDBox>
        
        {/* <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Email Address:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {email}
            </MDTypography>
          </MDTypography>
        </MDBox> */}
        

        <Divider/>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mt={0}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {/* Area : {area} &nbsp; */}
            Correct choice : {checkAnswer(correct_choice)}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox 
            onClick={()=>handleDeleteQuestion(questionId)}
            mr={1}>
              <MDButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox>
            {/* <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>edit</Icon>&nbsp;edit
            </MDButton> */}
          </MDBox>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Question.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Question.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Question;
