// src/pages/NotAuthorized.js
import React from 'react';
import { Typography } from '@mui/material';

function NotAuthorized() {
  return (
    <div>
      <Typography variant="h4" color="error">
        Not Authorized
      </Typography>
      <Typography>You do not have permission to view this page.</Typography>
    </div>
  );
}

export default NotAuthorized;
