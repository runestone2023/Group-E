import alert from "@/assets/sound/alert.mp3";
import { useConnectionContext } from "@/hooks/context";
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
import {
  IconAlertCircle,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerStop,
  IconScan,
  IconSquareLetterH,
  IconSquareLetterU,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import PacmanLoader from "react-spinners/PacmanLoader";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  item: {
    "& + &": {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
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

  const { play: playAlertAudio, stop: stopAlertAudio } = useAudio({
    src: alert,
    loop: true,
  });

  const { state, testAPI, controlByCommand } = useConnectionContext();

  const handleAlert = () => {
    playAlertAudio();
    openConfirmModal({
      centered: true,
      children: (
        <Stack justify="center">
          <Alert
            title={t("connect.config.alert.modal.title")}
            icon={<IconAlertCircle size="1rem" />}
            color="red"
          >
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
        <Grid.Col span={7}>
          {/* <Card withBorder radius="md" p="xl" className={classes.card}>
            <Text fz="lg" className={classes.title} fw={500}>
              {t("connect.config.title")}
            </Text>
            <Text fz="xs" c="dimmed" mt={3} mb="xl">
              {t("connect.config.desc")}
            </Text>
            <Group
              position="apart"
              className={classes.item}
              noWrap
              spacing="xl"
            >
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
            <Group
              position="apart"
              className={classes.item}
              noWrap
              spacing="xl"
            >
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
                        <Box ml={10}>
                          {t("connect.config.location.uppsala")}
                        </Box>
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
            <Group
              position="apart"
              className={classes.item}
              noWrap
              spacing="xl"
            >
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
          </Card> */}
          <Card mt="md" withBorder radius="md" p="xl" className={classes.card}>
            <Group
              className={classes.item}
              noWrap
              spacing="xl"
              position="center"
            >
              <Button
                onClick={() => controlByCommand("Start")}
                color="teal"
                leftIcon={<IconScan size={"1rem"} />}
              >
                {t("control.button.scan")}
              </Button>
              <Button
                onClick={() => controlByCommand("Pause")}
                color="yellow"
                leftIcon={<IconPlayerPause size={"1rem"} />}
              >
                {t("control.button.pause")}
              </Button>
              <Button
                onClick={() => controlByCommand("Resume")}
                leftIcon={<IconPlayerPlay size={"1rem"} />}
              >
                {t("control.button.resume")}
              </Button>
              <Button
                onClick={() => controlByCommand("Stop")}
                color="red.7"
                leftIcon={<IconPlayerStop size={"1rem"} />}
              >
                {t("control.button.stop")}
              </Button>
            </Group>
          </Card>
        </Grid.Col>
        {/* <Grid.Col span={5}>
          <Stack align="center" justify="center" h="100%">
            <PacmanLoader
              color="#1864AB"
              loading={true}
              cssOverride={{
                display: "block",
                margin: "0 auto",
                borderColor: "red",
              }}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <Center>
              <Text fw={600}>Scanning...</Text>
              <Button onClick={() => testAPI()}>TestAPI</Button>
            </Center>
          </Stack>
        </Grid.Col> */}
      </Grid>
    </>
  );
};

export default Connect;
