import { useState, useEffect, createRef } from "react";
import axios from "../axios.js";
import AccountStats from "./AccountStats.js";
import ProposalStats from "./ProposalStats.js";
import ContractStats from "./ContractStats.js";
import JobStats from "./JobStats.js";

const SiteStats = () => {
  const [myData, setMyData] = useState();

  useEffect(() => {
    axios.get(`stats`).then((res) => {
      if (res.data.success === 1) {
        setMyData(res.data.message[0]);
        console.log(res);
      } else {
        axios.get(`global/stats`).then((res) => {
          if (res.data.success) {
            setMyData(res.data.message[0]);
            console.log(res);
          } else {
            console.log(res);
          }
        });
      }
    });
  }, []);

  return (
    <div className="site-stats">
      <h1>Site Statistics</h1>

      <table className="stats-table">
        <tr>
          <td>
           { (myData) && <AccountStats stats={myData} />}
          </td>
          <td>
          { (myData) &&<JobStats stats={myData} />}
          </td>
        </tr>

        <tr>
          <td>
          { (myData) && <ProposalStats stats={myData} />}
          </td>
          <td>
          { (myData) && <ContractStats stats={myData} />}
          </td>
        </tr>
      </table>
    </div>
  );
};

export default SiteStats;
