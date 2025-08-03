import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <div className="relative w-full h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}

            {/* center text was here before  */}

          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Text */}
      {showTextAnchor && (
        <div className="absolute inset-0 flex items-center  justify-center pointer-events-none">
          <svg width="100%" height="100%">
            <text

              x="50%"
              y="43%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="15px"
              fill="#666"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="24px"
              fontWeight="semi-bold"
              fill="#333"
            >
              {totalAmount}
            </text>
          </svg>
        </div>
      )}
    </div>
  );
};

export default CustomPieChart;
