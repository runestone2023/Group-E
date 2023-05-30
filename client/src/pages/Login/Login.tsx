import { Box, Button, Card, Center, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock, IconUser } from "@tabler/icons-react";
import { Navigate } from "react-router-dom";
import ROUTER from "../../config/router";
import AuthLayout from "../../layouts/AuthLayout";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  const authUser = localStorage.getItem("authUser");

  const initialValues = { userName: "", password: "" };
  const form = useForm({ initialValues });

  if (authUser) {
    return <Navigate to={ROUTER.HOME.INDEX} replace={true} />;
  }

  return (
    <AuthLayout>
      <Box pos="relative">
        <Text tt="uppercase" align="center" fw="700" fz={28}>
          {t("group")} E - {t("auth.login")}
        </Text>
        <Text align="center" color="dimmed" fz="xl">
          {t("auth.welcomeText")}
        </Text>
        <Center mt="sm">
          <Card shadow="md" w={360}>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Stack>
                <TextInput
                  label={t("auth.username")}
                  placeholder={t("auth.enterUsername")}
                  icon={<IconUser size={14} />}
                  {...form.getInputProps("userName")}
                />
                <TextInput
                  label={t("auth.password")}
                  type="password"
                  placeholder={t("auth.enterPassword")}
                  icon={<IconLock size={14} />}
                  {...form.getInputProps("password")}
                />
                <Button tt="uppercase" color="secondary.8" variant="filled" fullWidth type="submit">
                  {t("auth.login")}
                </Button>
              </Stack>
            </form>
          </Card>
        </Center>
      </Box>
    </AuthLayout>
  );
};

export default Login;
