import dataAtom from "@/atoms/dataAtom";
import { useAtomValue } from "jotai";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { memo, useCallback } from "react";

function RefetchButton() {
  const { refetch, isFetching } = useAtomValue(dataAtom);

  const onRefetchClick = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Button onClick={onRefetchClick}>
      {isFetching && <Loader2Icon className="animate-spin" />}
      Refetch Data
    </Button>
  );
}

export default memo(RefetchButton);
