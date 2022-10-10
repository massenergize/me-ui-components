import React from "react";
import ImportComponent from "../import-and-export/Import";

export default {
  component: ImportComponent,

  title: "Components/Import & Export",
};

const Template = (args) => <ImportComponent {...args} />;

export const Import = Template.bind({});
