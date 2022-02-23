import React from "react";
import BigCalendar from "./BigCalendar";

export default {
  component: BigCalendar,
  title: "Components/From Big Calendar",
};

const Template = (args) => <BigCalendar {...args} />;

export const Default = Template.bind({});
