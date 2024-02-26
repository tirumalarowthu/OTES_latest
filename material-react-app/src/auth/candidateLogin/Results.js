import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

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
      "Your test is submitted! Shortly, you will receive a mail regarding your results and further process."
    );

    setTimeout(() => {
      window.location.reload();
      localStorage.clear();
    }, 3000); // Delay of 5 seconds (5000 milliseconds)
  };

  return (
    <center>
      <div style={{ marginTop: "90px" }}>
        <p className="display-6">
          "Thank you for taking the test! Click the button to send your answers for grading. Good luck!"
        </p>
        <br />
        <button
          className="btn"
          onClick={buttonHandler}
          style={{ width: "170px", backgroundColor: "#6BD8BA" }}
        >
          Click here to finish
        </button>
      </div>
    </center>
  );
};

export default Results;
