import React, { useState, useEffect } from "react";
import './css/Taxichoose.css';
import PgTaxi from '../PG/PgTaxi';
const stations = [
  "이촌나루터 수상택시 승강장",
  "서빙고 수상택시 승강장",
  "동작역 수상택시 승강장",
  "서래나루 수상택시 승강장",
  "반포 수상택시 승강장",
];

const prices = {
  "이촌나루터 수상택시 승강장-서빙고 수상택시 승강장": 17000,
  "이촌나루터 수상택시 승강장-동작역 수상택시 승강장": 10000,
  "이촌나루터 수상택시 승강장-서래나루 수상택시 승강장": 13000,
  "이촌나루터 수상택시 승강장-반포 수상택시 승강장": 15000,
  "서빙고 수상택시 승강장-이촌나루터 수상택시 승강장":17000,
  "서빙고 수상택시 승강장-동작역 수상택시 승강장": 15000,
  "서빙고 수상택시 승강장-서래나루 수상택시 승강장": 10000,
  "서빙고 수상택시 승강장-반포 수상택시 승강장": 7000,
  "동작역 수상택시 승강장-이촌나루터 수상택시 승강장":10000,
  "동작역 수상택시 승강장-서빙고 수상택시 승강장":15000,
  "동작역 수상택시 승강장-서래나루 수상택시 승강장": 7000,
  "동작역 수상택시 승강장-반포 수상택시 승강장": 12000,
  "서래나루 수상택시 승강장-이촌나루터 수상택시 승강장":13000,
  "서래나루 수상택시 승강장-서빙고 수상택시 승강장":10000,
  "서래나루 수상택시 승강장-동작역 수상택시 승강장":7000,
  "서래나루 수상택시 승강장-반포 수상택시 승강장": 4500,
  "반포 수상택시 승강장-이촌나루터 수상택시 승강장":15000,
  "반포 수상택시 승강장-서빙고 수상택시 승강장":7000,
  "반포 수상택시 승강장-동작역 수상택시 승강장":12000,
  "반포 수상택시 승강장-서래나루 수상택시 승강장":7000
};

const Taxichoose = () => {
  const [startpoint, setStartpoint] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (startpoint && endpoint) {
      setPrice(prices[`${startpoint}-${endpoint}`]);
    }
  }, [startpoint, endpoint]);

  return (
    <div className="taxi-stations-selector">
        <label htmlFor="startpoint"  className="taxilabel">출발지</label>
        <select
            className="taxiselect"
            id="startpoint"
            value={startpoint}
            onChange={(e) => {
                setStartpoint(e.target.value);
                if (e.target.value === endpoint) {
                    setEndpoint("");
                }
            }}
        >
        <option value="">출발 승강장 선택</option>
        {stations.map((station, index) => (
            <option key={index} value={station}>
                {station}
            </option>
        ))}
        </select>

        <label htmlFor="endpoint" className="taxilabel">도착지</label>
        <select
            className="taxiselect"
            id="endpoint"
            value={endpoint}
            onChange={(e) => {
                setEndpoint(e.target.value);
                if (e.target.value === startpoint) {
                    setStartpoint("");
                }
            }}
        >
        <option value="">도착 승강장 선택</option>
        {stations
            .filter((station) => station !== startpoint)
            .map((station, index) => (
                <option key={index} value={station}>
                    {station}
                </option>
        ))}
        </select>
        {price > 0 && (
            <div>
                <p>가격: {price.toLocaleString()}원</p>
            </div>
        )}
        <PgTaxi 
        startpoint={startpoint}
        endpoint={endpoint}
        amount={price}
        />
    </div>
    );
};

export default Taxichoose;