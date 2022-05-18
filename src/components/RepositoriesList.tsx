import React from "react";
import {RepositoryListItem} from "./RepositoriesListItem";

export type Repository = {
  name: string;
  description: string;
  stars: number;
  id: number;
  url: string;
  isFavorite?: boolean;
}

type RepositoryListProps = {
  repositories: Repository[],
  favoriteRepository: (id: number) => void
  unfavoriteRepository: (id: number) => void
}

export const RepositoryList = ({ repositories, favoriteRepository, unfavoriteRepository }: RepositoryListProps) => {
  return (
    <>
      {repositories.map((repository: Repository) => {
        return (
          <RepositoryListItem
            key={repository.id}
            id={repository.id}
            stars={repository.stars}
            description={repository.description}
            name={repository.name}
            isFavorite={repository.isFavorite || false}
            handleOnClick={() => {
              window.location.href = repository.url;
            }}
            favoriteRepository={favoriteRepository}
            unfavoriteRepository={unfavoriteRepository}
          />
        );
      })}
  </>);
};