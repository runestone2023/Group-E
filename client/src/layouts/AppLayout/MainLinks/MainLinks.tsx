import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { IconBroadcast, IconBroadcastOff, IconPlayerPause, IconPlayerPlay, IconPlayerStop } from "@tabler/icons-react";
import React from "react";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

const MainLink = ({ icon, color, label }: MainLinkProps) => {
  return (
    <UnstyledButton
      onClick={() => console.log(label)}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text fw={400} size="sm">
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  );
};

const data = [
  {
    icon: <IconBroadcast size="1rem" />,
    color: "blue",
    label: "CONNECT",
  },
  {
    icon: <IconBroadcastOff size="1rem" />,
    color: "red.9",
    label: "DISCONNECT",
  },
  {
    icon: <IconPlayerPlay size="1rem" />,
    color: "green",
    label: "START THE ROBOT",
  },
  {
    icon: <IconPlayerPause size="1rem" />,
    color: "yellow",
    label: "PAUSE ACTIONS",
  },
  {
    icon: <IconPlayerStop size="1rem" />,
    color: "red.5",
    label: "STOP THE ROBOT",
  },
];

const MainLinks = () => {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
};

export default MainLinks;
