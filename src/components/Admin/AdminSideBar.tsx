import { Navbar, Group, ScrollArea, createStyles, rem, getStylesRef } from '@mantine/core';
import {
  // IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconUsers,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
// import { Logo } from './Logo';
import { UserButton } from './UserButton';
import { LinksGroup } from './NavbarLinkGroup';
import { NavLink } from 'react-router-dom';


const mockdata = [
  { label: 'Dashboard', icon: IconGauge,link:'/admin'},
  { label: 'Users', icon: IconUsers,link:'/users' },
  // {
  //   label: 'Market news',
  //   icon: IconNotes,
  //   initiallyOpened: true,
  //   links: [
  //     { label: 'Overview', link: '/' },
  //     { label: 'Forecasts', link: '/' },
  //     { label: 'Outlook', link: '/' },
  //     { label: 'Real time', link: '/' },
  //   ],
  // },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    link:"#",
    links: [
      { label: 'Upcoming releases', link: '#' },
      { label: 'Previous releases', link: '#' },
      { label: 'Releases schedule', link: '#' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics,link:'/analytics' },
  { label: 'Contracts', icon: IconFileAnalytics,link:'/contracts' },
  { label: 'Settings', icon: IconAdjustments,link:'/settings' },
  {
    label: 'Security',
    icon: IconLock,
    link:"#",

    links: [
      { label: 'Enable 2FA', link: '#' },
      { label: 'Change password', link: '#' },
      { label: 'Recovery codes', link: '#' },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },
}));

export function AdminSideBar() {
  const { classes } = useStyles();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <>
    <Navbar height={700} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          {/* <Logo width={rem(120)} /> */}
          {/* <Code sx={{ fontWeight: 700 }}>v3.1.2</Code> */}
      <UserButton
        image="../src/assets/images/muskhan.jpg"
        name="Muskhan Adikhari"
        email="narvash@gmail.com"
      />
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>

      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
      <NavLink to="/auth" className={classes.link} >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </NavLink>

        <NavLink to="/" className={classes.link} >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </NavLink>
      </Navbar.Section>
    </Navbar>
    
    </>
  );
}