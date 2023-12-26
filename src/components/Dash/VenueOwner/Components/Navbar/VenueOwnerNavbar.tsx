import "./Navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import ListIcon from "@mui/icons-material/List";

export default function VenueOwnerNavbar() {
  const [userImage, setUserImage] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  let userName = userFirstName + " " + userLastName;
  useEffect(() => {
    axios
      .get(``, {
        headers: {
          api_key: `${Cookies.get("apikey")}`,
        },
      })
      .then((response) => {
        setUserImage(response.data.profilePic);
        setUserFirstName(capitalizeFirstLetter(response.data.firstname));
        setUserLastName(capitalizeFirstLetter(response.data.lastname));
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  });
  const capitalizeFirstLetter = (word:any) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};
  return (
    <div className="navbar1">
      <div className="wrapper1">
        <div className="search1">
          <input type="text" placeholder="Search..." />
          <SearchIcon />
        </div>
        <div className="items1">
          <div className="item1 mobilenone" style={{gap:"5px"}}>
            <LanguageIcon className="icon1" />
            <span>English</span>
          </div>
          {/* <div className="item1 mobilenone">
            <DarkModeOutlinedIcon className="icon1 mobilenone" />
          </div>
          <div className="item1 mobilenone">
            <FullscreenExitIcon className="icon1" />
          </div>
          <div className="item1 mobilenone">
            <NotificationsNoneIcon className="icon1" />
            <div className="counter1">1</div>
          </div>
          <div className="item1 mobilenone">
            <ChatBubbleOutlineIcon className="icon1" />
            <div className="counter1">2</div>
          </div>
          <div className="item1 mobilenone">
            <ListIcon className="icon1"/>
            </div> */}
          <div className="item1">
            <Link to="/venue-owner-profile" style={{display:"flex"}}>
            <img
              src={
                userImage ??
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHBgsIBw8QEBAPGBYYDw0YDRUgFQogIBsgIiAbKB8kIS8lJCYmJR8fMDYtMTA3PkFAIytBOEE4N0AtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOYAzQMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAgEDB//EADIQAQACAQIEBAMHBAMAAAAAAAABAgMEEgURITETQVFhIlKBFCMyYqGxwUJxkaIzktH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/RAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQdZxKunmaU+K3p5VBOeTaK95iPqzmbiGXL3ttj0jojTabTztMz9Qanxq/NX/tD2MlbdrRP1ZQBrhlseovin7u0x9U/TcXmsxXURzj5o7guhxiyVzUi+OYmPV2AAAAAAAAAAAAAAADjLeMeO17doiZkFfxbW+FHg4p+KfxT8qkd5ck5clr37y4AAAAAABI0WrnS5d0dp/FX1aSl4yUi9J5xPaWTXXA8+7HbDb+nrALQAAAAAAAAAAAAABB4xfZorRH9UxCcq+Oz9xjj3/gFKAAAAAAAAmcKvs11PfnCG+2jnlq8U/mj9wagAAAAAAAAAAAAABV8ej7nHPvP7LRXcbrz0kT6TH8gogAAAAAAAH10sc9Tjj80fu+STw6u7W4o9waUAAAAAAAAAAAAABF4nTfockekc/8JTm9d9JrPn0Bkx1euy81ny5xLkAAAAAABP4LTdrN3yxP/iAueBY+WPJknznlALUAAAAAAAAAAAAAAAGe4vi8LWTaO1uqEvuM4PE03iR3p+yhAAAAAAAabQ4vB0lKT35dVFw7B4+rrWe0dZaUAAAAAAAAAAAAAAAAHlo3Vmtu092Y1eCdPqLY58u0+sNQgcV0n2jDvpHxV/2j0BQAAAAAl8O0v2nPyn8Netvf2BZ8H0/hafxLd7/pCweRHKOj0AAAAAAAAAAAAAAAAB5adtZtPk8veKV3XmIj1mVTxHiUXxzh0/Xn3t/AKu9t17W9ZlyAAACy4HflqL0nzjp9Fa+mHLOHLXJTvANUIml19NRERE8rfLKWAAAAAAAAAAAD46jU008c8toj285B9nNrRWOdpiI9ean1HGJt0wV5fmnur8ua2aeeW0z9QXmbimPF0rM2n2hAzcXvfpiiK/rKuAd5Mtstt2S0z/eXAAAAAAAAJODX5MHStpmPSesIwC4w8ZiemevL3hYYdVTP/wAVon282XP7A1wzmn4jkw9Oe6PSVnpuK0y8oyfBP6f5BYDyJ5xzh6AAA5vaKVm155RHefR0oOKazx8nh45+Cv8AsD7azi025003SPn85VdrTad1pmZnvPq8AAAAAAAAAAAAAAAAAAASNNrL6afu56fLPaV3otfXVfD2t8vqzj2szWYmvSY8/QGtELhus+1Ytt/x17/m900EHi2o8DTcq979I9vVn0/jOXxNXNY7VjkgAAAAAAAAAAAAAAAAAAAAAAA+2lzzp89ctfLvHq09bRasWr2nsyTQcHy+Jo4rM9azyBR6i/iZ739Zl8wAAAAAAAAAAAAAAAAAAAAAAATuG6r7PF4nz5IIDrabQA2m0ANptADabQA2m0ANptADabQA2m0ANptADabQA2m0ANptADabQB//2Q=="
              }
              alt=""
              className="avatar1"
              style={{marginRight:"5px"}}
            />
            <div className="item1 mobilenone">
            <h6 style={{fontSize:"20px",margin:"auto"}}className="itemTitle1">{userName}</h6> 
            </div>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
