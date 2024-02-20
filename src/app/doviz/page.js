"use client";
import ParaticLayout from "@/components/Layout";
import ParaticTable from "@/components/ParaticTable";
import { getSpotData } from "@/server/server";
import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("https://socket.paratic.com", {
  transports: ["websocket"],
  reconnection: true,
  path: "/v3",
});

let stabilData = [
  {
    _id: "o10",
    Description: "Amerikan Doları Türk Lirası",
    Last: 26.7576,
    Open: 26.7065,
    High: 26.922,
    Low: 26.5487,
    Bid: 26.7444,
    Ask: 26.7708,
    DailyChange: -0.0789,
    DailyChangePercent: -0.29,
    WeeklyChange: 0.0659,
    WeeklyChangePercent: 0.25,
    MonthlyChange: 0.0677,
    MonthlyChangePercent: 0.25,
    YearlyChange: 8.0561,
    YearlyChangePercent: 43.08,
    Direction: -1,
    DailyDirection: -1,
    Volatility: 1.41,
    PreviousClose: 26.8365,
    PreviousWeekClose: 26.6917,
    PreviousMonthClose: 26.6899,
    PreviousYearClose: 18.7015,
    WOWPreviousClose: 26.6899,
    MOMPreviousClose: 26.9624,
    YOYPreviousClose: 18.2151,
    LegacyCode: "USD/TRL",
    Code: "USDTRY",
    DateTime: 1694406263666,
    WOWLow: 26.4038,
    WOWHigh: 27.2329,
    MOMLow: 25.2549,
    MOMHigh: 27.4251,
    YOYLow: 18.208,
    YOYHigh: 27.4475,
    WTDLow: 26.4038,
    WTDHigh: 27.2329,
    WTDLowDate: 1693947600000,
    WTDHighDate: 1694034000000,
    MTDLow: 26.4038,
    MTDHigh: 27.2329,
    MTDLowDate: 1693947600000,
    MTDHighDate: 1694034000000,
    YTDLow: 18.6015,
    YTDHigh: 27.4475,
    YTDLowDate: 1673298000000,
    YTDHighDate: 1691010000000,
    pageID: "currency1",
  },
  {
    _id: "o11",
    Description: "Euro Türk Lirası",
    Last: 28.7691,
    Open: 28.6042,
    High: 28.963,
    Low: 28.4397,
    Bid: 28.6634,
    Ask: 28.875,
    DailyChange: 0.0395,
    DailyChangePercent: 0.14,
    WeeklyChange: -0.0366,
    WeeklyChangePercent: -0.13,
    MonthlyChange: -0.1977,
    MonthlyChangePercent: -0.68,
    YearlyChange: 8.7415,
    YearlyChangePercent: 43.65,
    Direction: -1,
    DailyDirection: 1,
    Volatility: 1.84,
    PreviousClose: 28.7296,
    PreviousWeekClose: 28.8057,
    PreviousMonthClose: 28.9668,
    PreviousYearClose: 20.0276,
    WOWPreviousClose: 28.9668,
    MOMPreviousClose: 29.6843,
    YOYPreviousClose: 18.2396,
    LegacyCode: "EUR/TRL",
    Code: "EURTRY",
    DateTime: 1694406264652,
    WOWLow: 28.2072,
    WOWHigh: 29.076,
    MOMLow: 27.3386,
    MOMHigh: 30.2292,
    YOYLow: 17.6326,
    YOYHigh: 30.7522,
    WTDLow: 28.2072,
    WTDHigh: 29.076,
    WTDLowDate: 1693774800000,
    WTDHighDate: 1694034000000,
    MTDLow: 28.2072,
    MTDHigh: 29.076,
    MTDLowDate: 1693774800000,
    MTDHighDate: 1694034000000,
    YTDLow: 19.6753,
    YTDHigh: 30.7522,
    YTDLowDate: 1672952400000,
    YTDHighDate: 1689714000000,
    pageID: "currency2",
  },
];

socket.emit("joinStream", {
  codes: ["USD/TRL", "EUR/TRL"],
});

export default function Doviz() {
  const [data, setData] = useState([]);
  const [changedData, setChangedData] = useState({});
  const [searchValue, setSearchValue] = useState();

  const prepareData = useCallback(async () => {
    setData(stabilData);
  }, []);

  useEffect(() => {
    prepareData();
  }, []);

  useEffect(() => {
    socket.on("spot_pariteler", (res) => {
      if (res.data.Direction !== undefined) {
        setChangedData(res.data);
      }
    });
    return () => {};
  }, [socket]);

  useEffect(() => {
    if (changedData) {
      stabilData.forEach((item) => {
        if (item._id === changedData.id) {
          item.Ask = changedData.Ask;
          item.Bid = changedData.Bid;
          item.DailyChange = changedData.DailyChange;
          item.DailyChangePercent = changedData.DailyChangePercent;
          item.DateTime = changedData.DateTime;
          item.Direction = changedData.Direction;
          item.Last = changedData.Last;
        }
      });

      if (searchValue) {
        const filteredItems = stabilData.filter((x) =>
          x.Description.toLowerCase().includes(searchValue.toLowerCase())
        );
        setData(filteredItems);
      } else {
        setData(stabilData);
      }
    }
  }, [changedData]);

  useEffect(() => {
    if (searchValue) {
      const filteredItems = stabilData.filter((x) =>
        x.Description.toLowerCase().includes(searchValue?.toLowerCase())
      );
      setData(filteredItems);
    } else {
      setData(stabilData);
    }
  }, [searchValue]);

  return (
    <ParaticLayout>
      <ParaticTable data={data} setSearchValue={setSearchValue} />
    </ParaticLayout>
  );
}
