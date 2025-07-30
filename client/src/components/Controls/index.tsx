import dataAtom from "@/atoms/dataAtom";
import { useAtom, useAtomValue } from "jotai";
import { Button } from "@/components/ui/button";
import { Loader2Icon, CloudCheck } from "lucide-react";
import { memo, useCallback } from "react";
import livefeedAtom from "@/atoms/livefeedAtom";
import { cn } from "@/lib/utils";

function RefetchButton() {
  const { refetch, isFetching } = useAtomValue(dataAtom);
  const [livefeedEnabled, setLivefeedEnabled] = useAtom(livefeedAtom);

  const onEnableLivefeedClick = useCallback(() => {
    setLivefeedEnabled(!livefeedEnabled);
  }, [livefeedEnabled, setLivefeedEnabled]);

  const onRefetchClick = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex flex-row items-center gap-3">
      <Button
        className={cn(livefeedEnabled && "bg-chart-2")}
        onClick={onEnableLivefeedClick}
      >
        Live Feed
      </Button>
      <Button onClick={onRefetchClick}>
        {isFetching && livefeedEnabled ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <CloudCheck />
        )}
        Refetch Data
      </Button>
    </div>
  );
}

export default memo(RefetchButton);
