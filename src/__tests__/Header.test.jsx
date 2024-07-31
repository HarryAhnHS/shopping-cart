import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Shop from '../Shop'
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  it('renders home, shop, and cart links', () => {
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>
    );
    const homeLink = screen.getByRole("link", { name: /Home/i });
    const shopLink = screen.getByRole("link", { name: /Shop/i });
    const cart = screen.getByRole("button", { name: /Cart/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href");
    expect(shopLink).toBeInTheDocument();
    expect(shopLink).toHaveAttribute("href");
    expect(cart).toBeInTheDocument();
  });

  // it('updates cart quantity correctly', async () => {
  //   const user = userEvent.setup()

  //   render(
  //     <BrowserRouter>
  //       <Shop />
  //     </BrowserRouter>
  //   );

  //   await user.click(screen.getByRole('button', {name: /Add to cart/i}))

  //   expect(screen.getByRole("button", { name: /Cart/i }))
  // })
});