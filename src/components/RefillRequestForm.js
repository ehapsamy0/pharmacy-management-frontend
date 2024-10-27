import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axiosInstance from "../api/axiosInstance";

const RefillRequestForm = ({ medItem }) => {
  const [medicationId, setMedicationId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("refill-requests/create/", {
        medication: medItem?.id,
        quantity_requested: quantity,
      });
      setSuccess("Refill request submitted successfully");
      setMedicationId("");
      setQuantity("");
    } catch (err) {
      setError("Failed to submit refill request");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {success && <Typography color="primary">{success}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        fullWidth
        disabled={true}
        value={medItem?.name}
        onChange={(e) => setMedicationId(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Quantity"
        fullWidth
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Request Refill
      </Button>
    </Box>
  );
};

export default RefillRequestForm;
