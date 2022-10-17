import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { FunctionComponent } from "react";
import Header from "./header";

export default {
  title: "Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<FunctionComponent> = (): JSX.Element => {
  return <Header />;
};

export const HeaderExample: ComponentStory<typeof Header> = Template.bind({});
