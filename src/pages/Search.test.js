import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchForm from '../components/SearchForm';

describe('SearchForm Component', () => {
  
  test('renders search inputs', () => {
    render(<SearchForm onSearch={() => {}} />);
    
    // Updated to match the new title in your component
    expect(screen.getByText(/Find Your Dream Home/i)).toBeInTheDocument();
    
    // Updated to expect colons (:) which we added to the component
    expect(screen.getByLabelText(/Min Price:/i)).toBeInTheDocument();
  });

  test('calls onSearch with data when submitted', () => {
    const mockSearch = jest.fn();
    render(<SearchForm onSearch={mockSearch} />);

    // Simulate typing into inputs
    fireEvent.change(screen.getByLabelText(/Postcode:/i), { target: { value: 'BR1' } });
    fireEvent.change(screen.getByLabelText(/Min Beds:/i), { target: { value: '2' } });

    // Click the search button
    // We use getByRole to strictly find the button, avoiding conflicts with the title
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    expect(mockSearch).toHaveBeenCalled();
    expect(mockSearch.mock.calls[0][0].postcode).toBe('BR1');
    expect(mockSearch.mock.calls[0][0].minBedrooms).toBe('2');
  });
});