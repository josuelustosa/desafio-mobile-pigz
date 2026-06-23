/**
 * @format
 */

import React from 'react';
import renderer, { act } from 'react-test-renderer';

import App from '../src/App';
import { persistor } from '../src/store';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);

describe('App', () => {
  afterEach(async () => {
    await persistor.flush();
    persistor.pause();
  });

  it('renders the initial screen', async () => {
    let component: renderer.ReactTestRenderer;

    await act(async () => {
      component = renderer.create(<App />);
    });

    expect(component!.toJSON()).toBeTruthy();

    await act(async () => {
      component!.unmount();
    });
  });
});
