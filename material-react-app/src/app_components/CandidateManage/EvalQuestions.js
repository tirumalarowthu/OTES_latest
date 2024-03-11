
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { FormControl, FormControlLabel, RadioGroup, Radio, Divider } from '@mui/material';


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import DOMPurify from "dompurify";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import ChangeResultModel from "./ChangeResultModel";
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

  // const location = useLocation();
  // console.log(location)
  // const email = location.state.email;
  // console.log(email)
  // const testStatus = "ON HOLD";
  // console.log(testStatus)
  // const isEvaluated = testStatus === 'Evaluated';

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
        toast.warn("Something went wrong ,please try after sometime.")
        navigate('/Candidate-List')
        console.error(error, "eval")
        console.error(error)
      });

    // setLoading(false)
  }, []);

  //working
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
          toast.warn("Something went wrong ,please try after sometime.")
          navigate('/Candidate-List')
          console.error(error, "eval")
        });
      // setLoading(false)
    }

  }, [testResults]);

  //working
  // useEffect(() => {
  //   if (isEvaluated) {
  //     // Disable the Evaluate button
  //     const testResult = location.state.result;
  //     console.log(testResult)
  //     console.log(result)
  //     const PassButton = document.getElementById('evaluate-pass');
  //     const FailButton = document.getElementById('evaluate-fail');
  //     const OnHoldButton = document.getElementById('evaluate-OnHold');

  //     if (testResult === "Pass") {
  //       if (FailButton) {
  //         FailButton.parentNode.removeChild(FailButton);
  //       }
  //       PassButton.disabled = true;
  //       if (OnHoldButton) {
  //         OnHoldButton.parentNode.removeChild(OnHoldButton)
  //       }
  //     }
  //     if (testResult === "Fail") {
  //       if (PassButton) {
  //         PassButton.parentNode.removeChild(PassButton);
  //       }
  //       FailButton.disabled = true;
  //       if (OnHoldButton) {
  //         OnHoldButton.parentNode.removeChild(OnHoldButton)
  //       }
  //     }
  //     if (testResult === "On Hold") {
  //       if (PassButton) {
  //         PassButton.parentNode.removeChild(PassButton);
  //       }
  //       if (FailButton) {
  //         FailButton.parentNode.removeChild(FailButton);
  //       }
  //       OnHoldButton.disabled = true;
  //     }
  //   }
  // }, [isEvaluated]);



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
            // ,codeScore,
            // textScore,
            // totalScore,
          }),
        }
      );
      console.log(response)
      const data = await response.json();

      if (!response.ok) {
        toast.warn(data.message || "Failed to update candidate result.");
      } else {
        console.log(data)
        toast.info("Candidate result updated successfully.")
        window.location.reload()
      }

      // return data;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //****** Update the test result to Applicant Tracking System 
  const submitTestResultToAts = async (appResult, mcqScore, total, other) => {
    console.log("ATS App")
    ///Post the data to the Applicant Tracking System when applicant completed the test
    // try {
    //   await axios.put(`${process.env.ATS_URL}/appicant/update/comments`, { email: email, comment: `The applicant's evaluation has been completed successfully. The obtained result is: ${appResult}, with a score of ${mcqScore} out of ${total}.${other} `, commentBy: "TES System", cRound: "Online Assessment Test", nextRound: "Veera", status: "Hiring Manager" })
    //     .then(res => console.log(res))
    // } catch (err) {
    //   console.log(err.message)
    // }
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
          loading ? <MDTypography>loading...</MDTypography> : <Grid container spacing={6}>
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
                          <MDTypography variant="h5" sx={{ marginBottom:'10px'}}>Result of the Candidate : </MDTypography>
                          {/* <MDButton variant="contained"  color={generateResultColor(candidate.result)} >
                            {candidate.result}
                          </MDButton> */}
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
      <Footer />
    </DashboardLayout>
  );
}

export default EvalQuestions


