import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  rem,
} from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface BadgeCardProps {
  id:number;
  image: string;
  name: string;
  location: string;
  price: string;
}

export function VenueCard({ image, name, price, location, id}: BadgeCardProps) {
  const { classes } = useStyles();


  return (
    
    <Card withBorder radius="lg" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={name} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {name}
          </Text>
          <Badge size="sm" style={{padding:"0",color:""}}><FontAwesomeIcon icon={faLocationDot} style={{height:"12px",marginRight:"5px",color:"#f4a492"}} />{location}</Badge>
        </Group>
        <Text fz="sm" mt="xs" >
          Rs. {price}
        </Text>
      </Card.Section>


      <Group mt="xs" style={{justifyContent:"center"}}>
        <div className="form-section overflow-hidden" style={{padding:0,background:"transparent"}}>
         <div className="banner-btn discover-btn-banner">
          <Link  to={`${id}`}>
            <button  type="submit" className="btn btn-primary venue" style={{width:"100%",paddingTop:"10px",paddingBottom:"10px"}}>
               Show details
            </button>
          </Link>
          </div>
          </div>
      </Group>
    </Card>
  );
}