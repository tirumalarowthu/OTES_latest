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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Question from "./Question.js";
import Bill from "layouts/billing/components/Bill/index.js";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import MDPagination from "components/MDPagination/index.js";
// Billing page components

function QuestionInformation() {
    const [questions,setQuestions] = useState([])
    const [loading,setLoading] = useState(true)
    console.log("Questions page")
    const area = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
    console.log(questions)
    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/getMCQQuestions/${area}`)
          .then((response) => {
            // Convert the image data to a base64 URL

            const questionsWithImage = response.data.map((question) => {
              if (question.image && question.image.data) {
                const base64Image = question.image.data;
                question.imageURL = `data:${question.image.contentType};base64,${base64Image}`;
              }
              return question;
            });
    
            setQuestions(questionsWithImage);
            setLoading(false)
            // setFilteredQuestions(questionsWithImage);
            // setAreas([...new Set(questionsWithImage.map((question) => question.area))]);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    return (
      loading ? <MDTypography>loading ...</MDTypography> :
        <Card id="delete-account">
            <MDBox pt={3} px={2}>
                <MDTypography variant="h6" fontWeight="medium">
                    {area} Questions Information
                </MDTypography>
            </MDBox>
            <MDBox pt={1} pb={2} px={2}>
                <MDBox component="ul" display="flex"
                    // flexDirection="column"
                    flexWrap="wrap" p={0} m={0} >

                    {
                        questions.length > 0 ?  questions.map((item,index)=>{
                            return (
                            <Question
                            key = {index}
                            imageURL = {item.image && item.imageURL}
                            questionId={item._id}
                            correct_choice ={item.correct_choice}
                            c1 ={item.choice1}
                            c2 ={item.choice2}
                            c3 ={item.choice3}
                            c4 ={item.choice4}
                            name={item.question}
                            area ={item.area}
                            qnum={index+1}
                            company="viking burrito"
                            email="oliver@burrito.com"
                            vat="FRB1235476"
                             />)
                        }) :<MDTypography
                            variant='button' 
                            p={4}
                        >
                            No Questions Available.
                        </MDTypography>
                    }
                    
                </MDBox>
                
            </MDBox>
        </Card>
    );
}

export default QuestionInformation;
