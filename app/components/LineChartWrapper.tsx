"use client";

import { useState } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip, ReferenceDot, ReferenceDotProps } from "recharts";

interface ChartRangeButtonProps {
  rangeName: string;
  onClick: () => void;
  selected: boolean;
}

const ChartButton: React.FC<ChartRangeButtonProps> = (props) => {
  const { rangeName, onClick, selected } = props;
  return (
    <button
      type="button"
      className={`inline-flex items-center rounded-md ${
        selected ? "bg-white" : ""
      } px-3 py-2 text-sm font-medium leading-4 text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      onClick={onClick}
    >
      {rangeName}
    </button>
  );
};

interface CustomReferenceDotProps extends ReferenceDotProps {
  dotPosition: "auto" | "hanging";
  isFirstOrLast?: boolean;
}

const CustomReferenceDot: React.FC<CustomReferenceDotProps> = (props) => {
  const textAnchor = !props.isFirstOrLast ? (props.dotPosition === "hanging" ? "end" : "start") : "middle";
  return (
    <svg textAnchor={textAnchor} dominantBaseline={props.dotPosition}>
      <text className="text-xs font-bold" x={props.cx} y={props.cy} fill="gray">
        $13,200,999.55
      </text>
    </svg>
  );
};

const LineChartWrapper: React.FC = (props) => {
  const [rangeSelection, setRangeSelection] = useState<"1D" | "1W" | "1M" | "3M" | "ALL">("1D");

  return (
    <>
      <ResponsiveContainer height={200}>
        <LineChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          data={[
            {
              name: "Page A",
              uv: 4000,
              pv: 2400,
              amt: 2400,
            },
            {
              name: "Page B",
              uv: 3000,
              pv: 1398,
              amt: 2210,
            },
            {
              name: "Page A",
              uv: 3000,
              pv: 1400,
              amt: 400,
            },
            {
              name: "Page A",
              uv: 0, // 500 compress the bottom of graph so it allows min to be shown correctly (don't need to account for this edge case because its too rare)
              pv: 1400,
              amt: 400,
            },
            {
              name: "Page B",
              uv: 1000,
              pv: 398,
              amt: 210,
            },
          ]}
        >
          <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} dot={false} />
          <Tooltip />
          <ReferenceDot x={0} y={4000} shape={<CustomReferenceDot dotPosition="auto" />} />
          <ReferenceDot x={3} y={400} shape={<CustomReferenceDot isFirstOrLast dotPosition="hanging" />} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex w-full justify-evenly">
        <ChartButton
          rangeName="1D"
          onClick={() => {
            setRangeSelection("1D");
          }}
          selected={rangeSelection === "1D"}
        />
        <ChartButton
          rangeName="1W"
          onClick={() => {
            setRangeSelection("1W");
          }}
          selected={rangeSelection === "1W"}
        />
        <ChartButton
          rangeName="1M"
          onClick={() => {
            setRangeSelection("1M");
          }}
          selected={rangeSelection === "1M"}
        />
        <ChartButton
          rangeName="3M"
          onClick={() => {
            setRangeSelection("3M");
          }}
          selected={rangeSelection === "3M"}
        />
        <ChartButton
          rangeName="ALL"
          onClick={() => {
            setRangeSelection("ALL");
          }}
          selected={rangeSelection === "ALL"}
        />
      </div>
    </>
  );
};

export default LineChartWrapper;
