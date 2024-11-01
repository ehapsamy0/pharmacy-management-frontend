import React, { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Layout from '../components/Layout';
import axiosInstance from '../api/axiosInstance';

function AdminDashboard() {
  const [prescriptionSummary, setPrescriptionSummary] = useState({ requested_count: 0, filled_count: 0 });
  const [monthlyRefillRequests, setMonthlyRefillRequests] = useState([]);
  const [monthlyUserRegistrations, setMonthlyUserRegistrations] = useState([]);
  const [summaryData, setSummaryData] = useState({
    total_users: 0,
    total_patients: 0,
    total_pharmacists: 0,
    total_medications: 0,
    pending_refills: 0,
    completed_refills: 0,
  });
  useEffect(() => {
    const fetchPrescriptionSummary = async () => {
      try {
        const response = await axiosInstance.get('dashboard/prescription-summary/');
        setPrescriptionSummary(response.data);
      } catch (error) {
        console.error('Error fetching prescription summary:', error);
      }
    };

    const fetchMonthlyRefillRequests = async () => {
      try {
        const response = await axiosInstance.get('dashboard/refill-requests/monthly-count/');
        setMonthlyRefillRequests(response.data);
      } catch (error) {
        console.error('Error fetching monthly refill requests:', error);
      }
    };

    const fetchMonthlyUserRegistrations = async () => {
      try {
        const response = await axiosInstance.get('dashboard/user-registration-count/');
        setMonthlyUserRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching monthly user registrations:', error);
      }
    };

    fetchPrescriptionSummary();
    fetchMonthlyRefillRequests();
    fetchMonthlyUserRegistrations();
  }, []);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axiosInstance.get('dashboard/admin-summary/');
        setSummaryData(response.data);
      } catch (error) {
        console.error('Error fetching admin summary:', error);
      }
    };

    fetchSummaryData();
  }, []);

  // Data for Prescription Summary Pie Chart
  const prescriptionData = [
    { name: 'Requested', value: prescriptionSummary.requested_count },
    { name: 'Filled', value: prescriptionSummary.filled_count },
  ];

  // Colors for the Pie Chart
  const COLORS = ['#8884d8', '#82ca9d'];

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">{summaryData.total_users}</Typography>
                <Typography variant="body1">
                  Patients: {summaryData.total_patients} | Pharmacists: {summaryData.total_pharmacists}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Medications</Typography>
                <Typography variant="h4">{summaryData.total_medications}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Refill Requests</Typography>
                <Typography variant="body1">Pending: {summaryData.pending_refills}</Typography>
                <Typography variant="body1">Completed: {summaryData.completed_refills}</Typography>
              </CardContent>
            </Card>
          </Grid>
        {/* Prescription Summary Pie Chart */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Prescription Summary</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={prescriptionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {prescriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Refill Requests Bar Chart */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Monthly Refill Requests</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRefillRequests} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly User Registrations Bar Chart */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Monthly User Registrations</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyUserRegistrations} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default AdminDashboard;
