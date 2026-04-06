import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';

describe('App', () => {
  it('loads products and adds one item to the cart', async () => {
    const responses = {
      '/api/health': { status: 'ok', message: 'PocketMart backend is running', timestamp: 'now' },
      '/api/products': {
        products: [
          {
            id: 'prod-1',
            name: 'Wireless Mouse',
            category: 'Accessories',
            price: 799,
            stock: 18,
            description: 'Compact wireless mouse'
          }
        ]
      },
      '/api/cart': { items: [], total: 0 },
      '/api/orders': { orders: [] }
    };

    global.fetch = vi.fn((url, options) => {
      const path = url.replace('http://localhost:5001', '');

      if (options?.method === 'POST' && path === '/api/cart') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            items: [
              {
                productId: 'prod-1',
                quantity: 1,
                product: responses['/api/products'].products[0]
              }
            ],
            total: 799
          })
        });
      }

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responses[path])
      });
    });

    render(<App />);

    expect(await screen.findByText(/PocketMart/i)).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /Wireless Mouse/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Add to cart/i }));

    await waitFor(() => {
      expect(
        screen.getByText((_, element) => element?.textContent === 'Total: Rs. 799')
      ).toBeInTheDocument();
    });
  });
});
