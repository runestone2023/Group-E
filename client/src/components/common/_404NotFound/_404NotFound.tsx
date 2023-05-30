import { Anchor, Stack, Text } from "@mantine/core";
import ROUTER from "../../../config/router";
import { useTranslation } from "react-i18next";

const _404NotFound = () => {
  const { t } = useTranslation();

  return (
    <Stack spacing="sm" align="center" justify="center">
      <Text c="black.8" fz={28} fw={700}>
        {t("404.title")}
      </Text>
      <Text c="black.8" fz="xl">
        {t("404.desc")}
      </Text>
      <Text c="black.8" fz="xl">
        {t("404.return")}
        &nbsp;
        <Anchor href={ROUTER.HOME.INDEX} color="primary.9" underline={false}>
          <Text span inherit fw={500} fz="xl">
            {t("404.home")}
          </Text>
        </Anchor>
      </Text>
    </Stack>
  );
};

export default _404NotFound;
