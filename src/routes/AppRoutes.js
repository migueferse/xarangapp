import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../views/pages/LoginPage';
import EventsPage from '../views/pages/EventsPage';
import ScoresPage from '../views/pages/ScoresPage';
import CalendarPage from '../views/pages/CalendarPage';
import MusiciansPage from '../views/pages/MusiciansPage';
import MusicianDetailPage from '../views/pages/MusicianDetailsPage';
import EventDetailsPage from "../views/pages/EventDetailsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/new" element={<EventDetailsPage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
      <Route path="/scores" element={<ScoresPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/musicians" element={<MusiciansPage />} />
      <Route path="/musicians/new" element={<MusicianDetailPage />} />
      <Route path="/musicians/:id" element={<MusicianDetailPage />} />
      <Route path="*" element={<EventsPage />} />
    </Routes>
  );
};

export default AppRoutes;
