import React from "react";
import EventCalendarView from "./EventCalendarView";

export default {
  component: EventCalendarView,
  title: "Components/Event Calendar View",
};

const Template = (args) => <EventCalendarView {...args} />;

export const Default = Template.bind({});

