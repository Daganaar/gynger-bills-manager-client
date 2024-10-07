import React, { useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Bill } from "../types/Bill";

interface BillsTableProps {
    bills: Bill[];
    loading: boolean;
}

const BillsTable: React.FC<BillsTableProps> = ({ bills, loading }) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
        {
            pageSize: 10,
            page: 0,
        }
    );

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={400}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={400}
            >
                <CircularProgress />
            </Box>
        );
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "Bill Id", flex: 2 },
        { field: "vendorName", headerName: "Vendor Name", flex: 1 },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            flex: 1,
            align: "left",
            headerAlign: "left",
        },
        { field: "date", headerName: "Date", flex: 1 },
    ];

    const rows = bills.map((bill) => ({
        id: bill.id,
        vendorName: bill.vendorName,
        amount: bill.amount,
        date: bill.date,
    }));

    return (
        <div style={{ height: "60%", width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={(newModel) =>
                    setPaginationModel(newModel)
                }
                columnBufferPx={0}
                // pageSizeOptions={[10, 25, 50]} // Optional, for default size in the dropdown
            />
        </div>
    );
};

export default BillsTable;
