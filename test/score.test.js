import getScores from './mocks/scoreMock';
import '@babel/polyfill';


test('fetches data name from LeaderBoard API', async () => {
  const scores = await getScores();

  expect(scores.user).toEqual('TestName');
  expect(typeof getScores()).toBe('object');
});

test('fetches data score from LeaderBoard API', async () => {
  const scores = await getScores();

  expect(scores.score).toEqual(250);
  expect(getScores()).not.toBe(undefined);
});