import { defineFlow, step } from '@wizzard-packages/core';

/** A checkout: what is in the cart, who is buying, and how they pay. */
export const checkout = defineFlow({
  id: 'checkout',
  order: ['cart', 'account', 'pay'],
  steps: {
    cart: step<{ coupon: string }>({ label: 'Cart' }),
    account: step({ label: 'Sign in' }),
    pay: step({ label: 'Payment' }),
  },
});
