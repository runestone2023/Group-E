import alert from "@/assets/sound/alert.mp3";
import useAudio from "@/hooks/use-audio";
import {
  Alert,
  Box,
  Button,
  Card,
  Center,
  Grid,
  Group,
  SegmentedControl,
  Stack,
  Switch,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconAlertCircle, IconSquareLetterH, IconSquareLetterU } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  item: {
    "& + &": {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },
  },

  switch: {
    "& *": {
      cursor: "pointer",
    },
  },

  title: {
    lineHeight: 1,
  },
}));

const Connect = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { play: playAlertAudio, stop: stopAlertAudio } = useAudio({ src: alert, loop: true });

  const handleAlert = () => {
    playAlertAudio();
    openConfirmModal({
      centered: true,
      children: (
        <Stack justify="center">
          <Alert title={t("connect.config.alert.modal.title")} icon={<IconAlertCircle size="1rem" />} color="red">
            <Text>{t("connect.config.alert.modal.description")}</Text>
          </Alert>
        </Stack>
      ),
      labels: { confirm: t("system.button.confirm"), cancel: undefined },
      confirmProps: { color: "red" },
      cancelProps: { display: "none" },
      onConfirm: stopAlertAudio,
      closeOnClickOutside: false,
      withCloseButton: false,
    });
  };

  return (
    <>
      <Grid>
        <Grid.Col span={6}>
          <Card withBorder radius="md" p="xl" className={classes.card}>
            <Text fz="lg" className={classes.title} fw={500}>
              {t("connect.config.title")}
            </Text>
            <Text fz="xs" c="dimmed" mt={3} mb="xl">
              {t("connect.config.desc")}
            </Text>
            <Group position="apart" className={classes.item} noWrap spacing="xl">
              <div>
                <Text>{t("connect.config.connect.title")}</Text>
                <Text size="xs" color="dimmed">
                  {t("connect.config.connect.desc")}
                </Text>
              </div>
              <Switch
                onLabel={t("connect.config.connect.button.on")}
                offLabel={t("connect.config.connect.button.off")}
                className={classes.switch}
                size="lg"
              />
            </Group>
            <Group position="apart" className={classes.item} noWrap spacing="xl">
              <div>
                <Text>{t("connect.config.location.location")}</Text>
                <Text size="xs" color="dimmed">
                  {t("connect.config.location.desc")}
                </Text>
              </div>
              <SegmentedControl
                onChange={(value) => console.log(value)}
                data={[
                  {
                    value: "uppsala",
                    label: (
                      <Center>
                        <IconSquareLetterU size="1rem" stroke={1.5} />
                        <Box ml={10}>{t("connect.config.location.uppsala")}</Box>
                      </Center>
                    ),
                  },
                  {
                    value: "hanoi",
                    label: (
                      <Center>
                        <IconSquareLetterH size="1rem" stroke={1.5} />
                        <Box ml={10}>{t("connect.config.location.hanoi")}</Box>
                      </Center>
                    ),
                  },
                ]}
              />
            </Group>
            <Group position="apart" className={classes.item} noWrap spacing="xl">
              <div>
                <Text>{t("connect.config.alert.title")}</Text>
                <Text size="xs" color="dimmed">
                  {t("connect.config.alert.description")}
                </Text>
              </div>
              <Button color="red.7" onClick={handleAlert}>
                {t("connect.config.alert.buttonLabel")}
              </Button>
            </Group>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Connect;
