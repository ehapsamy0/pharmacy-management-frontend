import React, { useEffect, useState } from "react";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import Layout from "../components/Layout";
import MedicationList from "../components/MedicationList";
import RefillRequestForm from "../components/RefillRequestForm";
import PendingRefillRequests from "../components/PendingRefillRequests";
import axiosInstance from "../api/axiosInstance";

// Simulate user role and data
const userRole = localStorage.getItem("userRole"); // Change to 'pharmacist' to simulate pharmacist role

function Dashboard() {
  const [medItem, setMedItem] = useState(null);
  const [refillRequests, setRefillRequests] = useState([]);
  const [completedrefillRequests, setCompletedRefillRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [loadingForCompleted, setLoadingForCompleted] = useState(true);

  const addToFillForm = (item) => {
    setMedItem(item);
  };
  useEffect(() => {
    const fetchRefillRequests = async () => {
      try {
        if (userRole == "patient") {
          const response = await axiosInstance.get("refill-requests/");
          setRefillRequests(response.data?.results);
          setLoading(false);
        } else {
          const response = await axiosInstance.get("refill-requests/pending/");
          setRefillRequests(response.data?.results);
          const response2 = await axiosInstance.get(
            "dashboard/completed-refills/"
          );
          setCompletedRefillRequests(response2.data);
          setLoading(false);

          setLoadingForCompleted(false);
        }
      } catch (error) {
        console.error("Failed to fetch refill requests", error);
        setLoading(false);

        setLoadingForCompleted(false);
      }
    };
    fetchRefillRequests();
  }, []);
  const handleFulfill = async (requestId) => {
    try {
      await axiosInstance.patch(`refill-requests/${requestId}/fulfill/`);
      setRefillRequests(
        refillRequests.filter((request) => request.id !== requestId)
      );
    } catch (error) {
      console.error("Failed to fulfill request", error);
    }
  };
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {userRole === "patient" && (
          <>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Medication List</Typography>
                  <MedicationList
                    medItem={medItem}
                    addToFillForm={addToFillForm}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Request Refill</Typography>
                  <RefillRequestForm medItem={medItem} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ marginTop: "20px" }}>
                <CardContent>
                  <Typography variant="h5"> Refill Requests</Typography>
                  <PendingRefillRequests
                    refillRequests={refillRequests}
                    loading={loading}
                    userRole={userRole}
                  />
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
        {userRole === "pharmacist" && (
          <>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Pending Refill Requests</Typography>
                  <PendingRefillRequests
                    userRole={userRole}
                    refillRequests={refillRequests}
                    loading={loading}
                    handleFulfill={handleFulfill}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    Compelted Refill Requests
                  </Typography>
                  <PendingRefillRequests
                    userRole={userRole}
                    refillRequests={completedrefillRequests}
                    loading={loadingForCompleted}
                    handleFulfill={handleFulfill}
                  />
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Layout>
  );
}

export default Dashboard;
