import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  Select,
  ScrollArea,
  Navbar,
  createStyles,
  rem,
} from "@mantine/core";

interface UsersTableProps {
  data: {
    avatar: string;
    name: string;
    job: string;
    email: string;
    role: string;
  }[];
}

const rolesData = ["ADMIN", "CLIENT", "USER"];
const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    height: "max-content",
  },
  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function Users({ data }: UsersTableProps) {
  const { classes } = useStyles();

  const rows = data.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.avatar} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.email}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        <Select data={rolesData} defaultValue={item.role} variant="unstyled" />
      </td>
      <td>{Math.floor(Math.random() * 6 + 5)} days ago</td>
      <td>
        {Math.random() > 0.5 ? (
          <Badge fullWidth>Active</Badge>
        ) : (
          <Badge color="gray" fullWidth>
            Offline
          </Badge>
        )}
      </td>
    </tr>
  ));

  return (
    <>
      <Navbar p="md" className={classes.navbar}>
        <Navbar.Section className={classes.header}>
          <Group style={{ display: "flex", flexDirection: "column" }}>
            {/* <Logo width={rem(120)} /> */}
            {/* <Code sx={{ fontWeight: 700 }}>v3.1.2</Code> */}
            <img
              src="../src/assets/images/download.png"
              alt=""
              className="img-fluid diverge-logo okxa"
            />
            <h3>USERS</h3>
          </Group>
        </Navbar.Section>
      </Navbar>
      <ScrollArea>
        <Table miw={800} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role</th>
              <th>Last active</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
