import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';
import App from './App';
import { DEFAULT_SET, gameDataBySet } from './gameData';

const { baseItems, completedItems } = gameDataBySet[DEFAULT_SET];

beforeEach(() => {
  window.history.pushState({}, '', '/tft-items');
});

test('renders the default trainer route', () => {
  render(React.createElement(App));
  expect(screen.getByText(/which item should you take/i)).toBeInTheDocument();
});

test('whats missing keeps the prompt stable until an answer is chosen', () => {
  const randomSpy = jest.spyOn(Math, 'random');
  randomSpy.mockReturnValue(0.5);

  render(React.createElement(App));

  const targetItemSection = screen.getByText(/target item/i).parentElement;
  const currentComponentSection = screen.getByText(/current component/i).parentElement;

  expect(targetItemSection).not.toBeNull();
  expect(currentComponentSection).not.toBeNull();

  const targetItemName = within(targetItemSection as HTMLElement).getByRole('img').getAttribute('alt');
  const currentComponentName = within(currentComponentSection as HTMLElement).getByRole('img').getAttribute('alt');

  const targetItem = completedItems.find((item) => item.name === targetItemName);
  const currentComponent = baseItems.find((item) => item.name === currentComponentName);

  expect(targetItem).toBeDefined();
  expect(currentComponent).toBeDefined();

  const correctComponentId = targetItem!.components.find((componentId) => componentId !== currentComponent!.id) ?? currentComponent!.id;
  const correctComponent = baseItems[correctComponentId];

  expect(screen.getByText(/target item/i).nextElementSibling).toHaveTextContent(targetItem!.name);
  expect(screen.getByText(/current component/i).nextElementSibling?.querySelector(`img[alt="${currentComponent!.name}"]`)).not.toBeNull();

  fireEvent.click(screen.getByRole('button', { name: correctComponent.name }));

  expect(screen.getByText(/current streak/i).nextElementSibling).toHaveTextContent('1');
  expect(screen.getByText(/record/i).nextElementSibling).toHaveTextContent('1');
  expect(screen.queryByText(/the right component was/i)).not.toBeInTheDocument();

  randomSpy.mockRestore();
});

test('whats missing shows the correct icon when the answer is wrong', () => {
  const randomSpy = jest.spyOn(Math, 'random');
  randomSpy.mockReturnValue(0.5);

  render(React.createElement(App));

  const targetItemSection = screen.getByText(/target item/i).parentElement;
  const currentComponentSection = screen.getByText(/current component/i).parentElement;

  expect(targetItemSection).not.toBeNull();
  expect(currentComponentSection).not.toBeNull();

  const targetItemName = within(targetItemSection as HTMLElement).getByRole('img').getAttribute('alt');
  const currentComponentName = within(currentComponentSection as HTMLElement).getByRole('img').getAttribute('alt');

  const targetItem = completedItems.find((item) => item.name === targetItemName);
  const currentComponent = baseItems.find((item) => item.name === currentComponentName);

  expect(targetItem).toBeDefined();
  expect(currentComponent).toBeDefined();

  const correctComponentId = targetItem!.components.find((componentId) => componentId !== currentComponent!.id) ?? currentComponent!.id;
  const correctComponent = baseItems[correctComponentId];
  const wrongComponent = baseItems.find((item) => item.name !== correctComponent.name);

  expect(wrongComponent).toBeDefined();

  fireEvent.click(screen.getByRole('button', { name: wrongComponent!.name }));

  expect(screen.getByText(/the right component was/i)).toHaveTextContent(correctComponent.name);
  expect(screen.getAllByAltText(correctComponent.name).length).toBeGreaterThan(1);

  randomSpy.mockRestore();
});

test('what can you build shows the actual correct item after a wrong guess', () => {
  const randomSpy = jest.spyOn(Math, 'random');
  randomSpy
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0.38)
    .mockReturnValueOnce(0.28)
    .mockReturnValue(0.5);

  render(React.createElement(App));

  fireEvent.click(screen.getAllByRole('link', { name: /what can you build/i })[0]);

  const componentOneSection = screen.getByText(/component one/i).parentElement;
  const componentTwoSection = screen.getByText(/component two/i).parentElement;

  expect(componentOneSection).not.toBeNull();
  expect(componentTwoSection).not.toBeNull();

  const componentOneName = within(componentOneSection as HTMLElement).getByRole('img').getAttribute('alt');
  const componentTwoName = within(componentTwoSection as HTMLElement).getByRole('img').getAttribute('alt');

  const componentOne = baseItems.find((item) => item.name === componentOneName);
  const componentTwo = baseItems.find((item) => item.name === componentTwoName);

  expect(componentOne).toBeDefined();
  expect(componentTwo).toBeDefined();

  const expectedItem = completedItems.find((item) =>
    (item.components[0] === componentOne?.id && item.components[1] === componentTwo?.id) ||
    (item.components[0] === componentTwo?.id && item.components[1] === componentOne?.id)
  );

  expect(expectedItem).toBeDefined();

  const wrongGuess = completedItems.find((item) => item.name !== expectedItem?.name);

  expect(wrongGuess).toBeDefined();

  fireEvent.click(screen.getByRole('button', { name: wrongGuess!.name }));

  expect(screen.getByText(/the correct item was/i)).toHaveTextContent(expectedItem!.name);
  expect(screen.getAllByAltText(expectedItem!.name).length).toBeGreaterThan(1);

  randomSpy.mockRestore();
});
