import "./DataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

export default function DishDataTable({
  title,
  tableColumns,
  tableRows,
  showAddNewButton,
  categoryImage,
  showCategoryImage,
}: any) {
  // const [tableData, setTableDate] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("")
  //     .then((response) => {
  //       setTableDate(response.data.venues);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data", error);
  //     });
  // }, []);
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <div>
        {showCategoryImage && (
        <img
          className="cellImage"
          src={categoryImage}
          alt="categoryImage"
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "10px",
          }}
        />
        )}
        {title}
        </div>
        {showAddNewButton && (
          <Link to="new" className="link">
            Add New
          </Link>
        )}
      </div>
      <DataGrid
        className="dataGrid"
        rows={tableRows}
        columns={tableColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
