import React, { useEffect, useState } from "react";
import { BaseUrl } from "../utils/BaseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Loading from "./Loading";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CoinChart = ({ currency }) => {
    const [chartData, setChartData] = useState([]);
    const { id } = useParams();
    const [days, setDays] = useState(1);
    const CoinChartData = async () => {
        try {
            const { data } = await axios.get(
                `${BaseUrl}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
            );
            console.log(data.prices);
            setChartData(data.prices);
        } catch (error) {
            console.log("error");
        }
    };
    useEffect(() => {
        CoinChartData();
    }, [currency, id, days]);

    const myData = {
        labels: chartData.map((value) => {
            const date = new Date(value[0]);
            console.log(date);
            const time =
                date.getHours > 12
                    ? `${date.getHours() - 12} : ${date.getMinutes()}PM`
                    : `${date.getHours()}:${date.getMinutes()}AM`;
            return days === 1 ? time : date.toLocaleDateString();
        }),
        datasets: [
            {
                label: `Price In Past ${days}${"\t"}Days In ${currency}`,
                data: chartData.map((value) => value[1]),
                borderColor: 'orange',
                borderWidth: '2.5'
            }
        ]
    };

    return (
        <>
        {
            chartData.length === 0? (<Loading />) : (
              <div>
                <Line
                  data={myData}
                  options={{
                    elements: {
                      point: {
                        radius: 1,
                      },
                    },
                  }}
                  style={{ width: "55rem", marginTop: "5rem", marginLeft: "10px" }}
                />
                <div className="btn" id="chart-btns" style={{ marginTop: "30px", marginLeft: "20px" }}>
                  <button onClick={() => setDays(1)}>24 hours</button>
                  <button onClick={() => setDays(30)}>1 Month</button>
                  <button onClick={() => setDays(365)}>1 Year</button>
                </div>
              </div>
            )
                }
          </>
    );
};

export default CoinChart;
