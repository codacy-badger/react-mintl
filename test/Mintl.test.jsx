import Mintl from '../src/index';

describe('Mintl initialization', () => {
  test('it should be not initialized', () => {
    expect(Mintl.initialized).toBe(false);
  });

  test('it shouldn\'t accepted an empty init object', () => {
    Mintl.init({});

    expect(Mintl.initialized).toBe(false);
  });

  test('it should\'nt accept an intialization w/o languages resources', () => {
    Mintl.init({ languages: ['pt', 'en'], currentLang: 'pt' });

    expect(Mintl.initialized).toBe(false);
  });

  test.todo('it should auto-assign the missing fields');
});