import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import khaltilogo from "../../../../../assets/images/khaltilogo.png";
import {
  faCarrot,
  faDrumstickBite,
  faIceCream,
} from "@fortawesome/free-solid-svg-icons";

const capitalizeFirstLetter = (word: any) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "firstName",
    headerName: "User",
    width: 230,
    renderCell: (params: any) => {
      const capitalizedFirstName = capitalizeFirstLetter(params.row.firstName);
      const capitalizedLastName = capitalizeFirstLetter(params.row.lastName);
      return (
        <div className="cellWithImage">
          <img
            className="cellImage"
            src={
              params.row.profile_picture ??
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHBgsIBw8QEBAPGBYYDw0YDRUgFQogIBsgIiAbKB8kIS8lJCYmJR8fMDYtMTA3PkFAIytBOEE4N0AtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOYAzQMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAgEDB//EADIQAQACAQIEBAMHBAMAAAAAAAABAgMEEgURITETQVFhIlKBFCMyYqGxwUJxkaIzktH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/RAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQdZxKunmaU+K3p5VBOeTaK95iPqzmbiGXL3ttj0jojTabTztMz9Qanxq/NX/tD2MlbdrRP1ZQBrhlseovin7u0x9U/TcXmsxXURzj5o7guhxiyVzUi+OYmPV2AAAAAAAAAAAAAAADjLeMeO17doiZkFfxbW+FHg4p+KfxT8qkd5ck5clr37y4AAAAAABI0WrnS5d0dp/FX1aSl4yUi9J5xPaWTXXA8+7HbDb+nrALQAAAAAAAAAAAAABB4xfZorRH9UxCcq+Oz9xjj3/gFKAAAAAAAAmcKvs11PfnCG+2jnlq8U/mj9wagAAAAAAAAAAAAABV8ej7nHPvP7LRXcbrz0kT6TH8gogAAAAAAAH10sc9Tjj80fu+STw6u7W4o9waUAAAAAAAAAAAAABF4nTfockekc/8JTm9d9JrPn0Bkx1euy81ny5xLkAAAAAABP4LTdrN3yxP/iAueBY+WPJknznlALUAAAAAAAAAAAAAAAGe4vi8LWTaO1uqEvuM4PE03iR3p+yhAAAAAAAabQ4vB0lKT35dVFw7B4+rrWe0dZaUAAAAAAAAAAAAAAAAHlo3Vmtu092Y1eCdPqLY58u0+sNQgcV0n2jDvpHxV/2j0BQAAAAAl8O0v2nPyn8Netvf2BZ8H0/hafxLd7/pCweRHKOj0AAAAAAAAAAAAAAAAB5adtZtPk8veKV3XmIj1mVTxHiUXxzh0/Xn3t/AKu9t17W9ZlyAAACy4HflqL0nzjp9Fa+mHLOHLXJTvANUIml19NRERE8rfLKWAAAAAAAAAAAD46jU008c8toj285B9nNrRWOdpiI9ean1HGJt0wV5fmnur8ua2aeeW0z9QXmbimPF0rM2n2hAzcXvfpiiK/rKuAd5Mtstt2S0z/eXAAAAAAAAJODX5MHStpmPSesIwC4w8ZiemevL3hYYdVTP/wAVon282XP7A1wzmn4jkw9Oe6PSVnpuK0y8oyfBP6f5BYDyJ5xzh6AAA5vaKVm155RHefR0oOKazx8nh45+Cv8AsD7azi025003SPn85VdrTad1pmZnvPq8AAAAAAAAAAAAAAAAAAASNNrL6afu56fLPaV3otfXVfD2t8vqzj2szWYmvSY8/QGtELhus+1Ytt/x17/m900EHi2o8DTcq979I9vVn0/jOXxNXNY7VjkgAAAAAAAAAAAAAAAAAAAAAAA+2lzzp89ctfLvHq09bRasWr2nsyTQcHy+Jo4rM9azyBR6i/iZ739Zl8wAAAAAAAAAAAAAAAAAAAAAAATuG6r7PF4nz5IIDrabQA2m0ANptADabQA2m0ANptADabQA2m0ANptADabQA2m0ANptADabQB//2Q=="
            }
            alt="avatar"
          />
          {capitalizedFirstName} {capitalizedLastName}
        </div>
      );
    },
  },
  { field: "email", headerName: "Email", width: 230 },
  {
    field: "role",
    headerName: "Role",
    width: 160,
    renderCell: (params: any) => {
      return (
        <div className={`cellWithRole ${params.row.role}`}>
          {params.row.role}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: () => {
      return <div className={`cellWithStatus pending`}>coming soon</div>;
    },
  },
];

export const venueColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "venue",
    headerName: "Venue Name",
    width: 320,
    renderCell: (params: any) => {
      return (
        <div className="cellWithImage">
          <img className="cellImage" src={params.row.image} alt="venueImage" />
          {params.row.name}
        </div>
      );
    },
  },
  { field: "location", headerName: "Location", width: 350 },
  {
    field: "price",
    headerName: "Price",
    width: 160,
    renderCell: (params: any) => {
      return <>Nrs {params.row.price}</>;
    },
  },
];

