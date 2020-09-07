import Hero from '../src/modules/characters/hero';

jest.mock('../src/modules/characters/hero');

let hero;

beforeEach(() => {
  hero = new Hero('GameScene', 200, 400, 'heroRun');
});

test('Test if hero is created as an object element', () => {
  expect(typeof hero).toBe('object');
});

test('Test if a hero is created correctly, it is not undefined', () => {
  expect(hero).not.toBe(undefined);
});

test('Test if a wizard constructor is called when a hero is created', () => {
  expect(Hero).toHaveBeenCalled();
});