import ROUTER from "@/config/router";
import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { IconScan, IconWifi } from "@tabler/icons-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
}

const MainLink = ({ icon, color, label, to }: MainLinkProps) => {
  const navigate = useNavigate();

  return (
    <UnstyledButton
      onClick={() => navigate(to, { replace: true })}
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

const MainLinks = () => {
  const { t } = useTranslation();

  const data = [
    {
      icon: <IconWifi size="1rem" />,
      color: "red",
      label: t("nav.connect"),
      to: ROUTER.NAV.CONNECT,
    },
    {
      icon: <IconScan size="1rem" />,
      color: "teal",
      label: t("nav.scan"),
      to: ROUTER.NAV.SCAN,
    },
  ];

  const links = data.map((link) => <MainLink {...link} key={link.label} />);

  return <div>{links}</div>;
};

export default MainLinks;
