
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { FormControl, FormControlLabel, RadioGroup, Radio, Divider } from '@mui/material';


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import DOMPurify from "dompurify";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import ChangeResultModel from "./ChangeResultModel";
import CircularProgress from '@mui/material/CircularProgress';

// import { store } from "./App";


function EvalQuestions() {
  const navigate = useNavigate();
  const { email } = useParams();


  const [testResults, setTestResults] = useState([]);
  const [mcqQuestions, setMCQQuestions] = useState([]);
  const [total, setTotal] = useState(0);
  const [candidate, setCandidate] = useState({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true)
  const [isButtonClicked, setIsButtonClicked] = useState(false);


  let mcqScore = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;

  console.log(candidate)

  //working
  useEffect(() => {
    setLoading(true)
    axios.get(`${process.env.REACT_APP_API_URL}/getCandidateDetails/${email}`)
      .then(response => {
        setCandidate(response.data[0]);
        console.log(candidate)
      })
      .catch(error => {
        console.log(error);
      });

    axios.get(`${process.env.REACT_APP_API_URL}/getTestResults?emails=${email}`)
      .then(response => {
        setTestResults(response.data);
        const selectedAnswers = response.data[0].selectedAnswers;
        const totalQuestions = Object.keys(selectedAnswers).length;
        setTotal(totalQuestions);
      })
      .catch((error) => {
        toast.warn("Something went wrong ,please try after sometime.", 
        {
          style: {
            fontSize: '18px', 
          },
        })
        navigate('/Candidate-List')
        console.error(error, "eval")
        console.error(error)
      });

  }, []);

  useEffect(() => {
    if (testResults.length > 0) {
      setLoading(true)
      const selectedAnswersIds = testResults.flatMap(result =>
        Object.keys(result.selectedAnswers)
      );
      axios
        .get(`${process.env.REACT_APP_API_URL}/getMCQQuestions`, {
          params: {
            ids: selectedAnswersIds.join(",")
          }
        })
        .then(response => {
          const questionsWithImage = response.data.map(question => {
            if (question.image && question.image.data) {
              const base64Image = question.image.data;
              question.imageURL = `data:${question.image.contentType};base64,${base64Image}`;
            }
            question.question = DOMPurify.sanitize(question.question);
            return question;
          });
          setMCQQuestions(questionsWithImage);
          setLoading(false)
        })
        .catch((error) => {
          toast.warn("Something went wrong ,please try after sometime.", 
          {
            style: {
              fontSize: '18px', 
            },
          })
          navigate('/Candidate-List')
          console.error(error, "eval")
        });
    }

  }, [testResults]);
  async function updateCandidateResult(result, email) {
    console.log(result, email)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/updateTestResult/${email.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            result,
            mcqScore
           
          }),
        }
      );
      console.log(response)
      const data = await response.json();

      if (!response.ok) {
        toast.warn(data.message || "Failed to update candidate result.", 
        {
          style: {
            fontSize: '18px', 
          },
        });
      } else {
        console.log(data)
        toast.info("Candidate result updated successfully.", 
        {
          style: {
            fontSize: '18px', 
          },
        })
        window.location.reload()
      }

      // return data;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  ///// Update the test result to Applicant Tracking System 
  const generateResultColor = (final_result) => {
    if (final_result === "Pass") {
      return "success"
    } else if (final_result === "Fail") {
      return "error"
    } else {
      return "warning"
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        {
          loading ? <MDBox align="center" variant="h6" mb={2} ml={4} mt={3}>
          <CircularProgress color='black' size={30} mt={3} /></MDBox> : <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
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
                    Test Evaluation
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} pl={4}>
                  <MDTypography variant="h5" textAlign='start'>
                    Candidate: {email}
                  </MDTypography>
                  <ol style={{ paddingLeft: "30px", marginTop: "30px", fontSize: '16px' }}>
                    {mcqQuestions.map((question, index) => {
                      // console.log(question,"question")
                      const selectedAnswer = testResults[0].selectedAnswers[question._id];
                      // console.log(selectedAnswer)
                      const isCorrect = selectedAnswer === question.correct_choice;
                      const notAnswered = testResults[0].selectedAnswers[question._id]
                      // console.log(notAnswered, 'from selected ans')
                      if (isCorrect) {
                        mcqScore++;
                        correctAnswers++;
                      } else {
                        wrongAnswers++;
                      }
                      return (
                        // <li key={question._id} style={{ marginBottom: "30px" }}>
                        <MDBox className="card">
                          <MDBox className="card-body">
                            <MDTypography variant="h6" fontWeight="medium"  mt={1} mb={1}>
                              {index + 1}.  {question.question}
                            </MDTypography>
                            {/* <MDTypography variant="h5" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.question) }} /> */}
                            {question.imageURL && (
                              <MDBox className="card-body">
                                <img src={question.imageURL} alt="Question Image" style={{ width: 'auto', height: 'auto' }} />
                              </MDBox>
                            )}
                            <MDTypography variant="h6" style={{ marginBottom: "10px", paddingLeft: '20pxx' }}>
                              Correct answer: {question.correct_choice}
                            </MDTypography>
                            <RadioGroup
                              name={question._id}
                              value={selectedAnswer[question._id]}
                              defaultValue={selectedAnswer}
                            // onChange={(e) => handleRadioChange(e, question._id)}
                            >
                              <FormControlLabel disabled value={1} control={<Radio />} label={<MDTypography variant="body2" sx={{ fontSize: '14px', color: 'text' }}>{question.choice1}</MDTypography>} />
                              <FormControlLabel disabled value={2} control={<Radio />} label={<MDTypography variant="body2" sx={{ fontSize: '14px', color: 'text' }}>{question.choice2}</MDTypography>} />
                              <FormControlLabel disabled value={3} control={<Radio />} label={<MDTypography variant="body2" sx={{ fontSize: '14px', color: 'text' }}>{question.choice3}</MDTypography>} />
                              <FormControlLabel disabled value={4} control={<Radio />} label={<MDTypography variant="body2" sx={{ fontSize: '14px', color: 'text' }}>{question.choice4}</MDTypography>} />
                            </RadioGroup>

                            <MDBox id={`symbol-${question._id}`} className="symbol">
                              {notAnswered !== "" ? isCorrect ? (
                                <MDTypography style={{
                                  color: "#28a745",
                                  fontWeight: "bold",
                                  marginRight: "5px",
                                  fontSize: '15px',
                                }}>
                                  &#10004; Correct
                                </MDTypography>
                              ) : (
                                <MDTypography style={{
                                  color: "#dc3545",
                                  fontWeight: "bold",
                                  marginRight: "5px",
                                  fontSize: '15px',
                                }}>
                                  &#10008; Wrong
                                </MDTypography>
                              ) :
                                (
                                  <MDTypography style={{
                                    color: "#e08e36",
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                    fontSize: '15px',
                                  }}>
                                    &#8709; Not Answered
                                  </MDTypography>
                                )
                              }
                            </MDBox>
                          </MDBox>
                        </MDBox>
                        // </li>
                      );
                    })}
                    <MDBox style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
                      <MDTypography>Correct Answers: {correctAnswers}</MDTypography>
                      <MDTypography>Wrong Answers: {wrongAnswers}</MDTypography>
                      <MDTypography>Score: {mcqScore} / {total}</MDTypography>
                    </MDBox>
                  </ol>
                  <center>

                    <Divider />

                    {/* working */}
                    <MDBox >
                      {candidate.result === "" ? <MDBox>
                        <MDTypography variant="h5">
                          Evaluate the candidate :
                        </MDTypography>
                        <MDButton variant="contained" style={{ marginRight: "10px", marginTop: '30px', marginBottom: '30px', marginTop:'10px' }} color="success"
                          onClick={() => {
                            updateCandidateResult("Pass", { email });
                          }}
                        >
                          Pass
                        </MDButton>
                        <MDButton variant="contained" style={{ marginRight: "10px", marginTop: '30px', marginBottom: '30px', marginTop:'10px' }} color="warning"
                          onClick={() => {
                            updateCandidateResult("On Hold", { email });
                          }}
                        >
                          On Hold
                        </MDButton>
                        <MDButton variant="contained" style={{ marginRight: "10px", marginTop: '30px', marginBottom: '30px', marginTop:'10px' }} color="error"
                          onClick={() => {
                            updateCandidateResult("Fail", { email });
                          }}
                        >
                          Fail
                        </MDButton>
                      </MDBox> :
                        <MDBox style={{ marginBottom: "20px" }}>
                          {/* <MDTypography variant="h5" sx={{ marginBottom:'10px'}}>Result of the Candidate : </MDTypography> */}
                          <MDButton variant="contained"  color={generateResultColor(candidate.result)} >
                           Result of the Candidate :{candidate.result}
                          </MDButton>
                          <ChangeResultModel result={candidate.result } />

                        </MDBox>
                      }
                    </MDBox>


                  </center>
                </MDBox>

              </Card>
            </Grid>
          </Grid>
        }
      </MDBox>
      <ScrollToggle/>
      <Footer />
    </DashboardLayout>
  );
}

export default EvalQuestions