///Backup code --buttons hold old methods: 
{/* <MDBox>
                      <MDButton
                        id={`evaluate-pass`}
                        variant="contained"
                        color="success"
                        style={{ marginRight: "10px", marginTop: '30px', marginBottom: '30px' }}
                        onClick={() => {
                          updateCandidateResult("Pass", { email });
                          setIsButtonClicked(true);
                          submitTestResultToAts("<b> Pass </b>", mcqScore, total, "")
                          navigate("/Candidate-List");
                        }}
                        disabled={isButtonClicked}
                      >
                        Pass
                      </MDButton>
                      <MDButton
                        id={`evaluate-OnHold`}
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          updateCandidateResult("On Hold", { email });
                          setIsButtonClicked(true);
                          submitTestResultToAts(`<b> On Hold </b>`, mcqScore, total, `To determine whether the applicant passes or fails, please click the following link: <a href="${window.location.origin}" target="_blank">Click Here</a>`)
                          navigate("/Candidate-List");
                        }}
                        style={{ marginRight: "10px", marginTop: '30px', marginBottom: '30px' }}
                        disabled={isButtonClicked}
                      >
                        On Hold
                      </MDButton>
                      <MDButton
                        id={`evaluate-fail`}
                        variant="contained"
                        color="error"
                        style={{ marginRight: "10px", marginTop: '30px', marginBottom: '30px' }}
                        onClick={() => {
                          updateCandidateResult("Fail", { email });
                          setIsButtonClicked(true);
                          submitTestResultToAts("<b> Fail <b>", mcqScore, total, "")
                          navigate("/Candidate-List");
                        }}
                        disabled={isButtonClicked}
                      >
                        Fail
                      </MDButton>
                    </MDBox> */}
//code ended here:::

{/* <MDBox pt={3} pl={4}>
                <MDTypography  variant="h5" textTransform="capitalize" textAlign='start'>
                  Candidate: {email}
                </MDTypography>
                <ol style={{ paddingLeft: "30px", marginTop: "30px", fontSize: '16px' }}>
                    {mcqQuestions.map((question) => {
                    const selectedAnswer = testResults[0].selectedAnswers[question._id];
                    const isCorrect = selectedAnswer === question.correct_choice;
                    if (isCorrect) {
                        mcqScore++;
                        correctAnswers++;
                    } else {
                        wrongAnswers++;
                    }
                    return (
                        <li key={question._id} style={{ marginBottom: "30px" }}>
                        <div className="card">
                            <div className="card-body">
                            <h3 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.question) }} /> 
                            {question.imageURL && (
                            <div className="card-body">
                                <img src={question.imageURL} alt="Question Image" style={{ width: 'auto', height: 'auto' }} />
                            </div>
                            )}
                            <p style={{ marginBottom: "10px" }}>
                                Correct answer: {question.correct_choice}
                            </p>
                            <div className="form-check" style={{ marginBottom: "10px" }}>
                                <input
                                className="form-check-input"
                                type="radio"
                                name={question._id}
                                value={1}
                                defaultChecked={selectedAnswer === "1"}
                                />
                                <label className="form-check-label">{question.choice1}</label>
                            </div>
                            <div className="form-check" style={{ marginBottom: "10px" }}>
                                <input
                                className="form-check-input"
                                type="radio"
                                name={question._id}
                                value={2}
                                defaultChecked={selectedAnswer === "2"}
                                />
                                <label className="form-check-label">{question.choice2}</label>
                            </div>
                            <div className="form-check" style={{ marginBottom: "10px" }}>
                                <input
                                className="form-check-input"
                                type="radio"
                                name={question._id}
                                value={3}
                                defaultChecked={selectedAnswer === "3"}
                                />
                                <label className="form-check-label">{question.choice3}</label>
                            </div>
                            <div className="form-check" style={{ marginBottom: "20px" }}>
                                <input
                                className="form-check-input"
                                type="radio"
                                name={question._id}
                                value={4}
                                defaultChecked={selectedAnswer === "4"}
                                />
                                <label className="form-check-label">{question.choice4}</label>
                            </div>
                            <span id={`symbol-${question._id}`} className="symbol">
                                {isCorrect ? (
                                <span
                                    style={{
                                    color: "#28a745",
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                    }}
                                >
                                    &#10004; Correct
                                </span>
                                ) : (
                                <span
                                    style={{
                                    color: "#dc3545",
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                    }}
                                >
                                    &#10008; Wrong
                                </span>
                                )}
                            </span>
                            </div>
                        </div>
                        </li>
                    );
                    })}
                    <h4 style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <span>Correct Answers: {correctAnswers}</span>
                    <span>Wrong Answers: {wrongAnswers}</span>
                    <span>Score: {mcqScore} / {total}</span>
                    </h4>

                </ol>
                <center>
                    <div>
                    <Button
                        id={`evaluate-pass`}
                        variant="success"
                        style={{ marginRight: "10px" }}
                        onClick={() => {
                                      ("Pass");
                        updateCandidateResult("Pass", { email });
                        setIsButtonClicked(true);
                        submitTestResultToAts("<b> Pass </b>",mcqScore,total,"")
                        navigate("/Candidate-List");
                        // window.location.reload();

                        }}
                        disabled={isButtonClicked}
                    >
                        Pass
                    </Button>
                    <Button
                        id={`evaluate-OnHold`}
                        variant="warning"
                        onClick={() => {
                        setResult("On Hold");
                        updateCandidateResult("On Hold", { email });
                        setIsButtonClicked(true);
                        submitTestResultToAts(`<b> On Hold </b>`,mcqScore,total,`To determine whether the applicant passes or fails, please click the following link: <a href="${window.location.origin}" target="_blank">Click Here</a>`)
                        navigate("/Candidate-List");
                        // window.location.reload();
                        }}
                        style={{ marginRight: "10px" }}
                        disabled={isButtonClicked}
                    >
                        On Hold
                    </Button>
                    <Button
                        id={`evaluate-fail`}
                        variant="danger"
                        onClick={() => {
                        setResult("Fail");
                        updateCandidateResult("Fail", { email });
                        setIsButtonClicked(true);
                        submitTestResultToAts("<b> Fail <b>",mcqScore,total,"")
                        navigate("/Candidate-List");
                        // window.location.reload();
                        }}
                        disabled={isButtonClicked}
                    >
                        Fail
                    </Button>

                    </div>
                </center>

              </MDBox> */}

