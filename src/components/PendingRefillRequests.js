import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
} from "@mui/material";

const PendingRefillRequests = ({
  userRole,
  loading,
  refillRequests,
  handleFulfill,
}) => {
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <List>
      {refillRequests.map((request) => (
        <ListItem key={request.id}>
          <ListItemText
            primary={`Medication: ${request.medication?.name}`}
            secondary={`Requested by: ${request.patient}, Quantity: ${request?.medication?.quantity_requested}`}
          />
          {userRole == "pharmacist" && (
            <Button
              variant="contained"
              disabled={request?.is_fulfilled}
              color={request?.is_fulfilled ? "secondary" : "primary"}
              onClick={() => handleFulfill(request.id)}
            >
              {request?.is_fulfilled ? "Approved" : "Fulfill Request"}
            </Button>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default PendingRefillRequests;
