import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest' 
import Header from '../components/Header';

const mockToggleCart = vi.fn();
const mockCart = [{id: 1, title: "MockA", price: 10, images:"", quantity: 5, favorite: false}];

describe('Header', () => {
  it("should render nav and match snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <Header cart={mockCart} toggleCart={mockToggleCart}/>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
  
  it('renders home, shop, and cart links', () => {
    render(
      <MemoryRouter>
        <Header cart={mockCart} toggleCart={mockToggleCart}/>
      </MemoryRouter>
    );
    const homeLink = screen.getByRole("link", { name: /Home/i });
    const shopLink = screen.getByRole("link", { name: /Shop/i });
    const cart = screen.getByLabelText("cart button");

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href");
    expect(shopLink).toBeInTheDocument();
    expect(shopLink).toHaveAttribute("href");
    expect(cart).toBeInTheDocument();
  });

  it("nav links path should be correct", () => {
    render(
      <MemoryRouter>
        <Header cart={mockCart} toggleCart={mockToggleCart}/>
      </MemoryRouter>
    );
    const homeLink = screen.getByRole("link", { name: /^home$/i });
    const storeLink = screen.getByRole("link", { name: /^shop$/i });
    expect(homeLink).toHaveAttribute("href", "/");
    expect(storeLink).toHaveAttribute("href", "/shop");
  });

  it("should set cart item count to 5", () => {
    render(
      <MemoryRouter>
        <Header cart={mockCart} toggleCart={mockToggleCart}/>
      </MemoryRouter>
    );
    expect(screen.getByLabelText('cart count')).toHaveTextContent('5');
  });

  it("should redirect to home when logo clicked", async () => {
    render(
      <MemoryRouter>
        <Header cart={mockCart} toggleCart={mockToggleCart}/>
      </MemoryRouter>
    );

    const logo = screen.getByRole('img', { name: /logo/i }); // Adjust query based on the image's alt text
    await userEvent.click(logo);
    // Assert that the URL has changed to '/'
    expect(window.location.pathname).toBe('/');
  })
});

