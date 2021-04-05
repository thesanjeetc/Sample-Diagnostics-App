import React, { useState } from "react";
import { Tile } from "../../Components/Base";
import BarChart from "../Charts/BarChart";
import LineChart from "../Charts/LineChart";
import DoughnutChart from "../Charts/DoughnutChart";
import { fetchUsage, fetchMemory } from "../API/SystemAPI";

const DoughnutMemory = () => {
  const [usage, setUsage] = useState(0);
  fetchMemory((mem) => setUsage(mem[0]));
  return (
    <Tile className="p-4">
      <p className="flex justify-center w-full font-mono text-center">
        Memory: {usage}%
      </p>
      <DoughnutChart callback={fetchMemory} />
    </Tile>
  );
};

const LineCPU = () => {
  const [usage, setUsage] = useState(0);
  fetchUsage((cpu) =>
    setUsage(Math.floor(cpu.reduce((a, b) => a + b) / cpu.length))
  );
  return (
    <Tile className="p-4">
      <p className="flex items-center justify-center w-full font-mono text-center">
        CPU: {usage}%
      </p>
      <LineChart callback={fetchUsage} />
    </Tile>
  );
};

const BarCPU = () => {
  return (
    <Tile className="p-4 items-center">
      <BarChart callback={fetchUsage} />
    </Tile>
  );
};

export { DoughnutMemory, BarCPU, LineCPU };
