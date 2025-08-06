import dataAtom from "@/atoms/dataAtom";
import usePodData from "@/hooks/usePodData";
import type { StatType } from "@/types";
import type { ChartConfig } from "@/components/ui/chart";
import { useAtomValue } from "jotai";
import { memo, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const formatTimestampToTime = (seconds: number) => {
  const date = new Date(seconds * 1000); // Convert to milliseconds

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const secs = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${secs}`;
};

type CardMeta = { title: string; description: string };
const CARD_META_DATA: Record<StatType, CardMeta> = {
  cpu_usage_cores: {
    title: "CPU Usage Cores",
    description: "The amount of CPU cores used as a percentage",
  },
  memory_usage_mb: {
    title: "Memory Usage (MB)",
    description: "The amount of memory used in megabytes",
  },
  network_rx_bytes: {
    title: "Network TX (bytes)",
    description: "The amount of traffic transmitted in bytes",
  },
  network_tx_bytes: {
    title: "Network RX (bytes)",
    description: "The amount of traffic received in bytes",
  },
};

interface PodChart {
  statType: StatType;
}

function PodChart(props: PodChart) {
  const { statType } = props;

  const { data: podData } = useAtomValue(dataAtom);
  const podStats = usePodData(statType, podData.data);

  const cardMetaData = useMemo(() => {
    const meta = CARD_META_DATA[statType];

    return (
      meta || {
        title: "Unknown Statistic",
        description: "None",
      }
    );
  }, [statType]);

  console.log("xx", podStats.length);

  return (
    <div className="my-5">
      <Card className="w-[600px] w-[800px]">
        <CardHeader>
          <CardTitle>{cardMetaData.title}</CardTitle>
          <CardDescription>{cardMetaData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={podStats}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => formatTimestampToTime(value)}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value) => `${statType}: ${value}`}
                  />
                }
              />
              <Line
                isAnimationActive={false}
                dataKey={statType}
                type="linear"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(PodChart);
