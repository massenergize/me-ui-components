import React from "react";
import MERichTextEditor from "../../MERichTextEditor/MERichTextEditor";

export default {
  component: MERichTextEditor,
  title: "Components/RichText Editor",
};

const Template = (args) => <MERichTextEditor {...args} />;

export const Default = Template.bind({});

Default.args = {
  value: "Here, this is the default value you know what I am talking about....",
  onChange: (text) =>
    console.log("this is the text after unmount my gee", text),
};
