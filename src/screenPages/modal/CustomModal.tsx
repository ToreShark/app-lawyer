import React from "react";
import { Modal, Box } from "@mui/material";
import {CustomModalProps} from "../interface/CustomModalProps";

const CustomModal: React.FC<CustomModalProps> = ({ open, handleClose, children }) => {
    const modalContentStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        borderRadius: 3,
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalContentStyle}>{children}</Box>
        </Modal>
    );
};

export default CustomModal;