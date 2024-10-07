import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import BillsTable from "./components/BillsTable";
import UploadButton from "./components/UploadButton";
import { Bill } from "./types/Bill";
import { fetchBills } from "./services/api";

const App: React.FC = () => {
    const [bills, setBills] = useState<Bill[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const getBills = async () => {
        try {
            const data = await fetchBills();
            setBills(data);
        } catch (err) {
            setError("Failed to fetch bills.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBills();
    }, []);

    const handleUploadSuccess = () => {
        // Refresh the bills after a successful upload
        setLoading(true);
        getBills();
    };

    return (
        <Container maxWidth="lg">
            <Box my={4} textAlign="center">
                <Typography variant="h4" component="h1" gutterBottom>
                    Bill Manager
                </Typography>
            </Box>
            <Box mb={2} display="flex" justifyContent="flex-end">
                <UploadButton onUploadSuccess={handleUploadSuccess} />
            </Box>
            {error && (
                <Typography color="error" variant="body1">
                    {error}
                </Typography>
            )}
            <BillsTable bills={bills} loading={loading} />
        </Container>
    );
};

export default App;
