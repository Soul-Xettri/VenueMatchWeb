import { Grid } from "@mantine/core";
import { AdminSideBar } from "../AdminSideBar";
import { Users } from "./Users";

export default function Admin() {
  return (
    <div>
        <Grid>
      <Grid.Col span="content"><AdminSideBar /></Grid.Col>
      <Grid.Col span={9} > <Users data={[{
        avatar: "../src/assets/images/muskhan.jpg",
        name: "Muskhan Adikari",
        job: "Engineer",
        email: "narvasha@gmail.com",
        role: "ADMIN"
      },
      {
        avatar: "../src/assets/images/samjhana.jpg",
        name: "Samjhana Poudel",
        job: "Engineer",
        email: "samjhana20@gmail.com",
        role: "ADMIN"
      },
      {
        avatar: "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        name: "Hari Bahadur",
        job: "Designer",
        email: "hari@gmail.com",
        role: "CLIENT"
      },
      {
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        name: "Ramesh Gurung",
        job: "Designer",
        email: "rameshey@gmail.com",
        role: "CLIENT"
      },
      {
        avatar: "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
        name: "Sunil Shrestha",
        job: "Manager",
        email: "shresthsunil@gmail.com",
        role: "USER"
      }]}/>
     </Grid.Col>
    </Grid>
      
     
      
    </div>
  );
}
