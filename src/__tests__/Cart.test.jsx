import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest' 
import Cart from '../components/Cart';

const mockCart = [
    {
      id: 1,
      title: 'Item 1',
      quantity: 2,
      price: 10,
      images: ['https://via.placeholder.com/150']
    },
    {
      id: 2,
      title: 'Item 2',
      quantity: 1,
      price: 20,
      images: ['https://via.placeholder.com/150']
    }
  ];

const mockSetCart = vi.fn();
const mockToggleCart = vi.fn();

describe('Cart', () => {
    beforeEach(() => {
        mockSetCart.mockClear();
        mockToggleCart.mockClear();
    });
    
    it("should render nav and match snapshot", () => {
        const { container } = render(
            <Cart cart={mockCart} setCart={mockSetCart} toggleCart={mockToggleCart}/>
        );
        expect(container).toMatchSnapshot();
      });

    it('renders cart items and total price correctly', () => {
        render(
            <Cart cart={mockCart} setCart={mockSetCart} toggleCart={mockToggleCart}/>
        );

        expect(screen.getByText(/Item 1/)).toBeInTheDocument();
        expect(screen.getByText(/Item 2/)).toBeInTheDocument();

        expect(screen.getByText('Total: $40')).toBeInTheDocument();
    })

    it('should display empty cart correctly', () => {
        render(
            <Cart cart={[]} setCart={mockSetCart} toggleCart={mockToggleCart}/>
        );
        const emptyText = screen.getByText('Cart is empty.');
        expect(emptyText).toBeInTheDocument();
    })

    it('should increase quantity of an item', async () => {
        render(
            <Cart cart={mockCart} setCart={mockSetCart} toggleCart={mockToggleCart}/>
        );
    
        const increaseButton = screen.getAllByText('+')[0];
        await userEvent.click(increaseButton);
    
        // Expect setCart to be called with updated cart
        await waitFor(() => {
          expect(mockSetCart).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ id: 1, quantity: 3 }) // quantity should increase
          ]));
        });
    });

    it('should delete an item from the cart', async () => {
        render(
            <Cart cart={mockCart} setCart={mockSetCart} toggleCart={mockToggleCart} />
        );
    
        const deleteButton = screen.getAllByLabelText('delete cart item')[0];
        await userEvent.click(deleteButton);
    
        // Expect setCart to be called with cart excluding the deleted item
        await waitFor(() => {
            expect(mockSetCart).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ id: 2 }) // Item with id 2 should still be present
              ]));
              expect(mockSetCart).toHaveBeenCalledWith(expect.not.arrayContaining([
                expect.objectContaining({ id: 1 }) // Item with id 1 should not be present
              ]));
        });
    });

    it('should close the cart when the close button is clicked', async () => {
        render(<Cart cart={mockCart} setCart={mockSetCart} toggleCart={mockToggleCart} />);
    
        const close = screen.getByLabelText('close cart');
        await userEvent.click(close);
    
        // Expect toggleCart to have been called
        await waitFor(() => {
        expect(mockToggleCart).toHaveBeenCalled();
        });
    });
})