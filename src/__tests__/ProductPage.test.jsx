import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductPage from '../components/ProductPage';

// Mock functions
const mockDecreaseSelected = vi.fn();
const mockHandleSelectedChange = vi.fn();
const mockIncreaseSelected = vi.fn();
const mockAddToCart = vi.fn();

// Sample product data
const mockProducts = [
    {
        id: 1,
        title: 'Product 1',
        price: 10.00,
        images: ['https://via.placeholder.com/150'],
        selected: 1
    },
];

describe('ProductPage', () => {
    it('should render product details correctly', () => {
        render(
            <MemoryRouter initialEntries={['/shop/1']}>
                <Routes>
                    <Route path="/shop/:id" element={
                        <ProductPage
                            products={mockProducts}
                            decreaseSelected={mockDecreaseSelected}
                            handleSelectedChange={mockHandleSelectedChange}
                            increaseSelected={mockIncreaseSelected}
                            addToCart={mockAddToCart}
                        />
                    } />
                </Routes>
            </MemoryRouter>
        );

        // Check for product details
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('$10')).toBeInTheDocument();
        expect(screen.getByRole('img').getAttribute('src')).toBe('https://via.placeholder.com/150');
    });

    it('should call increaseSelected with correct id when increase button is clicked', async () => {
        render(
            <MemoryRouter initialEntries={['/shop/1']}>
                <Routes>
                    <Route path="/shop/:id" element={
                        <ProductPage
                            products={mockProducts}
                            decreaseSelected={mockDecreaseSelected}
                            handleSelectedChange={mockHandleSelectedChange}
                            increaseSelected={mockIncreaseSelected}
                            addToCart={mockAddToCart}
                        />
                    } />
                </Routes>
            </MemoryRouter>
        );

        const increaseButton = screen.getByRole('button', { name: '+' });
        await userEvent.click(increaseButton);

        await waitFor(() => {
            expect(mockIncreaseSelected).toHaveBeenCalledWith(expect.anything(), 1); // Correct ID should be passed
        });
    });

    it('should call decreaseSelected with correct id when decrease button is clicked', async () => {
        render(
            <MemoryRouter initialEntries={['/shop/1']}>
                <Routes>
                    <Route path="/shop/:id" element={
                        <ProductPage
                            products={mockProducts}
                            decreaseSelected={mockDecreaseSelected}
                            handleSelectedChange={mockHandleSelectedChange}
                            increaseSelected={mockIncreaseSelected}
                            addToCart={mockAddToCart}
                        />
                    } />
                </Routes>
            </MemoryRouter>
        );

        const decreaseButton = screen.getByRole('button', { name: '-' });
        await userEvent.click(decreaseButton);

        await waitFor(() => {
            expect(mockDecreaseSelected).toHaveBeenCalledWith(expect.anything(), 1); // Correct ID should be passed
        });
    });

    it('should call addToCart with correct id when Add to Cart button is clicked', async () => {
        render(
            <MemoryRouter initialEntries={['/shop/1']}>
                <Routes>
                    <Route path="/shop/:id" element={
                        <ProductPage
                            products={mockProducts}
                            decreaseSelected={mockDecreaseSelected}
                            handleSelectedChange={mockHandleSelectedChange}
                            increaseSelected={mockIncreaseSelected}
                            addToCart={mockAddToCart}
                        />
                    } />
                </Routes>
            </MemoryRouter>
        );

        const addToCartButton = screen.getByRole('button', { name: 'Add to cart' });
        await userEvent.click(addToCartButton);

        await waitFor(() => {
            expect(mockAddToCart).toHaveBeenCalledWith(expect.anything(), 1); // Correct ID should be passed
        });
    });
});
