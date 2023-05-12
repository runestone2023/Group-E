import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { createStyles, Paper, Text, Title, Button, useMantineTheme, rem, Image, Stack, Center } from "@mantine/core";
import seFlag from "../../assets/img/flags/se.png";
import vnFlag from "../../assets/img/flags/vn.png";
import { useTranslation } from "react-i18next";
import Supervisor from "./Supervisor";
import supervisorImg from "../../assets/img/supervisor.jpg";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

interface CardProps {
  image: string;
  name: string;
  category: string;
  flag: string;
}

function Card({ image, name, category, flag }: CardProps) {
  const { classes } = useStyles();

  return (
    <Paper shadow="md" p="xl" radius="md" sx={{ backgroundImage: `url(${image})` }} className={classes.card}>
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.name}>
          {name}
        </Title>
      </div>
      <Image width={40} height={30} src={flag} />
    </Paper>
  );
}

const Home = () => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const data: CardProps[] = [
    {
      image:
        "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      name: "Ganeshkumar Pandiarajan",
      category: t(`team.pm`),
      flag: seFlag,
    },
    {
      image:
        "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      name: "Trần Tấn Dũng",
      category: t(`team.fe`),
      flag: vnFlag,
    },
    {
      image:
        "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      name: "Douglas Gådin",
      category: t(`team.be`),
      flag: seFlag,
    },
    {
      image:
        "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      name: "Trần Đức Huy",
      category: t(`team.fe`),
      flag: vnFlag,
    },
    {
      image:
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      name: "Petter Jerndal",
      category: t(`team.be`),
      flag: seFlag,
    },
    {
      image:
        "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      name: "Faheem Abdeen Kulam Magdoom",
      category: t(`team.des`),
      flag: seFlag,
    },
    {
      image:
        "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      name: "Trần Phúc Thành (James)",
      category: t(`team.fe`),
      flag: vnFlag,
    },
    {
      image:
        "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      name: "Johan Winman",
      category: t(`team.be`),
      flag: seFlag,
    },
  ];

  const slides = data.map((item) => (
    <Carousel.Slide key={item.name}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Stack>
      <Supervisor
        title={t("team.supervisor")}
        name="Phạm Ngọc Hưng"
        avatar={supervisorImg}
        email="hungpn@soict.hust.edu.vn"
        phone="users.soict.hust.edu.vn/hungpn"
      />
      <Carousel
        withIndicators
        slideSize="30%"
        breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: rem(2) }]}
        slideGap="xl"
        align="start"
        slidesToScroll={mobile ? 1 : 2}
      >
        {slides}
      </Carousel>
    </Stack>
  );
};

export default Home;
