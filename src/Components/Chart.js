import React, { useCallback, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Table from "./Table";

const Chart = () => {
  const [ChartData, setChartData] = useState({});

  useEffect(() => {
    fetch("tweetsdatatask.json")
      .then((response) => response.json())
      .then((data) => {
        const dates = data.stats.twitter.timelineStats.timeline; //array
        const categories =
          data.stats.twitter.timelineStats.timeline[0].sentimentAsCategories;
        //3 objects inside as categories

        const newBar = dates.map((date) => {
          const newDate = date.currentTimeStamp.split("T")[0];
          const positive = date.sentimentAsCategories.positiveTweets;
          const negative = date.sentimentAsCategories.negativeTweets;
          const neutral = date.sentimentAsCategories.neutralTweets;

          const newBar = { positive, negative, neutral, newDate };
          return newBar;
        });

        console.log("new value ", newBar);
        setChartData(newBar);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div
        className="flex justify-center items-center  bg-white  p-5"
        style={{ height: "100vh" }}
      >
        <div className="  ">
          <BarChart width={600} height={500} data={ChartData}>
            <XAxis dataKey="newDate" stroke="#8884d8" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 120, backgroundColor: "#ccc" }} />
            <Legend
              width={300}
              wrapperStyle={{
                bottom: 0,
                left: 250,

                backgroundColor: "#f5f5f5",
                border: "1px solid #d5d5d5",
                borderRadius: 3,
                lineHeight: "40px",
              }}
            />

            <Bar dataKey="positive" fill="#8884d8" />
            <Bar dataKey="negative" fill="#82ca9d" />
            <Bar dataKey="neutral" fill="#82cfff" />
          </BarChart>
        </div>
      </div>
      <Table></Table>
    </div>
  );
};

export default Chart;
