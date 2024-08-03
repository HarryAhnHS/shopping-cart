import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
// import userEvent from '@testing-library/user-event'
import { vi } from 'vitest' 
import Cart from '../components/Cart';

const mockSetCart = vi.fn();
const mockToggleCart = vi.fn();
const mockCart = [{id: 1, title: "MockA", price: 10, images:"", quantity: 5, favorite: false}];

describe('Header', () => {
    it('renders home, shop, and cart links', () => {
      render(
        <MemoryRouter>
          <Cart cart={mockCart} setCart={mockSetCart} toggleCart={mockToggleCart}/>
        </MemoryRouter>
      );
    });
});