export const categoryColumns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Category",
    width: 820,
    renderCell: (params: any) => {
      return (
        <div className="cellWithImage">
          <img
            className="cellImage"
            src={params.row.image}
            alt="categoryImage"
          />
          {params.row.name}
        </div>
      );
    },
  },
];

export const bookingColumns = [
  { field: "id", headerName: "Id", width: 60 },
  { field: "booked_date", headerName: "Booked Date", width: 110 },
  {
    field: "person",
    headerName: "Booked For",
    width: 110,
    renderCell: (params: any) => {
      return <>{params.row.person} People</>;
    },
  },
  {
    field: "venue_price",
    headerName: "Venue Price",
    width: 110,
    renderCell: (params: any) => {
      return <>Nrs {params.row.venue_price}</>;
    },
  },
  {
    field: "total_amount",
    headerName: "Total Paid",
    width: 110,
    renderCell: (params: any) => {
      return <>Nrs {params.row.total_amount}</>;
    },
  },
  {
    field: "payment_medium",
    headerName: "Payment Medium",
    width: 150,
    renderCell: (params: any) => {
      return (
        <div className="cellWithImage">
          <img
            className="cellImage"
            src={khaltilogo}
            alt="categoryImage"
            style={{ marginRight: "10px" }}
          />
          {params.row.payment_medium}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 95,
    renderCell: (params: any) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
  { field: "category_id", headerName: "Category_Id", width: 90 },
  { field: "venue_id", headerName: "Venue_Id", width: 90 },
];
// Define a map of dish types to FontAwesome icons
const dishTypeToIcon: { [key: string]: IconProp } = {
    "Non-veg": faDrumstickBite,
    Veg: faCarrot,
    Dessert: faIceCream,
  };
  
  export const dishColumns = [
    { field: "index", headerName: "Id", width: 90 },
    { field: "dish_id", headerName: "Dish_Id", width: 90 },
    {
      field: "dish_type",
      headerName: "Dish Type",
      width: 160,
      renderCell: (params: any) => {
        let backgroundColor = "";
        const icon = dishTypeToIcon[params.row.dish_type] || null;
  
        switch (params.row.dish_type) {
          case "Non-veg":
            backgroundColor = "red";
            break;
          case "Veg":
            backgroundColor = "green";
            break;
          case "Dessert":
            backgroundColor = "orange";
            break;
          default:
            backgroundColor = "white";
            break;
        }
  
        return (
          <div
            className="cellWithImage"style={{color:backgroundColor}}
          >
            {icon && (
              <FontAwesomeIcon icon={icon} style={{ marginRight: "10px",height:"20px" }}className="cellImage" />
            )}
            {params.row.dish_type}
          </div>
        );
      },
    },
    { field: "dish_name", headerName: "Dish Name", width: 180 },

  ];
