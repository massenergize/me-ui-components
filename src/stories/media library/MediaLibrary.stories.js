import React from "react";
import MediaLibrary from "./MediaLibrary";
import { dummyImages } from "./shared/utils/values";

export default {
  title: "Components/MediaLibrary",
  component: MediaLibrary,
};

const Template = (args) => <MediaLibrary {...args} />;

export const Default = Template.bind({});
Default.args = {
  images: dummyImages,
};
