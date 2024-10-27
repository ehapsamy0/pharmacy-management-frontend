import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";

const MedicationList = ({ addToFillForm, medItem }) => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axiosInstance.get("medications/");
        // Ensure that the response is an array, otherwise set an empty array
        console.log();
        setMedications(
          Array.isArray(response.data?.results) ? response.data.results : []
        );
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch medications", error);
        setLoading(false);
      }
    };
    fetchMedications();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!medications.length) {
    return <p>No medications available</p>; // Display message if no medications
  }

  return (
    <List>
      {medications.map((medication) => (
        <ListItem key={medication.id}>
          <ListItemText
            primary={medication.name}
            secondary={`Available Quantity: ${medication.quantity_available}`}
          />
          <Button onClick={() => addToFillForm(medication)}>
            {medItem?.id == medication?.id ? "Added" : "Add to Request"}{" "}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default MedicationList;
