const products = [
  {
    id: 'prod-1',
    name: 'Wireless Mouse',
    category: 'Accessories',
    price: 799,
    stock: 18,
    description: 'Compact wireless mouse for daily work and study use.'
  },
  {
    id: 'prod-2',
    name: 'Mechanical Keyboard',
    category: 'Accessories',
    price: 2499,
    stock: 10,
    description: 'Tactile keyboard with a durable build and clean layout.'
  },
  {
    id: 'prod-3',
    name: 'Gaming Headset',
    category: 'Audio',
    price: 1899,
    stock: 14,
    description: 'Over-ear headset with clear voice pickup and soft padding.'
  },
  {
    id: 'prod-4',
    name: 'Laptop Stand',
    category: 'Workspace',
    price: 1199,
    stock: 9,
    description: 'Adjustable stand for comfortable desk setup.'
  }
];

const cart = {
  items: []
};

const orders = [];

function getProducts() {
  return products;
}

function getProductById(productId) {
  return products.find((product) => product.id === productId);
}

function getCart() {
  const items = cart.items.map((item) => {
    const product = getProductById(item.productId);

    return {
      ...item,
      product
    };
  }).filter((item) => item.product);

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return {
    items,
    total
  };
}

function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);

  if (!product) {
    return { error: 'Product not found', status: 404 };
  }

  if (quantity < 1) {
    return { error: 'Quantity must be at least 1', status: 400 };
  }

  const existingItem = cart.items.find((item) => item.productId === productId);
  const nextQuantity = (existingItem ? existingItem.quantity : 0) + quantity;

  if (nextQuantity > product.stock) {
    return { error: 'Requested quantity exceeds available stock', status: 400 };
  }

  if (existingItem) {
    existingItem.quantity = nextQuantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  return { data: getCart(), status: 200 };
}

function updateCartItem(productId, quantity) {
  const cartItem = cart.items.find((item) => item.productId === productId);

  if (!cartItem) {
    return { error: 'Cart item not found', status: 404 };
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter((item) => item.productId !== productId);
    return { data: getCart(), status: 200 };
  }

  const product = getProductById(productId);

  if (!product) {
    return { error: 'Product not found', status: 404 };
  }

  if (quantity > product.stock) {
    return { error: 'Requested quantity exceeds available stock', status: 400 };
  }

  cartItem.quantity = quantity;

  return { data: getCart(), status: 200 };
}

function clearCart() {
  cart.items = [];
  return getCart();
}

function createOrder(customerName) {
  const currentCart = getCart();

  if (!customerName || !customerName.trim()) {
    return { error: 'Customer name is required', status: 400 };
  }

  if (currentCart.items.length === 0) {
    return { error: 'Cart is empty', status: 400 };
  }

  for (const item of currentCart.items) {
    if (item.quantity > item.product.stock) {
      return {
        error: `Insufficient stock for ${item.product.name}`,
        status: 400
      };
    }
  }

  currentCart.items.forEach((item) => {
    item.product.stock -= item.quantity;
  });

  const order = {
    id: `ord-${orders.length + 1}`,
    customerName: customerName.trim(),
    status: 'Placed',
    items: currentCart.items,
    total: currentCart.total,
    createdAt: new Date().toISOString()
  };

  orders.unshift(order);
  clearCart();

  return { data: order, status: 201 };
}

function getOrders() {
  return orders;
}

module.exports = {
  getProducts,
  getCart,
  addToCart,
  updateCartItem,
  clearCart,
  createOrder,
  getOrders
};
