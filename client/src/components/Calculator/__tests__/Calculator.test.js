import React from 'react';
import { render, fireEvent, cleanup, wait, } from '@testing-library/react';
import Calculator from '../Calculator';
import { calculateCall } from '../../../api/calculate'

afterEach(cleanup);

jest.mock("../../../api/calculate");

describe("<Calculator /> component", () => {
  test('all components buttons should work', () => {
    const {getByText, getByTestId} = render(
      <Calculator/>
    );
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('4'));
    fireEvent.click(getByText('5'));
    fireEvent.click(getByText('6'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('7'));
    fireEvent.click(getByText('-'));
    fireEvent.click(getByText('8'));
    fireEvent.click(getByText('/'));
    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('*'));
    fireEvent.click(getByText('0'));
    fireEvent.click(getByText('.'));
    
    const countTextNode = getByTestId('result');
    expect(countTextNode).toHaveTextContent('123456+7-8/9*0.')
    fireEvent.click(getByText('CE'));
    expect(countTextNode).toHaveTextContent('123456+7-8/9*0')
    fireEvent.click(getByText('C'));
    expect(countTextNode).not.toHaveTextContent('123456+7-8/9*0')
  });
  
  test('Calculate function should be work', async () => {
    calculateCall.mockResolvedValueOnce('3');
    const {getByText, getByTestId} = render(
      <Calculator/>
    );
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('='));
    
    expect(calculateCall).toHaveBeenCalledTimes(1);
    expect(calculateCall).toHaveBeenCalledWith('1+2');
    
    await wait(() => expect(getByTestId('result')).toHaveTextContent('3'));
  });
})