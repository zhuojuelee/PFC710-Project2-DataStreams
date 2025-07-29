export interface DataResponse {
  data: PodItem[];
}

export interface PodItem {
  timestamp: number;
  podData: PodData;
}

export type StatType =
  | "cpu_usage_cores"
  | "memory_usage_mb"
  | "network_rx_bytes"
  | "network_tx_bytes";

export interface PodData {
  pod: string;
  cpu_usage_cores: number;
  memory_usage_mb: number;
  network_rx_bytes: number;
  network_tx_bytes: number;
}
