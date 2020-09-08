import request from './mocks/apiRequestMock';
import { saveData } from './mocks/apiFetchMock';
import '@babel/polyfill';

test('Test if name and score input works', () => {
  const score = saveData('testMoonGlitch', 450);
  score.then(result => {
    expect(result).toBe('Everything is working just fine!');
  }).catch(() => 'Error found');
});

test('Test if data is being received from API', () => {
  const api = request.checkData();
  api.then(result => {
    expect(result[0].user).toBe('testMoonGlitch');
  });
});