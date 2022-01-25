import React from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale";
// Big Calendar Documentation : https://jquense.github.io/react-big-calendar/examples/index.html
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function BigCalendar() {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={[
          {
            title: "This is my first event bro",
            start: new Date("January 21, 2022 03:24:00"),
            end: new Date("February 21, 2022 04:24:00"),
            allDay: true,
          },
        ]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week"]}
        onSelectEvent={(event, e) =>
          console.log("I am an event that has been clicked bro", e)
        }
        toolbar={false}
        // defaultView={Views.AGENDA}
      />
    </div>
  );
}
