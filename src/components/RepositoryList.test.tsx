import React  from 'react';
import {fireEvent, render, screen} from '@testing-library/react'

import {RepositoryList} from "./RepositoriesList";

const repositories = [
  {
    id: 1,
    name: 'InnoDB',
    isFavorite: false,
    description: 'Re-contextualized grid-enabled portal',
    stars: 345841,
    url: '',
  },
  {
    id: 2,
    name: 'BLACKHOLE',
    description: 'Inverse contextually-based portal',
    isFavorite: true,
    stars: 194518,
    url: '',
  },
  {
    id: 3,
    name: 'MyISAM',
    isFavorite: false,
    description: 'Fundamental multi-tasking standardization',
    stars: 19127,
    url: '',
  }
]

describe('Repository List', () => {
  test('displays list of repositories', () => {
    const list = render(<RepositoryList repositories={repositories} favoriteRepository={jest.fn()} unfavoriteRepository={jest.fn()} />);
    expect(list).toMatchSnapshot();
  });

  test('favorite repository', async () => {
    const favorite = jest.fn();
    render(<RepositoryList repositories={repositories} favoriteRepository={favorite} unfavoriteRepository={jest.fn()} />)

    fireEvent.click(screen.getAllByText('Favorite')[0]);

    expect(favorite).toBeCalledWith(repositories[0].id);
  });

  test('unfavorite repository', async () => {
    const unfavorite = jest.fn();
    render(<RepositoryList repositories={repositories} favoriteRepository={jest.fn()} unfavoriteRepository={unfavorite} />)

    fireEvent.click(screen.getAllByText('Unfavorite')[0]);

    expect(unfavorite).toBeCalledWith(repositories[1].id);
  });
});
