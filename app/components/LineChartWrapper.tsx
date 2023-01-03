"use client";

import { LineChart, Line, ResponsiveContainer, Tooltip, ReferenceDot, ReferenceDotProps } from "recharts";
import currency from "currency.js";

interface CustomReferenceDotProps extends ReferenceDotProps {
  dotPosition: "auto" | "hanging";
  isFirstOrLast?: boolean;
  title: number;
}

const CustomReferenceDot: React.FC<CustomReferenceDotProps> = (props) => {
  const textAnchor = !props.isFirstOrLast ? (props.dotPosition === "hanging" ? "end" : "start") : "middle";
  return (
    <svg textAnchor={textAnchor} dominantBaseline={props.dotPosition}>
      <text className="text-xs font-bold" x={props.cx} y={props.cy} fill="gray">
        {currency(props.title).format()}
      </text>
    </svg>
  );
};

interface LineChartWrapperProps {
  data: { name: string; uv: number }[];
  minPoint: { point: { name: string; uv: number }; idx: number };
  maxPoint: { point: { name: string; uv: number }; idx: number };
}

const LineChartWrapper: React.FC<LineChartWrapperProps> = (props) => {
  const { data, minPoint, maxPoint } = props;

  return (
    <ResponsiveContainer height={200}>
      <LineChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} dot={false} />
        <Tooltip />
        <ReferenceDot
          x={maxPoint.idx}
          y={maxPoint.point.uv}
          shape={<CustomReferenceDot title={maxPoint.point.uv} dotPosition="auto" />}
        />
        <ReferenceDot
          x={minPoint.idx}
          y={minPoint.point.uv}
          shape={<CustomReferenceDot title={minPoint.point.uv} isFirstOrLast dotPosition="hanging" />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartWrapper;
