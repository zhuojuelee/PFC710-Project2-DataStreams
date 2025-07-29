import type { PodItem, StatType } from "@/types";
import { useMemo } from "react";

type ChartData = {
  timestamp: number;
} & {
  [key in StatType]: number;
};

const getDesiredData = (type: StatType, data: PodItem[]) => {
  if (data.length === 0) {
    return [];
  }

  return data.map((podData) => ({
    timestamp: podData.timestamp,
    [type]: podData.podData[type],
  })) as ChartData[];
};

export default function (statType: StatType, podData: PodItem[]) {
  const podStats: ChartData[] = useMemo(() => {
    return getDesiredData(statType, podData);
  }, [statType, podData]);

  return podStats;
}
