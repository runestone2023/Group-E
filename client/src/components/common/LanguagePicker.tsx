import { langs } from "@/locales/i18n";
import { Box, BoxProps, Select } from "@mantine/core";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface LanguagePickerProps {
  sx?: BoxProps["sx"];
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({ sx }) => {
  const { t } = useTranslation();

  const LangSelectData = useMemo(
    () =>
      Object.keys(langs).map((value) => ({
        label: t(`lang.${value}`),
        value: value,
      })),
    [t]
  );

  return (
    <Box sx={sx}>
      <Select
        size="xs"
        label={t("lang.choose")}
        defaultValue={localStorage.getItem("lang")}
        data={LangSelectData}
        onChange={(value) => {
          localStorage.setItem("lang", value ?? "vi");
          window.location.reload();
        }}
      />
    </Box>
  );
};

export default LanguagePicker;
