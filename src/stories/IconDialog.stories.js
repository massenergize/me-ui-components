import React from "react";
import IconDialog from "../icon dialog/IconDialog";

export default {
  title: "Components/ Icon Dialog",
  Component: IconDialog,
};

const Template = (props) => <IconDialog {...props} />;

export const Default = Template.bind({});
Default.args = { 
    defaultValue: "fa-home", 
    onIconSelected: (iconName) => console.log("I think this is the icon name my gee", iconName)
}