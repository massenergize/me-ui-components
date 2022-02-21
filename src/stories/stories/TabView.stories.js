import React from "react";
import TabView from "../TabView/METabView";

export default {
  title: "Components/Tab View",
  Component: TabView,
};

const Template = (props) => <TabView {...props} />;

export const Default = Template.bind({});
Default.args = {
  tabs: [
    {
      key: "first-page",
      name: "First Landing page",
      component: <h1>This is the first page my gree</h1>,
    },
    {
      key: "second-page",
      name: "Second Landing page",
      component: <h1>This is the second page my gree</h1>,
    },
    {
      key: "third-page",
      name: "Third Landing page",
      component: <h1>This is the third page my gree</h1>,
    },
  ],
};
