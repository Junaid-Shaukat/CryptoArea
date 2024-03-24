import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { BaseUrl } from "../utils/BaseUrl";
import Loading from "./Loading";
import "../styles/Exchanges.css";
import OurModal from "./OurModel";

const Exchanges = () => {
  const [loading, setloading] = useState(true);
  const [exchanges, setExchanges] = useState([]);
  useEffect(() => {
    const getExchanges = async () => {
      const { data } = await axios.get(`${BaseUrl}/exchanges`);
      console.log(data);
      setExchanges(data);
      setloading(false);
    };
    getExchanges();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <OurModal/>
          <div>
            <h1 className="all-exchange">All <span>Exchanges</span></h1>
            {exchanges.map((data, i) => {
              return (
                <div className="ex-cards" key={i}>
                  <div className="image">
                    <img height={"80px"} src={data.image} alt="" />
                  </div>
                  <div className="name">{data.name}</div>
                  <div className="price">${data.trade_volume_24h_btc.toFixed(0)}</div>
                  <div className="rank">{data.trust_score_rank}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Exchanges;
