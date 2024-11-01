// src/config/roleAccess.js
export const roleAccess = {
    patient: ['/dashboard'],
    pharmacist: ['/dashboard'],
    admin: ['/admin-dashboard', '/admin-settings'], // Example of multiple admin-only routes
  };
  