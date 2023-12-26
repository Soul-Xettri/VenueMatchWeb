import {
  Card,
  Image,
  Text,
  Group,
  Button,
  createStyles,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
  faUserGroup,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    // borderBottom: `${rem(1)} solid ${
    //   theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    // }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface BadgeCardProps {
  image: string;
  name: string;
  price: string;
  description: string;
  location: string;
  capacity: string;
  status:string
}

export function MoreDetail({
  image,
  name,
  description,
  price,
  location,
  capacity,
  status
}: BadgeCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={name} height={"100%"} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {name}
          </Text>
          <Text fz="lg" fw={500} color="#ff7b5f" size="sm">
            Rs {price}
          </Text>
        </Group>
        <Text className={classes.label} c="dimmed" style={{ marginTop: "5px" }}>
          {" "}
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{ height: "12px", marginRight: "5px", color: "#ff7b5f" }}
          />
          {location}
        </Text>

        <Group spacing={30} mt={"20px"}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FontAwesomeIcon
              icon={faUserGroup}
              style={{ marginRight: "5px", color: "#ff7b5f" }}
            />
            <Text
              className={classes.label}
              style={{ marginTop: "5px" }}
              c="dimmed"
            >
              {capacity} People
            </Text>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FontAwesomeIcon
              icon={faUtensils}
              style={{ marginRight: "5px", color: "#ff7b5f" }}
            />
            <Text
              className={classes.label}
              style={{ marginTop: "5px" }}
              c="dimmed"
            >
              Catering
            </Text>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ marginRight: "5px", color: "#ff7b5f" }}
            />
            <Text
              className={classes.label}
              style={{ marginTop: "5px" }}
              c="dimmed"
            >
              {status}
            </Text>
          </div>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Description
        </Text>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Book Now
        </Button>
      </Group>
    </Card>
  );
}
