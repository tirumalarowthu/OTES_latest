import { React, useEffect } from "react";
import { useNavigate } from "react-router";


const Instructions = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the localStorage data related to the assessment
    localStorage.removeItem("mcqquestions");
    localStorage.removeItem("selectedAnswers");
    localStorage.removeItem("hasFetched");
  }, []);

  const handleStart = () => {
    // navigate("/getMCQQuestionsForTest");
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <h2>Test Instructions</h2>
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
            onClick={handleStart}
            style={{
              backgroundColor: "#544CA4",
              fontFamily: "fantasy",
              marginLeft: "3px",
            }}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
