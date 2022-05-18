import {renderHook, waitFor} from '@testing-library/react'
import {useRepositories} from "./useRepositories";
import {randDatabaseEngine, randProductDescription, randUrl} from "@ngneat/falso";

const name = randDatabaseEngine();
const description = randProductDescription();
const stars = 345841;
const url = randUrl();

const repositories = [
  {
    id: 1,
    name,
    description,
    stars,
    url,
  },
];

const items = [
  {
    id: 1,
    name,
    description,
    stargazers_count: stars,
    html_url: url,
  },
]

const response = {
  items,
}

describe('getRepositories hook', () => {
  beforeEach(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2022-05-11T09:45:28.120'));
  });

  test('should return list of repositories created from x days', async () => {
    console.log(JSON.stringify(response));
    fetchMock.mockResponse(JSON.stringify(response));
    const { result } = renderHook(() => useRepositories(7));

    await waitFor(() => expect(result.current.isLoading).toEqual(false));

    console.log(result);

    expect(result.current.repositories).toEqual(repositories);
    expect(fetchMock.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "https://api.github.com/search/repositories?q=created:>2022-05-04T08:45:28.120Z&sort=stars&order=desc",
  ],
]
`);
  });
});

