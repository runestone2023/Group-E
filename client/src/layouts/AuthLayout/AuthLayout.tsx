import { BackgroundImage, Box, Grid, MediaQuery, Stack } from "@mantine/core";
import React from "react";
import bg from "../../assets/img/bg.jpg";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <Grid style={{ width: "100vw" }} align="center" justify="center">
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Grid.Col p={0} md={7}>
          <BackgroundImage src={bg}>
            <Box
              sx={{
                minHeight: "100vh",
                maxHeight: "100vh",
              }}
            ></Box>
          </BackgroundImage>
        </Grid.Col>
      </MediaQuery>
      <Grid.Col xs={12} md={5}>
        <Stack spacing="xs">{children}</Stack>
      </Grid.Col>
    </Grid>
  );
};

export default AuthLayout;
