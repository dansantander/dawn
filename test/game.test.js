import gameMock from './mocks/gameMock';

test('Receive an object in return when call gameRun', () => {
  const { game } = gameMock;
  expect(typeof game).toBe('object');
});