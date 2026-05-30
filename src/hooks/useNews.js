import { useEffect, useMemo, useState } from "react";
import { fetchNewsSignals } from "../services/newsApi";

export function useNews({ query = "" } = {}) {
  const [payload, setPayload] = useState({
    categories: [],
    categoryColors: {},
    news: [],
    radarData: [],
    source: "loading",
  });
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    setStatus("loading");
    setError(null);

    fetchNewsSignals({ query, signal: controller.signal })
      .then((data) => {
        if (!active) return;
        setPayload(data);
        setError(data.error ? new Error(data.error) : null);
        setStatus("ready");
      })
      .catch((apiError) => {
        if (apiError.name === "AbortError") return;
        if (!active) return;
        setError(apiError);
        setStatus("error");
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [query]);

  const counts = useMemo(() => {
    const base = { all: payload.news.length };
    payload.news.forEach((item) => {
      base[item.cat] = (base[item.cat] || 0) + 1;
    });
    return base;
  }, [payload.news]);

  return { ...payload, counts, status, error };
}
