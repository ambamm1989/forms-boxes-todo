import React from 'react';
import { render, fireEvent, wait} from '@testing-library/react';
import BoxList from './BoxList';

function addBox(boxList, height = '2', width = '2', color = 'peachpuff') {
    const heightInput = boxList.getByLabelText('Height');
    const widthInput = boxList.getByLabelText('Width');
    const backgroundInput = boxList.getByLabelText('Background Color');
    fireEvent.change(backgroundInput, { target: { value: color } });
    fireEvent.change(heightInput, { target: { value: height } });
    fireEvent.change(widthInput, { target: { value: width } });
    const button = boxList.getByText('Add a new box');
}

it('renders without crashing', () => {
    render(<BoxList />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
});

it('adds a new box', () => {
    const boxList = render(<BoxList />);

    expect(boxList.getByText('Add a new box!')).toBeInTheDocument();

    addBox(boxList);

    const removeButton = boxList.getByText('Remove a box');
    expect(removeButton).toBeInTheDocument();
    expect(removeButton.previousSibling).toHaveStyle(`
        width: 2em;
        height: 2em;
        background-color: peachpuff;`);

        expect(boxList.getAllByDisplayValue('2')).toHaveLength(3);

});

it('can remove a box', () => {
    const boxList = render(<BoxList />);
    addBox(boxList);

    const removeButton = boxList.getByText('Remove a box');

    fireEvent.click(removeButton);
    expect(removeButton).not.toBeInTheDocument();
});
