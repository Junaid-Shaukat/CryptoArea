import React, { useEffect, useState } from "react";
import { BaseUrl } from "../utils/BaseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import "../styles/CoinDetails.css";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaArrowRightArrowLeft,
} from "react-icons/fa6";
import { IoIosPulse } from "react-icons/io";
import CoinChart from "./CoinChart";
const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const profit = coin.market_data?.price_change_percentage_24h > 0;
  const [currency, setCurrency] = useState("usd");
  const currSymbol = currency === "pkr" ? "Rs" : "$";
  useEffect(() => {
    const getCoinDetails = async () => {
      try {
        const { data } = await axios.get(`${BaseUrl}/coins/${id}`);
        console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCoinDetails();
  }, [id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="coin-detail">
            <div className="coin-info">
              <div className="btn">
                <button onClick={() => setCurrency("pkr")}>PKR</button>
                <FaArrowRightArrowLeft
                  className="arrows"
                  onClick={() => setCurrency("usd")}
                />
                <button onClick={() => setCurrency("usd")}>USD</button>
              </div>
              <div className="time">Last Updated : {coin.last_updated} </div>
              <div className="coin-image">
                <img src={coin.image.large} height={"150px"} alt="" />
              </div>
              <div className="coin-name">{coin.name}</div>
              <div className="coin-price">
                {currSymbol} {coin.market_data.current_price[currency]}
              </div>
              <div className="coin-profit">
                {coin.market_data.price_change_percentage_24h}
                {"\t"}%
                {profit ? (
                  <FaArrowTrendUp size={23} color="green" />
                ) : (
                  <FaArrowTrendDown size={23} color="red" />
                )}
              </div>
              <div className="market-rank">
                <IoIosPulse color="orange" />#{coin.market_cap_rank}
              </div>
              <div className="coin-desc">
                <p>{coin.description.en.split(".")[0]}</p>
              </div>
            </div>
            <CoinChart currency={currency} /> 
          </div>
        </>
      )}
    </>
  );
};

export default CoinDetails;
