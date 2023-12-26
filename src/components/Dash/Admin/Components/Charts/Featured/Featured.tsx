import "./Featured.scss"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpOutlinedIcon  from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Featured() {
  const [totalAmount, setTotalAmount] = useState();
  const[value,setValue]=useState(0)
  useEffect(() => {
    axios
      .get("")
      .then((response) => {
        setTotalAmount(response.data.total_amount);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);
  useEffect(() => {
    if (totalAmount !== undefined) {
      const precision = 2; // Number of decimal places you want to display
      const value = (totalAmount / 100000) * 100;
      const roundedValue = value.toFixed(precision);
      setValue(parseFloat(roundedValue)); // Convert back to a floating-point number
    }
  }, [totalAmount]);

  return (
    <div className="featured1">
      <div className="top1">
        <div className="title1">Total Revenue</div>
        <MoreVertIcon fontSize="small" style={{cursor:"pointer"}}/>
      </div>
      <div className="bottom1">
        <div className="featuredChart1">
        <CircularProgressbar value={value} text={`${value} %`} strokeWidth={6}/>
        </div>
        <p className="title1">Total Revenue made this year</p>
        <p className="amount1">Nrs {totalAmount}</p>
        <p className="desc1">Previous transactions processing. Last payments may not be included.</p>
        <div className="summary1">
          <div className="item1">
            <div className="itemTitle1">Target</div>
            <div className="itemResult1 positive1">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount1">Nrs 100k</div>
            </div>
          </div>
          <div className="item1">
            <div className="itemTitle1">This Year</div>
            <div className="itemResult1 negative1">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount1">Nrs 100k</div>
            </div>
          </div>
          <div className="item1">
            <div className="itemTitle1">Last Year</div>
            <div className="itemResult1 positive1">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount1">Nrs 100k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
