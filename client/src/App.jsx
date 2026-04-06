import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  const response = await fetch(`${apiUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || 'Something went wrong');
  }

  return response.json();
}

function App() {
  const [health, setHealth] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      setLoading(true);

      const [healthData, productsData, cartData, ordersData] = await Promise.all([
        request('/api/health'),
        request('/api/products'),
        request('/api/cart'),
        request('/api/orders')
      ]);

      setHealth(healthData);
      setProducts(productsData.products);
      setCart(cartData);
      setOrders(ordersData.orders);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleAddToCart(productId) {
    try {
      const nextCart = await request('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity: 1 })
      });

      setCart(nextCart);
      setMessage('Item added to cart');
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleQuantityChange(productId, quantity) {
    try {
      const nextCart = await request(`/api/cart/${productId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity })
      });

      setCart(nextCart);
      setMessage('Cart updated');
      await loadProductsOnly();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleClearCart() {
    try {
      const nextCart = await request('/api/cart', {
        method: 'DELETE'
      });

      setCart(nextCart);
      setMessage('Cart cleared');
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handlePlaceOrder(event) {
    event.preventDefault();

    try {
      const order = await request('/api/orders', {
        method: 'POST',
        body: JSON.stringify({ customerName })
      });

      setOrders((currentOrders) => [order, ...currentOrders]);
      setCart({ items: [], total: 0 });
      setCustomerName('');
      setMessage(`Order ${order.id} placed successfully`);
      await loadProductsOnly();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function loadProductsOnly() {
    const productsData = await request('/api/products');
    setProducts(productsData.products);
  }

  if (loading) {
    return <main className="page">Loading PocketMart...</main>;
  }

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Minimal MERN Demo</p>
          <h1>PocketMart</h1>
          <p className="subtitle">
            A rough storefront with in-memory products, cart handling, and order placement.
          </p>
        </div>
        <div className="statusBox">
          <h2>Backend Status</h2>
          <p><strong>Status:</strong> {health?.status}</p>
          <p><strong>Message:</strong> {health?.message}</p>
        </div>
      </section>

      {message ? <p className="message">{message}</p> : null}

      <section className="layout">
        <div className="panel">
          <div className="sectionHeader">
            <h2>Products</h2>
            <span>{products.length} items</span>
          </div>

          <div className="productList">
            {products.map((product) => (
              <article key={product.id} className="productCard">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
                <div className="meta">
                  <span>{product.category}</span>
                  <span>Rs. {product.price}</span>
                  <span>Stock: {product.stock}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="stack">
          <section className="panel">
            <div className="sectionHeader">
              <h2>Cart</h2>
              <button type="button" className="ghostButton" onClick={handleClearCart}>
                Clear
              </button>
            </div>

            {cart.items.length === 0 ? (
              <p className="emptyState">Your cart is empty.</p>
            ) : (
              <div className="cartList">
                {cart.items.map((item) => (
                  <div key={item.productId} className="cartRow">
                    <div>
                      <h3>{item.product.name}</h3>
                      <p>Rs. {item.product.price} each</p>
                    </div>
                    <div className="cartActions">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <p className="cartTotal"><strong>Total:</strong> Rs. {cart.total}</p>
              </div>
            )}
          </section>

          <section className="panel">
            <h2>Checkout</h2>
            <form className="checkoutForm" onSubmit={handlePlaceOrder}>
              <label htmlFor="customerName">Customer Name</label>
              <input
                id="customerName"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Enter your name"
              />
              <button type="submit">Place order</button>
            </form>
          </section>

          <section className="panel">
            <div className="sectionHeader">
              <h2>Recent Orders</h2>
              <span>{orders.length} total</span>
            </div>

            {orders.length === 0 ? (
              <p className="emptyState">No orders yet.</p>
            ) : (
              <div className="orderList">
                {orders.map((order) => (
                  <article key={order.id} className="orderCard">
                    <h3>{order.id}</h3>
                    <p><strong>Customer:</strong> {order.customerName}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total:</strong> Rs. {order.total}</p>
                    <p><strong>Items:</strong> {order.items.length}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default App;
