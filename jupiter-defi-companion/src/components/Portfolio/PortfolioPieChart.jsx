import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#10b981', '#8b5cf6', '#ec4899', '#22d3ee', '#f97316', '#eab308', '#6366f1'];

function PortfolioPieChart({ data }) {
  if (!data || data.length === 0) return null;

  console.log("📌 Pie Chart Data:", data);

  // Remove assets with both displayed value & actual value = 0
  const filteredData = data.filter(d => d.value > 0 || d.realValue > 0);

  if (filteredData.length === 0) {
    return (
      <div className="text-gray-400 text-sm mt-4 text-center">
        No assets with value to display in chart.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-jupiterDark rounded-xl p-4 shadow-lg mt-8 border border-jupiterCyan/20 w-full"
    >
      <h2 className="text-xl font-bold text-jupiterCyan mb-4 text-center sm:text-left">📈 Portfolio Breakdown</h2>
      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              fill="#8884d8"
              label={({ name, percent }) => 
                `${name} ${(percent * 100).toFixed(1)}%`
              }
              isAnimationActive={true}
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => {
                const realVal = props.payload.realValue || 0;
                return [`$${realVal.toFixed(4)}`, name];
              }}
              contentStyle={{
                background: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default PortfolioPieChart;
