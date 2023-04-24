import { Button, Card, Center, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock, IconUser } from "@tabler/icons-react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
// import { useAuthContext } from "../../hooks/contexts";
// import { LoginValues } from "../../contexts/AuthContext";
import ROUTER from "../../config/router";
// import { decodeToken } from "../../utils/token";

const Login = () => {
  const navigate = useNavigate();
  // const { login } = useAuthContext();
  const authUser = localStorage.getItem("authUser");

  const initialValues = { userName: "", password: "" };
  const form = useForm({ initialValues });

  if (authUser) {
    return <Navigate to={ROUTER.HOME.INDEX} replace={true} />;
  }

  return (
    <AuthLayout>
      <Text align="center" fw="700" fz={28}>
        TEAM E - LOGIN
      </Text>
      <Text align="center" color="dimmed" fz="xl">
        Welcome back. Please log in to continue.
      </Text>
      <Center mt="sm">
        <Card shadow="md" w={360}>
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Stack>
              <TextInput
                label="Username"
                placeholder="Enter your username..."
                icon={<IconUser size={14} />}
                {...form.getInputProps("userName")}
              />
              <TextInput
                label="Password"
                type="password"
                placeholder="Enter your password..."
                icon={<IconLock size={14} />}
                {...form.getInputProps("password")}
              />
              <Button color="secondary.8" variant="filled" fullWidth type="submit">
                LOGIN
              </Button>
            </Stack>
          </form>
        </Card>
      </Center>
    </AuthLayout>
  );
};

export default Login;
