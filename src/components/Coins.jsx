import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { BaseUrl } from "../utils/BaseUrl";
import Loading from "./Loading";
import "../styles/Exchanges.css";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Coins = () => {
  const [loading, setloading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const currSymbol = currency === "pkr" ? "Rs" : "$";
  const [search, setSearch] = useState("");
  useEffect(() => {
    const getCoinsData = async () => {
      const { data } = await axios.get(
        `${BaseUrl}/coins/markets?vs_currency=${currency}`
      );
      console.log(data);
      setCoins(data);
      setloading(false);
    };
    getCoinsData();
  }, [currency]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Your Coins "
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="btns">
            <button onClick={() => setCurrency("pkr")}>PKR</button>
            <FaArrowRightArrowLeft
              className="arrow"
              onClick={() => setCurrency(!currency)}
            />
            <button onClick={() => setCurrency("usd")}>USD</button>
          </div>
          <div>
            {
              coins.filter((data) => {
                if (data == '') {
                  return data;
                }
                else if (data.name.toLowerCase().includes(search.toLowerCase())) {
                return data;
              }})
            .map((coinData, i) => {
              return (
            <>
              <CoinCards
                coinData={coinData}
                i={i}
                currSymbol={currSymbol}
                id={coinData.id}
              />
            </>
            );
            })}
          </div>
        </>
      )}
    </>
  );
};

const CoinCards = ({ coinData, i, currSymbol, id }) => {
  const profit = coinData.price_change_percentage_24h > 0;
  return (
    <Link
      to={`/coins/${id}`}
      style={{ color: "white", textDecoration: "none" }}
    >
      <div className="ex-cards" key={i}>
        <div className="image">
          <img height={"80px"} src={coinData.image} alt="" />
        </div>
        <div className="name">{coinData.name}</div>
        <div className="price">
          {currSymbol} {"\t"}
          {coinData.current_price.toFixed(0)}
        </div>
        <div
          style={profit ? { color: "green" } : { color: "red" }}
          className="rank"
        >
          {profit
            ? "+" + coinData.price_change_percentage_24h.toFixed(2)
            : coinData.price_change_percentage_24h.toFixed(2)}
        </div>
      </div>
    </Link>
  );
};

export default Coins;
