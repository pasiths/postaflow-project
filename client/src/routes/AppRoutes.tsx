import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from '@/pages/auth/SignIn';
import SignUpPage from '@/pages/auth/SignUp';

import { ProtectedLayout } from '@/layout/ProtectedLayout';
// import PrivateRoute from '@/guards/PrivateRoute';
// import AuthenticatedRoute from '@/guards/AuthenticatedRoute';
import DashboardPage from '@/pages/dashbord/Dashboard';
import MailsPage from '@/pages/dashbord/mail/MailsPage';
import CustomerPage from '@/pages/dashbord/customer/CustomersPage';
import RoutingAreaPage from '@/pages/dashbord/routingArea/routingAreaPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes (no layout) */}
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected layout */}
        <Route element={<ProtectedLayout />}>
          {/* ADMIN only */}
          {/* <Route element={<PrivateRoute />}> */}
            <Route path="/" element={<DashboardPage />} />
            <Route path="/mails" element={<MailsPage />} />
            <Route path="/routingareas" element={<RoutingAreaPage />} />
            <Route path="/customers" element={<CustomerPage />} />
          {/* </Route> */}

          {/* ADMIN or CASHIER */}
          {/* <Route element={<AuthenticatedRoute />}>
            <Route path="/billing" element={<BillingPage />} />
          </Route> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
