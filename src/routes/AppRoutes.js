import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../views/pages/LoginPage';
import RegisterPage from '../views/pages/RegisterPage';
import EventsPage from '../views/pages/EventsPage';
import ScoresPage from '../views/pages/ScoresPage';
import EventsCalendarPage from '../views/pages/EventsCalendarPage';
import MusiciansPage from '../views/pages/MusiciansPage';
import MusicianDetailPage from '../views/pages/MusicianDetailsPage';
import MusicianFormPage from '../views/pages/MusicianFormPage';
import EventDetailsPage from "../views/pages/EventDetailsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/new" element={<EventDetailsPage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
      <Route path="/scores" element={<ScoresPage />} />
      <Route path="/calendar" element={<EventsCalendarPage />} />
      <Route path="/musicians" element={<MusiciansPage />} />
      <Route path="/musicians/:id" element={<MusicianDetailPage />} />
      <Route path="/musicians/new" element={<MusicianFormPage />} />
      <Route path="/musicians/:id/edit" element={<MusicianFormPage />} />
      <Route path="*" element={<EventsPage />} />
    </Routes>
  );
};

export default AppRoutes;
