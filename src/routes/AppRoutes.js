import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../views/pages/LoginPage';
import EventsPage from '../views/pages/EventsPage';
import ScoresPage from '../views/pages/ScoresPage';
import CalendarPage from '../views/pages/CalendarPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/scores" element={<ScoresPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="*" element={<EventsPage />} />
    </Routes>
  );
};

export default AppRoutes;
