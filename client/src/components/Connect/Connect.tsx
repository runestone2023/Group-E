import {
  AspectRatio,
  Badge,
  Box,
  Center,
  Group,
  Image,
  SegmentedControl,
  Skeleton,
  Stack,
  Switch,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconBroadcast, IconBroadcastOff, IconSquareLetterH, IconSquareLetterU } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import uu from "../../assets/img/locations/uu.jpg";
import hust from "../../assets/img/locations/hust.png";

const Connect = () => {
  const { t } = useTranslation();
  const theme = useMantineTheme();

  return (
    <Group position="center" my="xl">
      <Stack spacing="xl">
        <Group position="apart">
          <Switch
            labelPosition="left"
            onChange={(value) => console.log(value)}
            size="lg"
            onLabel={<IconBroadcast color={theme.white} size="1.25rem" stroke={1.5} />}
            offLabel={<IconBroadcastOff color={theme.colors.gray[6]} size="1.25rem" stroke={1.5} />}
          />
          <Badge color="green" size="xl">
            {t("connect.connected")}
          </Badge>
        </Group>
        <Group>
          <Skeleton visible={false}>
            <Image height={600} src={uu} />
            {/* <Image src={hust} height={600} /> */}
          </Skeleton>
        </Group>
        <SegmentedControl
          // disabled={true}
          onChange={(value) => console.log(value)}
          // color="red.9"
          size="lg"
          data={[
            {
              value: "uppsala",
              label: (
                <Center>
                  <IconSquareLetterU size="1rem" stroke={1.5} />
                  <Box ml={10}>{t("location.uppsala")}</Box>
                </Center>
              ),
            },
            {
              value: "hanoi",
              label: (
                <Center>
                  <IconSquareLetterH size="1rem" stroke={1.5} />
                  <Box ml={10}>{t("location.hanoi")}</Box>
                </Center>
              ),
            },
          ]}
        />
      </Stack>
    </Group>
  );
};

export default Connect;
