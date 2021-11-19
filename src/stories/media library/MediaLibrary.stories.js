import React from "react";
import MediaLibrary from "./MediaLibrary";

export default {
  title: "Components/MediaLibrary",
  component: MediaLibrary,
};

const Template = (args) => <MediaLibrary {...args} />;

export const Default = Template.bind({});
