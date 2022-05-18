import useSWR from 'swr';
import {useEffect, useState} from "react";

import cache from "../cache";

function addFavoritesMiddleware(useSWRNext: (arg0: any, arg1: any, arg2: any) => any) {
  return (key: any, fetcher: any, config: any) => {
    const swr = useSWRNext(key, fetcher, config);

    const repositoriesWithFavorites = swr?.data?.map((r: Record<string, unknown>) => {
      if (cache.get(r.id)) {
        return {
          ...r,
          url: r.html_url,
          stars: r.stargazers_count,
          isFavorite: true,
        }
      } else {
        return {
          ...r,
          url: r.html_url,
          stars: r.stargazers_count,
        }
      }
    });

    return {
      ...swr,
      data: repositoriesWithFavorites,
    };
  }
}

// @ts-ignore
const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data.items);

export function useRepositories(numberOfDays: number) {
  const [date, setDate] = useState('');

  useEffect(() => {
    const sevenDaysAgo: Date = new Date(Date.now() - numberOfDays * 24 * 60 * 60 * 1000);
    setDate(sevenDaysAgo.toISOString());
  }, [numberOfDays]);

  const { data, error, mutate } = useSWR(date ? `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc` : null, fetcher, { use: [addFavoritesMiddleware] });

  return {
    repositories: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}