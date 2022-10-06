

import React from "react";
import ImageCompression from "../compression/ImageCompression";


export default {
  component: ImageCompression,
  title: "Components/Compression",
};

const Template = (args) => <ImageCompression {...args} />;

export const Default = Template.bind({});

// Default.args = {
//   value: "Here, this is the default value you know what I am talking about....",
//   onChange: (text) =>
//     console.log("this is the text after unmount my gee", text),
// };
