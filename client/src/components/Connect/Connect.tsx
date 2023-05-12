import { createStyles, Card, Group, Switch, Text, rem, Grid, SegmentedControl, Center, Box } from "@mantine/core";
import { IconSquareLetterH, IconSquareLetterU } from "@tabler/icons-react";
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
  const { classes } = useStyles();
  const { t } = useTranslation();

  const data: {
    title: string;
    description: string;
  }[] = [
    {
      description: "Connected",
      title: "Connected state",
    },
    {
      description: "Location",
      title: "Location",
    },
  ];

  const items = data.map((item) => (
    <Group position="apart" className={classes.item} noWrap spacing="xl">
      <div>
        <Text>{item.title}</Text>
        <Text size="xs" color="dimmed">
          {item.description}
        </Text>
      </div>
      <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" />
    </Group>
  ));

  return (
    <Grid>
      <Grid.Col span={6}>
        <Card withBorder radius="md" p="xl" className={classes.card}>
          <Text fz="lg" className={classes.title} fw={500}>
            {t("connect.config.title")}{" "}
          </Text>
          <Text fz="xs" c="dimmed" mt={3} mb="xl">
            {t("connect.config.desc")}{" "}
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
              // disabled={true}
              onChange={(value) => console.log(value)}
              // color="red.9"
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
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default Connect;
