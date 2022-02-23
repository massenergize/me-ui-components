import React from "react";
import MERichTextEditor from "../../MERichTextEditor/MERichTextEditor";

export default {
  component: MERichTextEditor,
  title: "Components/RichText Editor",
};

const Template = (args) => <MERichTextEditor {...args} />;

export const Default = Template.bind({});