{/* <MDBox style={{ marginBottom: "10px", display: "inline-flex" }}>
                              <MDInput
                                className="form-check-input"
                                type="radio"
                                name={question._id}
                                value={1}
                                defaultChecked={selectedAnswer === "1"}
                              />
                              <MDTypography className="form-check-label">{question.choice1}</MDTypography>
                            </MDBox> */}
{/* <MDBox style={{ marginBottom: "10px" }}>
                              <MDInput
                                className="form-check-input"
                                type="radio"
                                name={question._id}
                                value={2}
                                defaultChecked={selectedAnswer === "2"}
                              />
                              <MDTypography className="form-check-label">{question.choice2}</MDTypography>
                            </MDBox> */}
{/* <MDBox style={{ marginBottom: "10px" }}>
                              <MDInput
                                className="form-check-input"
                                type="radio"
                                name={question._id}
                                value={3}
                                defaultChecked={selectedAnswer === "3"}
                              />
                              <MDTypography className="form-check-label">{question.choice3}</MDTypography>
                            </MDBox> */}
{/* <MDBox style={{ marginBottom: "20px" }}>
                              <MDInput
                                className="form-check-input"
                                type="radio"
                                name={question._id}
                                value={4}
                                defaultChecked={selectedAnswer === "4"}
                              />
                              <MDTypography className="form-check-label">{question.choice4}</MDTypography>
                            </MDBox> */}
{/* <button
                        type="submit"
                        className="btn"
                        id={`evaluate-all`}
                        style={{ backgroundColor: "#A4B3C4" }}
                        onClick={() => {
                        console.log('mcqscore:', mcqScore);
                        console.log('total marks', mcqScore);
                        // Navigate to the summary page
                        navigate('/summary', {
                            state: {
                            email,
                            mcqScore,
                            totalScore: mcqScore,
                            total: total,
                            },
                        });

                        


                        }}
                    >
                        Evaluate
                    </button> */}


{/* <div style={{ marginTop: '10px' }}> */ }
{/* <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                    className="btn"
                    style={{ backgroundColor: "#015D88", fontFamily: "fantasy" }}
                    onClick={handleProfileClick}
                    >
                    Back To Dashboard
                    </button>
                </div> */}