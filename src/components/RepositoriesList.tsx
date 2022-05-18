import React from "react";
import {useRepositories} from "../hooks/useRepositories";
import {RepositoryListItem} from "./RepositoriesListItem";
import cache from "../cache";

type Repository = {
  name: string;
  description: string;
  stars: string;
  id: number;
  isFavorite?: boolean;
}

const favoriteRepository = (id: number) => {
  cache.set(id, true);
}

const unfavoriteRepository = (id: number) => {
  cache.delete(id);
}

export const RepositoryList = () => {
  const { repositories, isLoading, isError, mutate } = useRepositories(7);

  if (isLoading) {
    return <span>loading</span>
  }

  return (
    <div>
      {
    repositories.map((repository: Repository) => {
      console.log(repository.isFavorite);
      return (
      // TODO add link to github
      <RepositoryListItem
        key={repository.id}
        id={repository.id}
        stars={repository.stars}
        description={repository.description}
        name={repository.name}
        isFavorite={repository.isFavorite || false}
        favoriteRepository={async (id) => {
          favoriteRepository(id);
          await mutate();
        }}
        unfavoriteRepository={async (id) => {
          unfavoriteRepository(id);
          await mutate();
        }}
    />
    );
  })}
  </div>)
};