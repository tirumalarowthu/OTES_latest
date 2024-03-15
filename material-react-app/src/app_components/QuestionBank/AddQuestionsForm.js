import React, { useContext, useState, useEffect } from "react";
import MCQForm from "./MCQForm";
import AddParagraphQuestionsForm from "./AddParagraphQuestionsForm";
import { Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Divider, Select } from "@mui/material";
import axios from "axios";
const AddQuestionsForm = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false)
    const area = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)

    const [credentialsErros, setCredentialsError] = useState(null);
    const [inputs, setInputs] = useState({
        question: "",
        area,
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        correct_choice: "",
        image: ""

    });

    const [errors, setErrors] = useState({
        question: "",
        area,
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        correct_choice: "",
        image: ""
    });
    // changing input values 
    const changeHandler = (e) => {
        if (e.target.name !== 'image') {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value,
            });
        } else {
            setInputs({
                ...inputs, [e.target.name]: e.target.files[0]
            })
        }

    };

    const handleAddQuestions = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation
        const condition = (
            inputs.question.trim() === "" ||
            inputs.area.trim() === "" ||
            inputs.choice1.trim() === "" ||
            inputs.choice2.trim() === "" ||
            inputs.choice3.trim() === "" ||
            inputs.choice4.trim() === "" ||
            inputs.correct_choice.trim() === ""
        );

        if (condition) {
            alert("All fields are required");
            setLoading(false);
        } else {
            console.log(inputs)
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/addQuestionMCQ`,
                    inputs,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                if (response.data) {
                    setLoading(false);
                    // Reset inputs and errors
                    setInputs({
                        question: "",
                        area: "",
                        choice1: "",
                        choice2: "",
                        choice3: "",
                        choice4: "",
                        correct_choice: "",
                    });
                    setErrors({
                        questionError: false,
                        areaError: false,
                        choice1Error: false,
                        choice2Error: false,
                        choice3Error: false,
                        choice4Error: false,
                        correctChoiceError: false,
                    });
                }
            } catch (error) {
                setLoading(false);
                if (error.response && error.response.data && error.response.data.message) {
                    setCredentialsError(error.response.data.message);
                } else {
                    setCredentialsError("An error occurred while adding the question.");
                }
            }
        }
    };


    return (
        <Card id="delete-account">
            <MDBox pt={5} px={2}>
                {/* <MDTypography variant="h6" textAlign="center" fontWeight="medium">
                    Add {area} MCQ Questions
                </MDTypography>
                <Divider /> */}
            </MDBox>
            <MDBox pt={0} pb={2} px={2}>
                <Card
                    style={{
                        width: "70%",
                        margin: "0px auto"
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
                        <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                            Add {area} MCQ Questions
                        </MDTypography>
                    </MDBox>


                    <MDBox pt={4} pb={3} px={3}>
                        <MDBox component="form" role="form" method="POST" onSubmit={handleAddQuestions}>
                            <MDBox mb={2}>
                                <MDTypography variant='button' fontWeight="light">Question </MDTypography>
                                <MDInput
                                    type="text"
                                    label="Add New Question "
                                    fullWidth
                                    value={inputs.question}
                                    name="question"
                                    onChange={changeHandler}
                                    error={errors.emailError}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDTypography variant='button' fontWeight="light">Image</MDTypography>
                                <MDInput
                                    type="file"
                                    label=""
                                    fullWidth
                                    name="image"
                                    // value={inputs.password}
                                    onChange={changeHandler}
                                    error={errors.passwordError}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="text"
                                    label="Choice 1"
                                    fullWidth
                                    name="choice1"
                                    value={inputs.choice1}
                                    onChange={changeHandler}
                                    error={errors.passwordError}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="text"
                                    label="Choice 2"
                                    fullWidth
                                    name="choice2"
                                    value={inputs.choice2}
                                    onChange={changeHandler}
                                    error={errors.passwordError}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="text"
                                    label="Choice 3"
                                    fullWidth
                                    name="choice3"
                                    value={inputs.choice3}
                                    onChange={changeHandler}
                                    error={errors.passwordError}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="text"
                                    label="Choice 4"
                                    fullWidth
                                    name="choice4"
                                    value={inputs.choice4}
                                    onChange={changeHandler}
                                    error={errors.passwordError}
                                />
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="number"
                                    label="Correct Choice"
                                    fullWidth
                                    name="correct_choice"
                                    value={inputs.correct_choice}
                                    onChange={changeHandler}
                                    error={errors.passwordError}
                                />
                            </MDBox>
                            {/* <Select
                                style={{ width: '100%', height: '40px', textAlign: "start" }}
                                label=""
                                labelId="test-status-label"
                                id="test-status-select"
                                value={inputs.testStatus || "Select Status"}
                                onChange={(event) => {
                                    setInputs({
                                        ...inputs,
                                        testStatus: event.target.value,
                                    });
                                }}
                                disabled={inputs.testStatus === "Test Taken" || inputs.testStatus === "Evaluated"}
                                IconComponent={() => <ArrowDropDownIcon style={{ marginRight: '10px' }} />}
                            >
                                {inputs.testStatus === "Test Not Taken" ? (
                                    <MenuItem value="Test Cancelled">Cancel Test</MenuItem>
                                ) : null}
                                {inputs.testStatus === "Test Cancelled" ? (
                                    <MenuItem value="Test Not Taken">Test Not Taken</MenuItem>
                                ) : null}
                                {inputs.testStatus === "Evaluated" ? (
                                    <MenuItem value="Evaluated"> Evaluated</MenuItem>
                                ) : null}
                                {inputs.testStatus === "Test Taken" ? (
                                    <MenuItem value="Test Taken"> Test Taken</MenuItem>
                                ) : null}
                                {inputs.testStatus && inputs.testStatus !== "Test Taken" && inputs.testStatus !== "Evaluated" ? (
                                    <MenuItem value={inputs.testStatus}>{inputs.testStatus}</MenuItem>
                                ) : null}
                            </Select> */}

                            <MDBox mt={4} mb={1}>
                                {
                                    loading ? <MDButton disabled variant="gradient" color="warning" fullWidth>
                                        Adding Question...
                                    </MDButton> :
                                        <MDButton variant="gradient" color="info" fullWidth type="submit">
                                            Add Question
                                        </MDButton>
                                }



                            </MDBox>
                            {credentialsErros && (
                                <MDTypography variant="caption" color="error" fontWeight="light">
                                    {credentialsErros}
                                </MDTypography>
                            )}


                        </MDBox>
                    </MDBox>
                </Card>

                {/* <Row className="" >
          <div style={{display: 'flex', justifyContent: 'start',marginTop: '50px'}}>
            <button
              className="btn"
              onClick={handleProfileClick}
              style={{ backgroundColor: "#6BD8BA", fontFamily: "fantasy", display: 'flex', justifyContent: 'start' }}
            >
              <i class="fa-solid fa-arrow-left-long"></i>
            </button>
          </div>
        <Col lg="9">
          <Form style={{ marginTop: "40px" }}>
            <Form.Group controlId="questionTypeSelect">
              <Form.Label style={{ fontFamily: "revert-layer", fontWeight: "bold" }}>
                Please Select Your Question Type
              </Form.Label>
              <Form.Control
                as="select"
                className="form-select"
                value={selectedQuestionType}
                onChange={handleQuestionTypeChange}
              >
                //  <option value="">Select a question type</option> 
                <option value="MCQ">MCQ</option>
                <option value="">Other types coming soon</option>
                <option value="TEXT">Paragraph</option>
              </Form.Control>
            </Form.Group>
          </Form>
          {selectedQuestionType === "TEXT" && <AddParagraphQuestionsForm />}
          {selectedQuestionType === "MCQ" && <MCQForm />}
        </Col>
        
      </Row> */}
            </MDBox>

        </Card>


    );
};

export default AddQuestionsForm;
