import { Box, Center, Group, SegmentedControl } from "@mantine/core";
import { IconBroadcast, IconBroadcastOff } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const Connect = () => {
  const { t } = useTranslation();

  return (
    <Group position="center" my="xl">
      <SegmentedControl
        onChange={(value) => console.log(value)}
        data={[
          {
            value: "connected",
            label: (
              <Center>
                <IconBroadcast size="1rem" stroke={1.5} />
                <Box ml={10}>{t("connect.connected")}</Box>
              </Center>
            ),
          },
          {
            value: "disconnected",
            label: (
              <Center>
                <IconBroadcastOff size="1rem" stroke={1.5} />
                <Box ml={10}>{t("connect.disconnected")}</Box>
              </Center>
            ),
          },
        ]}
      />
    </Group>
  );
};

export default Connect;
