import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Icon,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import BasicLayoutLanding from "layouts/authentication/components/CandidateTestLayout";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const getMCQQuestionsForTest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [mcqquestions, setMCQQuestions] = useState(
    JSON.parse(localStorage.getItem("mcqquestions")) || []
  );
  const [selectedAnswers, setSelectedAnswers] = useState(
    JSON.parse(localStorage.getItem("selectedAnswers")) || {}
  );
  const [hasFetched, setHasFetched] = useState(
    localStorage.getItem("hasFetched") || false
  );
  const [timer, setTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null); // State for remaining time
  const [timerDisplay, setTimerDisplay] = useState(""); // State for displaying timer
  const email = JSON.parse(localStorage.getItem("email"));
  const atsId = JSON.parse(localStorage.getItem("Id"));

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (timer && remainingTime !== null) {
        startTimer(remainingTime); // Resume timer if it was paused
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      pauseTimer(); // Pause timer if it's running
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [timer, remainingTime]);

  useEffect(() => {
    if (!hasFetched && mcqquestions.length === 0) {
      setIsLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/getMCQQuestionsforTest/${email}`
        )
        .then((response) => {
          const questionsWithImage = response.data.questions.map((question) => {
            if (question.image && question.image.data) {
              const base64Image = question.image.data;
              question.imageURL = `data:${question.image.contentType};base64,${base64Image}`;
            }
            question.question = DOMPurify.sanitize(question.question);
            return question;
          });

          const randomizedQuestions = shuffleArray(questionsWithImage);

          localStorage.setItem(
            "mcqquestions",
            JSON.stringify(randomizedQuestions)
          );
          setIsLoading(false);
          setMCQQuestions(randomizedQuestions);
          setHasFetched(true);
          localStorage.setItem("hasFetched", true);
          startTimer(mcqquestions.length === 50 ? 1800 : 3600); // Start timer based on question count
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [hasFetched, mcqquestions, email]);

  function shuffleArray(array) {
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }

    return shuffledArray;
  }

  function handleBeforeUnload(event) {
    event.preventDefault();
    event.returnValue = "";
  }

  async function handleNextClick() {
    setLoading(true);

    const selectedAnswers =
      (await JSON.parse(localStorage.getItem("selectedAnswers"))) || {};
    await mcqquestions.forEach((question) => {
      if (!selectedAnswers.hasOwnProperty(question._id)) {
        selectedAnswers[question._id] = "";
      }
    });

    const requestBody = {
      email,
      selectedAnswers,
    };

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/automatic/testresults`,
        requestBody
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
    navigate("/Results");
    localStorage.clear();
  }

  function handleRadioChange(event, questionId) {
    if (!navigator.onLine) {
      return;
    }

    const selectedAnswer = event.target.value;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: selectedAnswer,
    });
    localStorage.setItem(
      "selectedAnswers",
      JSON.stringify({
        ...selectedAnswers,
        [questionId]: selectedAnswer,
      })
    );
  }

  function handleTestSubmissionAttempt() {
    const isEveryQuestionAnswered = mcqquestions.every(
      (question) =>
        selectedAnswers.hasOwnProperty(question._id) &&
        selectedAnswers[question._id] !== ""
    );
    if (!isEveryQuestionAnswered) {
      setOpenModal(true);
    } else {
      handleNextClick();
    }
  }

  function startTimer(duration) {
    setTimer(
      setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 300) {
            alert("You have 5 minutes left!");
          }
          if (prevTime === 0) {
            clearInterval(timer);
            handleNextClick();
            return null;
          }
          const minutes = Math.floor(prevTime / 60);
          const seconds = prevTime % 60;
          setTimerDisplay(
            `${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`
          );
          localStorage.setItem("remainingTime", prevTime - 1); // Store remaining time in local storage
          return prevTime - 1;
        });
      }, 1000)
    );
    setRemainingTime(duration);
    localStorage.setItem("timerRunning", true); // Store timer state in local storage
  }

  useEffect(() => {
    const remainingTime = localStorage.getItem("remainingTime");
    const timerRunning = localStorage.getItem("timerRunning");
    if (remainingTime && timerRunning) {
      startTimer(parseInt(remainingTime));
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      const remainingTime = localStorage.getItem("remainingTime");
      const timerRunning = localStorage.getItem("timerRunning");
      if (remainingTime && timerRunning) {
        startTimer(parseInt(remainingTime)); // Resume timer if there's remaining time stored
      }
    };
  
    const handleOffline = () => {
      setIsOnline(false);
      pauseTimer(); // Pause timer when offline
    };
  
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  
    // Check if the user is online when the component mounts
    if (navigator.onLine) {
      setIsOnline(true); // Set online state to true if user is online
      const remainingTime = localStorage.getItem("remainingTime");
      const timerRunning = localStorage.getItem("timerRunning");
      if (remainingTime && timerRunning) {
        startTimer(parseInt(remainingTime)); // Start timer if user is online and there's remaining time stored
      }
    } else {
      setIsOnline(false); // Set online state to false if user is offline
      pauseTimer(); // Pause timer when offline
    }
  
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  

  function pauseTimer() {
    clearInterval(timer);
    setTimer(null);
  }

  function resetTimer() {
    clearInterval(timer);
    setTimer(null);
    set
RemainingTime(null);
    setTimerDisplay(""); // Reset timer display
  }

  return (
    <BasicLayoutLanding>
      <Card
        style={{ backgroundColor: "white", width: "100%", textAlign: "start" }}
      >
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={0}
          mt={0}
          p={2}
          mb={1}
          br={0}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={0}>
            Online Assessment
          </MDTypography>
          <MDBox textAlign="center" mb={2}>
          <MDTypography variant="body2" fontWeight="medium">
            {timerDisplay && `Time Remaining: ${timerDisplay}`}
          </MDTypography>
        </MDBox>
        </MDBox>
        <MDBox ml={5}>
          <MDTypography
            variant="h5"
            fontWeight="medium"
            textTransform="capitalize"
            mt={2}
            mb={1}
          >
            MCQ Questions:
          </MDTypography>
          <MDBox>
            {isLoading ? (
              <MDBox align="center" variant="h6" mb={2} ml={4}>
                <CircularProgress color="black" size={30} />
              </MDBox>
            ) : (
              <>
                {mcqquestions.map((question, index) => (
                  <MDBox
                    key={question._id}
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    <MDBox>
                      <MDTypography
                        variant="h6"
                        fontWeight="medium"
                        mt={1}
                        mb={1}
                      >
                        {index + 1}. {question.question}
                      </MDTypography>
                    </MDBox>
                    <MDBox></MDBox>
                    {question.imageURL && (
                      <MDBox className="card-body">
                        <img
                          src={question.imageURL}
                          alt="Question Image"
                          style={{ width: "auto", height: "auto" }}
                        />
                      </MDBox>
                    )}
                    <MDBox>
                      <FormControl
                        component="fieldset"
                        sx={{
                          marginTop: "0px",
                          color: "text",
                          "& .MuiSvgIcon-root": {
                            fontSize: "6px",
                          },
                        }}
                      >
                        <RadioGroup
                          name={question._id}
                          value={selectedAnswers[question._id]}
                          onChange={(e) =>
                            handleRadioChange(e, question._id)
                          }
                          disabled={!isOnline}
                        >
                          <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label={
                              <MDTypography
                                variant="body2"
                                sx={{ fontSize: "14px", color: "text" }}
                              >
                                {question.choice1}
                              </MDTypography>
                            }
                          />
                          <FormControlLabel
                            value={2}
                            control={<Radio />}
                            label={
                              <MDTypography
                                variant="body2"
                                sx={{ fontSize: "14px", color: "text" }}
                              >
                                {question.choice2}
                              </MDTypography>
                            }
                          />
                          <FormControlLabel
                            value={3}
                            control={<Radio />}
                            label={
                              <MDTypography
                                variant="body2"
                                sx={{ fontSize: "14px", color: "text" }}
                              >
                                {question.choice3}
                              </MDTypography>
                            }
                          />
                          <FormControlLabel
                            value={4}
                            control={<Radio />}
                            label={
                              <MDTypography
                                variant="body2"
                                sx={{ fontSize: "14px", color: "text" }}
                              >
                                {question.choice4}
                              </MDTypography>
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                    </MDBox>
                  </MDBox>
                ))}
              </>
            )}
          </MDBox>
          <center>
            <MDBox mb={5}>
              {loading ? (
                <MDButton variant="gradient" disabled color="warning">
                  Please wait ...
                </MDButton>
              ) : (
                <MDButton
                  variant="gradient"
                  id="submit_test_auto"
                  color="info"
                  type="submit"
                  onClick={handleTestSubmissionAttempt}
                >
                  Submit Test
                </MDButton>
              )}
            </MDBox>
          </center>
        </MDBox>
        
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Submit Test?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You have unanswered questions. Submitting the test with unanswered
              questions may impact your results. Are you sure you want to submit
              the test?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>No</Button>
            <Button
              onClick={() => {
                handleNextClick();
                setOpenModal(false);
              }}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </BasicLayoutLanding>
  );
};

export default getMCQQuestionsForTest;
