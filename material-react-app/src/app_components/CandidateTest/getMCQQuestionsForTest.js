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
import MDInput from "components/MDInput";
import CircularProgress from '@mui/material/CircularProgress';

import BasicLayoutLanding from "layouts/authentication/components/CandidateTestLayout";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import Timer from "./Timer";

const getMCQQuestionsForTest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mcqquestions, setMCQQuestions] = useState(
    JSON.parse(localStorage.getItem("mcqquestions")) || []
  );
  const [selectedAnswers, setSelectedAnswers] = useState(
    JSON.parse(localStorage.getItem("selectedAnswers")) || {}
  );
  const [hasFetched, setHasFetched] = useState(
    localStorage.getItem("hasFetched") || false
  );
  const email = JSON.parse(localStorage.getItem("email"));
  const atsId = JSON.parse(localStorage.getItem("Id"));
  console.log(atsId);

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
    // Check if the MCQ questions have already been fetched
    if (!hasFetched && mcqquestions.length === 0) {
      setIsLoading(true);
      // setLoading(true)
      axios
        .get(`${process.env.REACT_APP_API_URL}/getMCQQuestionsforTest/${email}`)
        .then((response) => {
          const questionsWithImage = response.data.questions.map((question) => {
            if (question.image && question.image.data) {
              const base64Image = question.image.data;
              question.imageURL = `data:${question.image.contentType};base64,${base64Image}`;
            }
            question.question = DOMPurify.sanitize(question.question);
            return question;
          });

          // Randomize the order of the questions
          const randomizedQuestions = shuffleArray(questionsWithImage);

          localStorage.setItem(
            "mcqquestions",
            JSON.stringify(randomizedQuestions)
          );
          setIsLoading(false)
          setMCQQuestions(randomizedQuestions);
          setHasFetched(true);
          localStorage.setItem("hasFetched", true);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false); // Set loading state to false after fetching is complete
          console.log(isLoading);
        });
    }
  }, [hasFetched, mcqquestions, email]);

  function shuffleArray(array) {
    // Create a new array to avoid mutating the original array
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap it with the current element
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
      // Check if the question's _id exists in the answered object
      if (!selectedAnswers.hasOwnProperty(question._id)) {
        // If it doesn't exist, add it to the answered object with an empty string value
        selectedAnswers[question._id] = "";
      }
    });
    console.log(selectedAnswers);
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
    // Check if there are any unanswered questions
    const isEveryQuestionAnswered = mcqquestions.every(
      (question) =>
        selectedAnswers.hasOwnProperty(question._id) &&
        selectedAnswers[question._id] !== ""
    );
    if (!isEveryQuestionAnswered) {
      // Not every question is answered, so show the modal
      setOpenModal(true);
    } else {
      // All questions are answered, proceed to submit
      handleNextClick();
    }
  }

  return (
    <BasicLayoutLanding>
      <Card
        style={{ backgroundColor: "white", width: "100%", textAlign: "start" }}
      >
        {/* <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        // width="10rem"
        // height="10rem"
        padding="10px"
        borderRadius="10px"
        bgColor="white"
        shadow="sm"
        // borderRadius="50%"
        position="fixed"
        top="2rem"
        right="4rem"
        // right="2rem"
        // bottom="2rem"
        zIndex={99}
        color="dark"
        sx={{ cursor: "pointer" }}
      >
        <Timer/>
        </MDBox> */}
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
                    <CircularProgress color='black' size={30} /></MDBox>
                ) : (
                  <>
            {mcqquestions.map((question, index) => (
              <MDBox
                key={question._id}
                style={{ width: "100%", marginTop: "10px" }}
              >
                <MDBox>
                  <MDTypography variant="h6" fontWeight="medium" mt={1} mb={1}>
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
                      onChange={(e) => handleRadioChange(e, question._id)}
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

///////////////////code for backup ///////////////////////////
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// // import { ATS_URL, BASE_URL } from '../Service/helper';
// import DOMPurify from 'dompurify';
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
// import Card from "@mui/material/Card";
// import MDInput from "components/MDInput";
// import { FormControl, FormControlLabel, RadioGroup, Radio, Icon } from '@mui/material';


// import BasicLayoutLanding from "layouts/authentication/components/CandidateTestLayout";
// import Timer from './Timer';


// const getMCQQuestionsForTest = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false)
//   const [isQuestionsLoading,setIsQuestionsLoading] = useState(true)
//   const [isLoading, setIsLoading] = useState(false);
//   const [mcqquestions, setMCQQuestions] = useState(
//     JSON.parse(localStorage.getItem('mcqquestions')) || []
//   );
//   const [selectedAnswers, setSelectedAnswers] = useState(
//     JSON.parse(localStorage.getItem('selectedAnswers')) || {}
//   );
//   const [hasFetched, setHasFetched] = useState(
//     localStorage.getItem('hasFetched') || false
//   );
//   const email = JSON.parse(localStorage.getItem('email'));
//   const atsId = JSON.parse(localStorage.getItem('Id'));
//   console.log(atsId)

//   useEffect(() => {
//     window.history.pushState(null, '', window.location.href);
//     window.onpopstate = () => {
//       window.history.pushState(null, '', window.location.href);
//     };
//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, []);

//   useEffect(() => {
//     // Check if the MCQ questions have already been fetched
//     if (!hasFetched && mcqquestions.length === 0) {
//       setIsLoading(true);
//       axios
//         .get(`${process.env.REACT_APP_API_URL}/getMCQQuestionsforTest/${email}`)
//         .then((response) => {
//           const questionsWithImage = response.data.questions.map((question) => {
//             if (question.image && question.image.data) {
//               const base64Image = question.image.data;
//               question.imageURL = `data:${question.image.contentType};base64,${base64Image}`;
//             }
//             question.question = DOMPurify.sanitize(question.question);
//             return question;
//           });

//           // Randomize the order of the questions
//           const randomizedQuestions = shuffleArray(questionsWithImage);

//           localStorage.setItem('mcqquestions', JSON.stringify(randomizedQuestions));
//           setMCQQuestions(randomizedQuestions);
//           setHasFetched(true);
//           localStorage.setItem('hasFetched', true);
//         })
//         .catch((error) => {
//           console.log(error);
//         })
//         .finally(() => {
//           setIsLoading(false); // Set loading state to false after fetching is complete
//           console.log(isLoading);
//         });
//     }
//   }, [hasFetched, mcqquestions, email]);

//   function shuffleArray(array) {
//     // Create a new array to avoid mutating the original array
//     const shuffledArray = [...array];
//     let currentIndex = shuffledArray.length;
//     let temporaryValue;
//     let randomIndex;

//     // While there remain elements to shuffle
//     while (currentIndex !== 0) {
//       // Pick a remaining element
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;

//       // Swap it with the current element
//       temporaryValue = shuffledArray[currentIndex];
//       shuffledArray[currentIndex] = shuffledArray[randomIndex];
//       shuffledArray[randomIndex] = temporaryValue;
//     }

//     return shuffledArray;
//   }

//   function handleBeforeUnload(event) {
//     event.preventDefault();
//     event.returnValue = '';
//   }
//   async function handleNextClick() {
//     setLoading(true)

//     const selectedAnswers = await JSON.parse(localStorage.getItem('selectedAnswers')) || {};
//       await mcqquestions.forEach(question => {
//       // Check if the question's _id exists in the answered object
//       if (!selectedAnswers.hasOwnProperty(question._id)) {
//         // If it doesn't exist, add it to the answered object with an empty string value
//         selectedAnswers[question._id] = "";
//       }
//     });
//     console.log(selectedAnswers)
//     const requestBody = {
//       email,
//       selectedAnswers,
//     };

//     await axios
//       .post(`${process.env.REACT_APP_API_URL}/automatic/testresults`, requestBody)
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     // const requestBody2 = {
//     //   email,
//     //   testStatus: 'Test Taken',
//     // };

//     // await axios
//     //   .patch(`${process.env.REACT_APP_API_URL}/updateCandidateTeststatus`, requestBody2)
//     //   .then((response) => {
//     //     console.log(response);
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //   });
//     setLoading(false)
//     navigate('/Results');
//     localStorage.clear();
//   }

//   function handleRadioChange(event, questionId) {
//     const selectedAnswer = event.target.value;
//     setSelectedAnswers({
//       ...selectedAnswers,
//       [questionId]: selectedAnswer,
//     });
//     localStorage.setItem(
//       'selectedAnswers',
//       JSON.stringify({
//         ...selectedAnswers,
//         [questionId]: selectedAnswer,
//       })
//     );
//   }

//   return (
//     <BasicLayoutLanding >
      
//       <Card style={{ backgroundColor: 'white', width: '100%', textAlign: 'start' }}>
//         {/* <MDBox
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         // width="10rem"
//         // height="10rem"
//         padding="10px"
//         borderRadius="10px"
//         bgColor="white"
//         shadow="sm"
//         // borderRadius="50%"
//         position="fixed"
//         top="2rem"
//         right="4rem"
//         // right="2rem"
//         // bottom="2rem"
//         zIndex={99}
//         color="dark"
//         sx={{ cursor: "pointer" }}
//       >
//         <Timer/>
//         </MDBox> */}
//         <MDBox
//           variant="gradient"
//           bgColor="info"
//           borderRadius="lg"
//           coloredShadow="info"
//           mx={0}
//           mt={0}
//           p={2}
//           mb={1}
//           br={0}
//           textAlign="center"
//         >
//           <MDTypography variant="h4" fontWeight="medium" color="white" mt={0}>
//             Online Assessment
//           </MDTypography>
//         </MDBox>
//         <MDBox ml={5} >
//           <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize" mt={2} mb={1}>
//             MCQ Questions:
//           </MDTypography>
//           <MDBox>
//             {mcqquestions.map((question, index) => (

//               <MDBox key={question._id} style={{ width: '100%', marginTop: '10px' }}>
//                 <MDBox>
//                   <MDTypography variant="h6" fontWeight="medium" mt={1} mb={1}>
//                     {index + 1}.  {question.question}
//                   </MDTypography>
//                 </MDBox>
//                 <MDBox>
//                   {/* <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize" mt={2}
//                   dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.question) }}>
//                 </MDTypography> */}
//                   {/* <h3 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.question) }} /> */}
//                 </MDBox>
//                 {question.imageURL && (
//                   <MDBox className="card-body">
//                     <img src={question.imageURL} alt="Question Image" style={{ width: 'auto', height: 'auto' }} />
//                   </MDBox>
//                 )}
//                 <MDBox>
//                   <FormControl component="fieldset" sx={{
//                     marginTop: '0px',
//                     color: 'text',
//                     '& .MuiSvgIcon-root': {
//                       fontSize: '6px',
//                     },
//                   }}>
//                     <RadioGroup
//                       name={question._id}
//                       value={selectedAnswers[question._id]}
//                       onChange={(e) => handleRadioChange(e, question._id)}
//                     >
//                       <FormControlLabel value={1} control={<Radio />} label={<MDTypography variant="body2" sx={{ fontSize: '14px', color: 'text' }}>{question.choice1}</MDTypography>} />
//                       <FormControlLabel value={2} control={<Radio />} label={<MDTypography variant="body2" sx={{ fontSize: '14px', color: 'text' }}>{question.choice2}</MDTypography>} />
//                       <FormControlLabel value={3} control={<Radio />} label={<MDTypography variant="body2" sx={{ fontSize: '14px', color: 'text' }}>{question.choice3}</MDTypography>} />
//                       <FormControlLabel value={4} control={<Radio />} label={<MDTypography variant="body2" sx={{ fontSize: '14px', color: 'text' }}>{question.choice4}</MDTypography>} />
//                     </RadioGroup>
//                   </FormControl>

//                   {/* <label>
//                     <input
//                       type="radio"
//                       name={question._id}
//                       value={1}
//                       checked={selectedAnswers[question._id] == 1}
//                       onChange={(e) => handleRadioChange(e, question._id)}
//                     />
//                     {question.choice1}
//                   </label>
//                   <br />
//                   <label>
//                     <input
//                       type="radio"
//                       name={question._id}
//                       value={2}
//                       checked={selectedAnswers[question._id] == 2}
//                       onChange={(e) => handleRadioChange(e, question._id)}
//                     />
//                     {question.choice2}
//                   </label>
//                   <br />
//                   <label>
//                     <input
//                       type="radio"
//                       name={question._id}
//                       value={3}
//                       checked={selectedAnswers[question._id] == 3}
//                       onChange={(e) => handleRadioChange(e, question._id)}
//                     />
//                     {question.choice3}
//                   </label>
//                   <br />
//                   <label>
//                     <input
//                       type="radio"
//                       name={question._id}
//                       value={4}
//                       checked={selectedAnswers[question._id] == 4}
//                       onChange={(e) => handleRadioChange(e, question._id)}
//                     />
//                     {question.choice4}
//                   </label> */}
//                 </MDBox>
//               </MDBox>
//             ))}
//           </MDBox>
//           <center>
//             <MDBox mb={5}>
//               {
//                 loading ? <MDButton variant="gradient" disabled color="warning" >
//                   Please wait ...
//                 </MDButton> : <MDButton variant="gradient" id="submit_test_auto" color="info" type="submit" onClick={handleNextClick}>
//                   Submit Test
//                 </MDButton>
//               }

//               {/* <button className="btn" style={{ marginTop: '3px', backgroundColor: '#FFFFFF' }} onClick={handleNextClick}>
//                 Submit Your Answers
//               </button> */}
//             </MDBox>
//           </center>
//         </MDBox>
//       </Card>
//     </BasicLayoutLanding>
//   );
// };

// export default getMCQQuestionsForTest;


// const missingAnswers = mcqquestions.some((question) => !selectedAnswers[question._id]);
//       if (missingAnswers) {
//         alert('Please answer all questions before continuing.');
//         setLoading(false)
//       } else {
//         const selectedAnswers = await JSON.parse(localStorage.getItem('selectedAnswers'));
//         await mcqquestions.forEach(question => {
//           // Check if the question's _id exists in the answered object
//           if (!selectedAnswers.hasOwnProperty(question._id)) {
//             // If it doesn't exist, add it to the answered object with an empty string value
//             selectedAnswers[question._id] = "";
//           }
//         });
//         console.log(selectedAnswers)
//         const requestBody = {
//           email,
//           selectedAnswers,
//         };

//         axios
//           .post(`${process.env.REACT_APP_API_URL}/testresults`, requestBody)
//           .then((response) => {
//             console.log(response);
//           })
//           .catch((error) => {
//             console.log(error);
//           });

//         const requestBody2 = {
//           email,
//           testStatus: 'Test Taken',
//         };

//         axios
//           .patch(`${process.env.REACT_APP_API_URL}/updateCandidateTeststatus`, requestBody2)
//           .then((response) => {
//             console.log(response);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//         setLoading(false)
//         ///Post the data to the Applicant Tracking System when applicant completed the test
//         // try {
//         //   await axios.put(`${process.env.ATS_URL}/appicant/update/comments`, { email: email, comment: `The applicant has successfully completed the test. To proceed with the evaluation, please click the following link: <a href="${window.location.origin}" target="_blank">Click Here</a>`, commentBy: "TES System", cRound: "Online Assessment Test", nextRound: "Veera", status: "Hiring Manager" })
//         //     .then(res => console.log(res))
//         // } catch (err) {
//         //   console.log(err.message)
//         // }

//         localStorage.clear();
//         navigate('/Results');