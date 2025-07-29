import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import PodChart from "./components/PodChart";
import RefetchButton from "./components/RefetchButton";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <div className="p-5">
          <div className="flex justify-between">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
              POD Statistics
            </h1>
            <RefetchButton />
          </div>
          <div className="grid grid-cols-2 grid-rows-2">
            <PodChart statType="cpu_usage_cores" />
            <PodChart statType="memory_usage_mb" />
            <PodChart statType="network_rx_bytes" />
            <PodChart statType="network_tx_bytes" />
          </div>
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
