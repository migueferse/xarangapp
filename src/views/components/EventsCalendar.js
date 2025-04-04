import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import eventsController from "../../controllers/eventsController";
import "../../styles/calendar.css";

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await eventsController.getAllEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = formatDate(date);
      const hasEvent = events.some((event) => event.date === formattedDate);
      return hasEvent ? <div className="event-dot" /> : null;
    }
    return null;
  };

  const selectedDayEvents = events.filter(
    (event) => formatDate(new Date(event.date)) === formatDate(date)
  );

  return (
    <div className="calendar-container">
      <h2>Calendario de Eventos</h2>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
      />

      <div className="event-details">
        <h3>Eventos del {date.toLocaleDateString()}</h3>
        {selectedDayEvents.length > 0 ? (
          <ul>
            {selectedDayEvents.map((event) => (
              <li key={event.id}>
                <strong>{event.name}</strong> - {event.place}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay eventos para esta fecha.</p>
        )}
      </div>
    </div>
  );
};

export default EventsCalendar;





// import React from 'react';

// const Calendar = () => {
//   return (
//     <div>
//       <h1>Welcome to the Calendar Component!</h1>
//     </div>
//   );
// };

// export default Calendar;
