import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest' 
import Shop from '../components/Shop';
import { MemoryRouter, Route, Routes } from 'react-router-dom';


// Mock functions
const mockDecreaseSelected = vi.fn()
const mockHandleSelectedChange = vi.fn();
const mockIncreaseSelected = vi.fn();
const mockAddToCart = vi.fn();

const mockSingleProduct = [
    {
        id: 1,
        title: 'Product 1',
        price: 10.00,
        images: ['https://via.placeholder.com/150'],
        selected: 1
    },
]

const mockProducts = [
    {
      id: 1,
      title: 'Product 1',
      price: 10.00,
      images: ['https://via.placeholder.com/150'],
      selected: 1
    },
    {
      id: 2,
      title: 'Product 2',
      price: 20.00,
      images: ['https://via.placeholder.com/150'],
      selected: 1
    },
    {
        id: 3,
        title: 'Product 3',
        price: 250.00,
        images: ['https://via.placeholder.com/150'],
        selected: 1
    }
]

describe('Shop', () => {
    beforeEach(() => {
        // Reset mock function calls before each test
        mockDecreaseSelected.mockClear();
        mockIncreaseSelected.mockClear();
        mockAddToCart.mockClear();
    });

    it("should render shop and match snapshot", () => {
        const { container } = render(
            <MemoryRouter>
                <Shop
                    products={mockProducts}
                    isCalled={true}
                    decreaseSelected={mockDecreaseSelected}
                    handleSelectedChange={mockHandleSelectedChange}
                    increaseSelected={mockIncreaseSelected}
                    addToCart={mockAddToCart}
                    loading={false}
                />
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
    });

    it('should display the loading page when loading is true', () => {
        render(
          <MemoryRouter>
            <Shop
              products={[]}
              isCalled={false}
              decreaseSelected={mockDecreaseSelected}
              handleSelectedChange={mockHandleSelectedChange}
              increaseSelected={mockIncreaseSelected}
              addToCart={mockAddToCart}
              loading={true}
            />
          </MemoryRouter>
        );
    
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
    
    it('should render products when isCalled is true and loading is false', () => {
        render(
          <MemoryRouter>
            <Shop
              products={mockProducts}
              isCalled={true}
              decreaseSelected={mockDecreaseSelected}
              handleSelectedChange={mockHandleSelectedChange}
              increaseSelected={mockIncreaseSelected}
              addToCart={mockAddToCart}
              loading={false}
            />
          </MemoryRouter>
        );
    
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
        expect(screen.getByText('Product 3')).toBeInTheDocument();
        expect(screen.getByText('$10')).toBeInTheDocument();
        expect(screen.getByText('$20')).toBeInTheDocument();
        expect(screen.getByText('$250')).toBeInTheDocument();
    });

    it('should render decrease and increase buttons', () => {
        render(
            <MemoryRouter>
            <Shop
                products={mockSingleProduct}
                isCalled={true}
                decreaseSelected={mockDecreaseSelected}
                handleSelectedChange={mockHandleSelectedChange}
                increaseSelected={mockIncreaseSelected}
                addToCart={mockAddToCart}
                loading={false}
            />
            </MemoryRouter>
        );
        
        // Check if the decrease button exists
        const decreaseButton = screen.getByRole('button', { name: '-' });
        expect(decreaseButton).toBeInTheDocument();
        
        // Check if the increase button exists
        const increaseButton = screen.getByRole('button', { name: '+' });
        expect(increaseButton).toBeInTheDocument();
    });

    it('should navigate to product detail page when a product is clicked', async () => {
        render(
            <MemoryRouter initialEntries={['/shop']}>
            <Routes>
                <Route path="/shop" element={
                <Shop
                    products={mockProducts}
                    isCalled={true}
                    decreaseSelected={mockDecreaseSelected}
                    handleSelectedChange={mockHandleSelectedChange}
                    increaseSelected={mockIncreaseSelected}
                    addToCart={mockAddToCart}
                    loading={false}
                />
                } />
                <Route path="/shop/:id" element={<div>Product Detail Page</div>} />
            </Routes>
            </MemoryRouter>
        );

        const productDiv = screen.getByText('Product 1').closest('div');
        await userEvent.click(productDiv);

        // Verify navigation
        await waitFor(() => {
            expect(screen.getByText('Product Detail Page')).toBeInTheDocument();
        });
    });

    it('should call decreaseSelected and increaseSelected with correct id when respective buttons are clicked', async () => {
        render(
            <MemoryRouter>
            <Shop
                products={mockSingleProduct}
                isCalled={true}
                decreaseSelected={mockDecreaseSelected}
                handleSelectedChange={mockHandleSelectedChange}
                increaseSelected={mockIncreaseSelected}
                addToCart={mockAddToCart}
                loading={false}
            />
            </MemoryRouter>
        );
        // Click increase button
        const increaseButton = screen.getByRole('button', { name: '+' });
        await userEvent.click(increaseButton);

        // Verify increaseSelected call
        await waitFor(() => {
            expect(mockIncreaseSelected).toHaveBeenCalledWith(expect.anything(), 1); // Check arguments
        });

        // Click decrease button
        const decreaseButton = screen.getByRole('button', { name: '-' }); // Ensure you select the correct button
        await userEvent.click(decreaseButton);

        // Verify decreaseSelected call
        await waitFor(() => {
            expect(mockDecreaseSelected).toHaveBeenCalledWith(expect.anything(), 1); // Check arguments
        }); 
    });

    it('should call addToCart with correct Id when Add to Cart button is clicked', async () => {
        render(
          <MemoryRouter>
            <Shop
              products={mockSingleProduct}
              isCalled={true}
              decreaseSelected={mockDecreaseSelected}
              handleSelectedChange={mockHandleSelectedChange}
              increaseSelected={mockIncreaseSelected}
              addToCart={mockAddToCart}
              loading={false}
            />
          </MemoryRouter>
        );
    
        const addToCartButton = screen.getByRole('button', { name: 'Add to cart' });
        await userEvent.click(addToCartButton);
        expect(mockAddToCart).toHaveBeenCalledWith(expect.any(Object), 1);
    });
});