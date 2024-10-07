import React, { useRef, ChangeEvent } from "react";
import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import { uploadCSV } from "../services/api";

interface UploadButtonProps {
    onUploadSuccess: () => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUploadSuccess }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        console.log("formData", formData.values());

        try {
            await uploadCSV(formData);
            onUploadSuccess();
            alert("CSV uploaded successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to upload CSV.");
        } finally {
            // Reset the input value to allow uploading the same file again if needed
            event.target.value = "";
        }
    };

    return (
        <>
            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <Button
                variant="contained"
                color="primary"
                startIcon={<UploadIcon />}
                onClick={handleButtonClick}
            >
                Upload CSV
            </Button>
        </>
    );
};

export default UploadButton;
