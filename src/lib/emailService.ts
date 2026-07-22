const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "officialtechzonegh@gmail.com";

// Log configuration on load
console.log(" Brevo Email Service Initialized");
console.log("API Key configured:", !!BREVO_API_KEY);
console.log("Sender Email:", import.meta.env.VITE_BREVO_SENDER_EMAIL || "officialtechzonegh@gmail.com");
console.log("Admin Email:", ADMIN_EMAIL);

// Email templates
const createLoginEmailTemplate = (userName: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to TechZone</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #14213D 0%, #0a1628 100%); padding: 30px; text-align: center;">
              <h1 style="color: #FCA331; margin: 0; font-size: 28px;">TechZone</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">Your Trusted Tech Partner</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #14213D; margin: 0 0 20px 0; font-size: 24px;">Welcome Back, ${userName}! 👋</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                You've successfully logged in to your TechZone account. We're excited to have you back!
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Explore our latest collection of premium laptops and cutting-edge technology products.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td style="background-color: #FCA331; border-radius: 6px; text-align: center;">
                    <a href="${window.location.origin}" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">
                      Browse Products
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                If you didn't initiate this login, please contact our support team immediately.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                © 2026 TechZone. All rights reserved.<br>
                Kumasi, Ghana | 24/7 Support
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const createPurchaseEmailTemplate = (
  userName: string,
  orderDetails: {
    items: Array<{ name: string; quantity: number; price: number }>;
    subtotal: number;
    total: number;
    orderId: string;
  }
) => {
  const itemsHTML = orderDetails.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <strong style="color: #14213D;">${item.name}</strong>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
        GH₵${item.price.toFixed(2)}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
        <strong>GH₵${(item.quantity * item.price).toFixed(2)}</strong>
      </td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - TechZone</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #14213D 0%, #0a1628 100%); padding: 30px; text-align: center;">
              <h1 style="color: #FCA331; margin: 0; font-size: 28px;">TechZone</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">Order Confirmation</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #14213D; margin: 0 0 10px 0; font-size: 24px;">Thank You for Your Order! 🎉</h2>
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 30px 0;">Order ID: #${orderDetails.orderId}</p>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi ${userName},
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Your order has been successfully placed! Here are your order details:
              </p>
              
              <!-- Order Items Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #14213D;">
                    <th style="padding: 12px; text-align: left; color: #ffffff; font-size: 14px;">Product</th>
                    <th style="padding: 12px; text-align: center; color: #ffffff; font-size: 14px;">Qty</th>
                    <th style="padding: 12px; text-align: right; color: #ffffff; font-size: 14px;">Price</th>
                    <th style="padding: 12px; text-align: right; color: #ffffff; font-size: 14px;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>
              
              <!-- Order Summary -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                <tr>
                  <td style="padding: 10px 0; text-align: right; color: #4b5563; font-size: 16px;">
                    Subtotal: <strong>GH₵${orderDetails.subtotal.toFixed(2)}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; text-align: right; color: #14213D; font-size: 20px; border-top: 2px solid #FCA331;">
                    <strong>Total: GH₵${orderDetails.total.toFixed(2)}</strong>
                  </td>
                </tr>
              </table>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                We'll send you another email once your order is shipped. Thank you for choosing TechZone!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                © 2026 TechZone. All rights reserved.<br>
                Kumasi, Ghana | 24/7 Support
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const createAdminPurchaseNotificationTemplate = (
  customerDetails: {
    name: string;
    email: string;
    contact: string;
    location: string;
    address: string;
    paymentMethod: string;
  },
  orderDetails: {
    items: Array<{ name: string; quantity: number; price: number }>;
    subtotal: number;
    total: number;
    orderId: string;
  }
) => {
  const itemsHTML = orderDetails.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <strong style="color: #14213D;">${item.name}</strong>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
        GH₵${item.price.toFixed(2)}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">
        <strong>GH₵${(item.quantity * item.price).toFixed(2)}</strong>
      </td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Alert - TechZone Admin</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #FCA331 0%, #e8941f 100%); padding: 30px; text-align: center;">
              <h1 style="color: #14213D; margin: 0; font-size: 28px;">🔔 New Order Received</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #14213D; margin: 0 0 10px 0; font-size: 24px;">New Order Alert</h2>
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 30px 0;">Order ID: #${orderDetails.orderId}</p>
              
              <!-- Customer Information -->
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <h3 style="color: #14213D; margin: 0 0 15px 0; font-size: 18px;">Customer Information</h3>
                <p style="color: #4b5563; font-size: 14px; margin: 5px 0;"><strong>Name:</strong> ${customerDetails.name}</p>
                <p style="color: #4b5563; font-size: 14px; margin: 5px 0;"><strong>Email:</strong> ${customerDetails.email}</p>
                <p style="color: #4b5563; font-size: 14px; margin: 5px 0;"><strong>Contact:</strong> ${customerDetails.contact}</p>
                <p style="color: #4b5563; font-size: 14px; margin: 5px 0;"><strong>Location:</strong> ${customerDetails.location}</p>
                <p style="color: #4b5563; font-size: 14px; margin: 5px 0;"><strong>Address:</strong> ${customerDetails.address}</p>
                <p style="color: #4b5563; font-size: 14px; margin: 5px 0;"><strong>Payment Method:</strong> ${customerDetails.paymentMethod.replace(/_/g, ' ').toUpperCase()}</p>
              </div>
              
              <!-- Order Items Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #14213D;">
                    <th style="padding: 12px; text-align: left; color: #ffffff; font-size: 14px;">Product</th>
                    <th style="padding: 12px; text-align: center; color: #ffffff; font-size: 14px;">Qty</th>
                    <th style="padding: 12px; text-align: right; color: #ffffff; font-size: 14px;">Price</th>
                    <th style="padding: 12px; text-align: right; color: #ffffff; font-size: 14px;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHTML}
                </tbody>
              </table>
              
              <!-- Order Summary -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                <tr>
                  <td style="padding: 10px 0; text-align: right; color: #4b5563; font-size: 16px;">
                    Subtotal: <strong>GH₵${orderDetails.subtotal.toFixed(2)}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; text-align: right; color: #14213D; font-size: 20px; border-top: 2px solid #FCA331;">
                    <strong>Total: GH₵${orderDetails.total.toFixed(2)}</strong>
                  </td>
                </tr>
              </table>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                Please process this order at your earliest convenience.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                © 2026 TechZone Admin Portal<br>
                Kumasi, Ghana
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Send email function
export const sendEmail = async (
  to: string,
  subject: string,
  htmlContent: string
): Promise<boolean> => {
  try {
    console.log("========== EMAIL DEBUG ==========");
    console.log("Recipient:", to);
    console.log("Subject:", subject);
    console.log("API Key exists:", !!BREVO_API_KEY);
    console.log("API Key length:", BREVO_API_KEY?.length || 0);
    console.log("Sender Email:", import.meta.env.VITE_BREVO_SENDER_EMAIL || "officialtechzonegh@gmail.com");
    console.log("=================================");

    if (!BREVO_API_KEY) {
      console.error("❌ CRITICAL: Brevo API key is not configured!");
      console.error("Please check your .env file has VITE_BREVO_API_KEY set");
      return false;
    }

    const senderEmail = import.meta.env.VITE_BREVO_SENDER_EMAIL || "officialtechzonegh@gmail.com";
    
    const requestBody = {
      sender: {
        name: "TechZone",
        email: senderEmail,
      },
      to: [{ email: to }],
      subject: subject,
      htmlContent: htmlContent,
    };

    console.log("📤 Sending request to Brevo...");
    console.log("Request body:", JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    console.log("📥 Response received");
    console.log("Status:", response.status);
    console.log("Status Text:", response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Brevo API Error Response:");
      console.error("Status:", response.status);
      console.error("Response:", errorText);
      
      try {
        const error = JSON.parse(errorText);
        console.error("Error Code:", error.code);
        console.error("Error Message:", error.message);
        
        // Specific error handling
        if (response.status === 401 || error.code === "unauthorized") {
          console.error("\n🔑 API KEY ERROR: Your API key is invalid or expired");
          console.error("   Solution: Get a new API key from https://my.brevo.com/account/api-keys");
        } else if (response.status === 400 && error.message && error.message.includes("sender")) {
          console.error("\n SENDER ERROR: Your sender email is not verified");
          console.error("   Solution: Verify your email at https://my.brevo.com/account/senders");
          console.error("   Current sender:", senderEmail);
        } else if (response.status === 403) {
          console.error("\n🚫 PERMISSION ERROR: Account restricted or email quota exceeded");
          console.error("   Solution: Check your Brevo account status");
        }
      } catch (e) {
        console.error("Could not parse error response");
      }
      
      return false;
    }

    const successResponse = await response.json();
    console.log("✅ Email sent successfully!");
    console.log("Message ID:", successResponse.messageId);
    console.log("=================================\n");
    return true;
  } catch (error) {
    console.error("❌ Network/Unexpected Error:");
    console.error(error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    console.log("=================================\n");
    return false;
  }
};

// Email service functions
export const emailService = {
  // Send login confirmation email
  sendLoginEmail: async (userName: string, userEmail: string): Promise<boolean> => {
    const subject = "Welcome Back to TechZone!";
    const htmlContent = createLoginEmailTemplate(userName);
    return sendEmail(userEmail, subject, htmlContent);
  },

  // Send purchase confirmation email to customer
  sendPurchaseConfirmation: async (
    userName: string,
    userEmail: string,
    orderDetails: {
      items: Array<{ name: string; quantity: number; price: number }>;
      subtotal: number;
      total: number;
      orderId: string;
    }
  ): Promise<boolean> => {
    const subject = `Order Confirmation - TechZone #${orderDetails.orderId}`;
    const htmlContent = createPurchaseEmailTemplate(userName, orderDetails);
    return sendEmail(userEmail, subject, htmlContent);
  },

  // Send purchase notification to admin
  sendAdminNotification: async (
    customerDetails: {
      name: string;
      email: string;
      contact: string;
      location: string;
      address: string;
      paymentMethod: string;
    },
    orderDetails: {
      items: Array<{ name: string; quantity: number; price: number }>;
      subtotal: number;
      total: number;
      orderId: string;
    }
  ): Promise<boolean> => {
    const subject = `New Order Received - #${orderDetails.orderId}`;
    const htmlContent = createAdminPurchaseNotificationTemplate(customerDetails, orderDetails);
    return sendEmail(ADMIN_EMAIL, subject, htmlContent);
  },
};
