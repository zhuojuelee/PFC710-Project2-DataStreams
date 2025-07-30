import { atomWithSuspenseQuery } from "jotai-tanstack-query";
import livefeedAtom from "../livefeedAtom";

const dataAtom = atomWithSuspenseQuery((get) => {
  const livefeedEnabled = get(livefeedAtom);
  return {
    queryKey: ["podData"],
    queryFn: async () => {
      const res = await fetch(
        "https://5hl5ndtltxhrl4sbflwdi3rd5e0lypyy.lambda-url.us-east-1.on.aws/podData"
      );
      if (!res.ok) {
        const errorRes = await res.json();
        return {
          error: errorRes.message ?? "Failed to fetch pod data",
          data: [],
        };
      }

      const data = await res.json();
      return {
        data: data.data,
      };
    },
    ...(livefeedEnabled && { refetchInterval: 2000 }),
  };
});

export default dataAtom;
