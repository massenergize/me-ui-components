import React from "react";
import TestModalContainer from "./TestModalContainer";

export default {
  title: "TestModal",
  component: TestModalContainer,
};

const Template = (args) => <TestModalContainer {...args} />;

export const Default = Template.bind({});
