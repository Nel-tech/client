// lib/paystack.ts
export const initializePayment = (
  email: string,
  amount: number,
  metadata: any
) => {
  const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

  const handler = (window as any).PaystackPop.setup({
    key: paystackPublicKey,
    email,
    amount: amount * 100, 
    currency: 'NGN',
    metadata,
    callback: (response: any) => {
      console.log('Payment successful:', response);
      // Handle success
      return response;
    },
    onClose: () => {
      console.log('Payment closed');
    },
  });

  handler.openIframe();
};
