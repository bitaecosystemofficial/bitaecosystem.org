import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ShippingInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  landmark?: string;
}

interface OrderRequest {
  merchantWhatsApp: string;
  itemName: string;
  itemPrice: string;
  shippingInfo: ShippingInfo;
  txHash: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { merchantWhatsApp, itemName, itemPrice, shippingInfo, txHash }: OrderRequest = await req.json();

    console.log('Processing order notification for merchant:', merchantWhatsApp);

    if (!merchantWhatsApp) {
      throw new Error('Merchant WhatsApp number is required');
    }

    // Format the WhatsApp message
    const message = `
🎉 *New Order Received!*

📦 *Item:* ${itemName}
💰 *Price:* ${itemPrice} BIT

👤 *Customer Details:*
Name: ${shippingInfo.fullName}
Email: ${shippingInfo.email}
Phone: ${shippingInfo.phoneNumber}

📍 *Shipping Address:*
City: ${shippingInfo.city}
State: ${shippingInfo.state}
Country: ${shippingInfo.country}
Zip Code: ${shippingInfo.zipCode}
${shippingInfo.landmark ? `Landmark: ${shippingInfo.landmark}` : ''}

🔗 *Transaction Hash:*
${txHash}

Please process this order as soon as possible.
    `.trim();

    // Clean phone number (remove + and spaces)
    const cleanNumber = merchantWhatsApp.replace(/[^\d]/g, '');
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL (using WhatsApp Business API format)
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    console.log('WhatsApp notification prepared successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        whatsappUrl,
        message: 'Order notification prepared successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error processing order notification:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
