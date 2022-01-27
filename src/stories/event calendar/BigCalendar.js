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
            end: new Date("January 21, 2022 04:24:00"),
          },
          {
            title: "Another one bites the dust",
            start: new Date("January 21, 2022 05:14:00"),
            end: new Date("January 21, 2022 06:24:00"),
          },
          {
            title: "Going for a walk bro",
            start: new Date("January 21, 2022 07:24:00"),
            end: new Date("January 21, 2022 08:24:00"),
          },
          {
            title: "Whatever meerhn, this is the trenches",
            start: new Date("January 21, 2022 09:24:00"),
            end: new Date("January 21, 2022 10:24:00"),
          },
        ]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "week"]}
        onSelectEvent={(event, e) =>
          console.log("I am an event that has been clicked bro", e)
        }
        popup={true}
        showMultiDayTimes={true}
        eventPropGetter={() => ({
          style: {
            background: "green",
            color: "white",
            padding: 5,
            margin: 3,
            marginBottom: 0,
            borderRadius: 0,
          },
        })}
        onDrillDown={() => console.log("I am the on drilldown bro")}
        selectable={true}
        dayPropGetter={() => ({
          style: { background: "antiquewhite", border: "solid 2px green" },
        })}
      />
    </div>
  );
}
