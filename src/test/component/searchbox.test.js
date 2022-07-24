// import dependencies
import React from 'react'

// import react-testing methods
import { render, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import CustomizedInputBase from '../../component/searchBox.js';

beforeEach(() => {
  // setup a DOM element as a render target
});

afterEach(() => {
  // cleanup on exiting
});

it("changes value when clicked", () => {
  const onChange = jest.fn();
  const expectedValue = "testValue";
  const testCount = 5;

  const container = render(<CustomizedInputBase onChange={onChange} />);
  const textInput = container.getByPlaceholderText('Search Image By Tags');
  const searchButton = container.getByLabelText('search');

  expect(textInput.value).toBe("");
  
  userEvent.type(textInput, expectedValue);
  fireEvent.click(searchButton);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(textInput.value).toBe(expectedValue);
  expect(onChange.mock.calls[0][0]).toBe(expectedValue);

  userEvent.clear(textInput);
  onChange.mockClear();
  

  for (let i = 0; i < testCount; i++) {
    userEvent.type(textInput, expectedValue+ i);
    fireEvent.click(searchButton);

    console.log(textInput.value, i)
    expect(onChange).toHaveBeenCalledTimes(i+1);
    expect(onChange.mock.calls[i][0]).toBe(expectedValue + i);
    expect(textInput.value).toBe(expectedValue + i);

    userEvent.clear(textInput);
  }

  expect(onChange).toHaveBeenCalledTimes(testCount);
});