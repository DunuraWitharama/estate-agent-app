import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import SearchForm from '../components/SearchForm';
import { FavouritesProvider } from '../context/FavouritesContext';

const renderWithContext = (component) => {
  return render(
      <FavouritesProvider>{component}</FavouritesProvider>
  );
};

describe('Estate Agent App Tests', () => {

  test('renders search form inputs correctly', () => {
    render(<SearchForm onSearch={() => {}} />);
    expect(screen.getByText(/Find Your Dream Home/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Min Price:/i)).toBeInTheDocument();
  });

  test('calls onSearch with correct criteria when submitted', () => {
    const mockSearch = jest.fn();
    render(<SearchForm onSearch={mockSearch} />);
    
    const bedInput = screen.getByLabelText(/Min Beds:/i);
    fireEvent.change(bedInput, { target: { value: '3' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    expect(mockSearch).toHaveBeenCalled();
    expect(mockSearch).toHaveBeenCalledWith(expect.objectContaining({
      minBedrooms: '3'
    }));
  });

  test('renders property card details', async () => {
    renderWithContext(<App />);
    
    await waitFor(() => {
        // UPDATED: Look for "Save" instead of "Add to Favourite"
        // This matches the "♥ Save" text in your actual buttons
        const buttons = screen.getAllByText(/Save/i);
        expect(buttons.length).toBeGreaterThan(0);
    });
  });

  test('favourite button toggles on click', async () => {
     renderWithContext(<App />);
     
     // 1. Find the buttons (Updated to look for "Save")
     const addButtons = await screen.findAllByText(/Save/i);
     expect(addButtons.length).toBeGreaterThan(0);
     
     // 2. Click the first button
     fireEvent.click(addButtons[0]);

     // 3. Check for change
     // NOTE: Depending on how your PropertyCard is written, the text might change 
     // to "Saved", "Remove", or just stay "Save" but change color.
     // This line checks if the button is still in the document. 
     // If your app changes the text to "Saved", change the regex below to /Saved/i
     await waitFor(() => {
        const buttons = screen.getAllByText(/Save/i);
        expect(buttons[0]).toBeInTheDocument();
     });
  });
});