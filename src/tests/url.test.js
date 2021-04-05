import { url, getScores } from '../lib/leaderboardApi';

global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({ result: [{ user: 'gzimm', score: 150 }] }),
}));

beforeEach(() => {
  fetch.mockClear();
});

test('getScores uses fetch and gives back score data in a nested array', () => {
  getScores(url)
    .then(data => {
      expect(data).toEqual([{ user: 'Gzim', score: 150 }]);
    });
});

test('getScores does not call another url', () => {
  getScores(url);
  expect(fetch).not.toHaveBeenCalledWith('https://google.com');
});

test('getScores only calls fetch once', () => {
  getScores(url);
  expect(fetch).toHaveBeenCalledTimes(1);
});