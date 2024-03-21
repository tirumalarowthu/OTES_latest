import React, { useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const generateResultColor = (final_result) => {
    if (final_result === "Pass") {
        return "success"
    } else if (final_result === "Fail") {
        return "error"
    } else {
        return "warning"
    }
}

function CandidateResultChangeModal({ open, onClose, onChangeResult }) {
    const handleResultChange = (result) => {
        onChangeResult(result);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: "absolute",borderRadius:"10px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <MDTypography variant="h6" component="h2">Do you really want to change the candidate result?</MDTypography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
                {/* <MDTypography variant="h6" mt={2}>Change Result : </MDTypography> */}
                <MDBox sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
                    <MDButton variant="contained" color="success" onClick={() => handleResultChange("Pass")}>Pass</MDButton>
                    <MDButton variant="contained" color="warning" onClick={() => handleResultChange("On Hold")}>On Hold</MDButton>
                    <MDButton variant="contained" color="error" onClick={() => handleResultChange("Fail")}>Fail</MDButton>
                    {/* <Button variant="contained" onClick={onClose}>Cancel</Button> */}
                </MDBox>
            </Box>
        </Modal>
    );
}

function ChangeResultModel({ result }) {
    const [showModal, setShowModal] = useState(false);
    const { email } = useParams()
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleChangeResult = async (result) => {
        // Implement logic to update candidate result
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/update/TestResult/${email}`, { result })
            toast.success(`Please wait,Changing result to: ${result}`, {
                style: {
                  fontSize: '16px', 
                },
                onClose: () => {
                  window.location.reload();
                }
              });
        } catch (error) {
            console.log(error)
        }
        closeModal();
    };

    return (
        <MDBox>
            <MDButton onClick={openModal} sx={{textDecoration :"underline", marginTop: '10px'}} variant="contained" color="primary" >
                {/* {result} */}
                Re-Evaluate
            </MDButton>
            <CandidateResultChangeModal open={showModal} onClose={closeModal} onChangeResult={handleChangeResult} />
        </MDBox>
    );
}

export default ChangeResultModel;
