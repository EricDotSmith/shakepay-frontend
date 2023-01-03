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

type DataPoint = { name: string; uv: number };

interface PortfolioValueChartProps {
  data: DataPoint[];
  minPoint: { point: DataPoint; idx: number };
  maxPoint: { point: DataPoint; idx: number };
}

const PortfolioValueChart: React.FC<PortfolioValueChartProps> = (props) => {
  const { data, minPoint, maxPoint } = props;

  return (
    <>
      <ResponsiveContainer height={200}>
        <LineChart margin={{ top: 10, right: 20, bottom: 10, left: 20 }} data={data}>
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
      <div className="bg-orange-100 rounded-md text-orange-800 p-2 mx-2 text-sm shadow-sm shadow-gray-200">
        The data for the graph and other elements of this app are from two different api sources. They will be
        inconsistent.{" "}
        <a
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href="https://github.com/EricDotSmith/shakepay-frontend"
        >
          GitHub Link
        </a>
      </div>
    </>
  );
};

export default PortfolioValueChart;
