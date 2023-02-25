import React, { useEffect, useState } from "react";

const Table = () => {
  const [TableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("twitter_table_datajson.json")
      .then((response) => response.json())
      .then((data) => {
        const tableData =
          data.stats.twitter.timelineStats.timeline[0].top20TweetsByFollowers;
        console.log("new table ", tableData);
        setTableData(tableData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Post date</th>
            <th>Likes</th>
            <th>Followers </th>
            <th>Share count</th>
            <th>Sentiment</th>
            <th>Emotion</th>
          </tr>
        </thead>
        <tbody>
          {TableData.map((table, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">{table.date.split("T")[0]}</div>
                  </div>
                </div>
              </td>
              <td>{table.retweets}</td>
              <td>{table.followers}</td>
              <td>{table.favorite_count}</td>
              <td
                style={{
                  backgroundColor:
                    table.sentimentPolarityLabel === "POSITIVE"
                      ? "#8884d8"
                      : table.sentimentPolarityLabel === "NEGATIVE"
                      ? "#82ca9d"
                      : "#82cfff",
                }}
              >
                {table.sentimentPolarityLabel}
              </td>

              <td>0</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
