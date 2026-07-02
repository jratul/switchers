import { useEffect, useState } from "react";

export default function useProductList<T>(url: string) {
  const [list, setList] = useState<T[]>([]);
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }

        return res.json();
      })
      .then((data) => {
        setList(data);
      })
      .catch(() => {
        setErrorDialogOpen(true);
      });
  }, [url]);

  return { list, errorDialogOpen, setErrorDialogOpen };
}
