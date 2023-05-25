import { langs } from "@/locales/i18n";
import { Avatar, Box, BoxProps, Group, Image, Select, Stack, Text } from "@mantine/core";
import React, { forwardRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import enFlag from "../../assets/svg/flags/en.svg";
import viFlag from "../../assets/svg/flags/vi.svg";
import seFlag from "../../assets/svg/flags/se.svg";

interface LanguagePickerProps {
  sx?: BoxProps["sx"];
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  flag: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ flag, label, description, ...others }: ItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Image width={20} height={15} src={flag} />
      <Stack spacing={0}>
        <Text size="xs">{label}</Text>
        <Text size="xs" opacity={0.65}>
          {description}
        </Text>
      </Stack>
    </Group>
  </div>
));

const LanguagePicker: React.FC<LanguagePickerProps> = ({ sx }) => {
  const { t } = useTranslation();

  const LangSelectData = useMemo(
    () =>
      Object.keys(langs).map((value) => ({
        label: t(`lang.${value}`),
        value: value,
        flag: getLangFlag(value),
        description: t(`lang.${`${value}-des`}`),
      })),
    [t]
  );

  function getLangFlag(lang: string) {
    switch (lang) {
      case "en":
        return enFlag;
      case "vi":
        return viFlag;
      case "se":
        return seFlag;
      default:
        return "";
    }
  }

  return (
    <Box sx={sx}>
      <Select
        itemComponent={SelectItem}
        size="xs"
        label={t("lang.choose")}
        defaultValue={localStorage.getItem("lang")}
        data={LangSelectData}
        onChange={(value) => {
          localStorage.setItem("lang", value ?? "en");
          window.location.reload();
        }}
      />
    </Box>
  );
};

export default LanguagePicker;
