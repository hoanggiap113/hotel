export const vnpayConfig = {
  tmnCode: process.env.VNP_TMNCODE || '',
  secureSecret: process.env.VNP_HASHSECRET || '',
  vnpayHost: 'https://sandbox.vnpayment.vn', // Base URL cho SDK
  returnUrl:
    process.env.VNP_RETURNURL || 'http://127.0.0.1:8080/payments/vnpay/return',
  testMode: true, // Sandbox mode
};

// Validate config
export function validateVNPayConfig(): void {
  if (!vnpayConfig.tmnCode) {
    throw new Error('VNP_TMNCODE is required in .env');
  }
  if (!vnpayConfig.secureSecret) {
    throw new Error('VNP_HASHSECRET is required in .env');
  }
  console.log('✅ VNPay Config validated successfully');
  console.log('📌 TMN Code:', vnpayConfig.tmnCode);
  console.log('📌 VNPay Host:', vnpayConfig.vnpayHost);
  console.log('📌 Return URL:', vnpayConfig.returnUrl);
}
