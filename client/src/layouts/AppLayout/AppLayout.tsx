import { Anchor, AppShell, Button, Group, Header, Image, LoadingOverlay, Menu, Navbar, Text } from "@mantine/core";
import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ROUTER from "../../config/router";
import { IconLogout } from "@tabler/icons-react";
import logo from "../../assets/img/logo.png";
import MainLinks from "./MainLinks";
import User from "./User";

export default function AppLayout() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <AppShell
        styles={{
          main: {
            maxWidth: "calc(100vw - 32px)",
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 280 }}>
            <Navbar.Section grow mt="0">
              <MainLinks />
            </Navbar.Section>
            <Navbar.Section>
              <User />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60}>
            <Group position="apart" sx={{ height: "100%" }} px={20}>
              <Group>
                <Anchor href={ROUTER.HOME.INDEX}>
                  <Image radius={4} src={logo} height={32} width={32} />
                </Anchor>
                <Text fw={600} fz="lg">
                  Mobility Mate - Group E
                </Text>
              </Group>
              <Group>
                <Button variant="subtle" color="red" leftIcon={<IconLogout size={20} />}>
                  Log Out
                </Button>
              </Group>
            </Group>
          </Header>
        }
      >
        <Suspense fallback={<LoadingOverlay color="secondary.9" visible />}>
          <Outlet />
        </Suspense>
      </AppShell>
    </>
  );
}
