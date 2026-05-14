// Test script to verify Brevo email configuration
// Run this in your browser console to test email sending

export const testBrevoEmail = async () => {
  console.log("🧪 Testing Brevo Email Configuration...\n");
  
  const apiKey = import.meta.env.VITE_BREVO_API_KEY;
  const senderEmail = import.meta.env.VITE_BREVO_SENDER_EMAIL || "noreply@techzone.com";
  
  console.log("1. Checking API Key...");
  if (!apiKey) {
    console.error("❌ API Key is missing!");
    console.log("   Please add VITE_BREVO_API_KEY to your .env file");
    return false;
  }
  console.log("✅ API Key is configured");
  console.log(`   Key starts with: ${apiKey.substring(0, 12)}...`);
  
  console.log("\n2. Checking Sender Email...");
  console.log(`   Sender: ${senderEmail}`);
  console.log("⚠️  Make sure this email is verified in your Brevo dashboard");
  
  console.log("\n3. Testing API Connection...");
  
  try {
    const response = await fetch("https://api.brevo.com/v3/account", {
      headers: {
        "api-key": apiKey,
      },
    });
    
    if (response.ok) {
      const account = await response.json();
      console.log("✅ API Connection successful!");
      console.log(`   Account: ${account.email}`);
      console.log(`   Plan: ${account.plan.type}`);
      console.log(`   Credits: ${account.credits?.email}`);
    } else {
      const error = await response.json();
      console.error("❌ API Connection failed!");
      console.error("   Error:", error.message);
      return false;
    }
  } catch (error) {
    console.error("❌ Network error:", error);
    return false;
  }
  
  console.log("\n4. Sending Test Email...");
  const testEmail = prompt("Enter your email to receive a test message:");
  
  if (!testEmail) {
    console.log("️  Test cancelled");
    return false;
  }
  
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "TechZone Test",
          email: senderEmail,
        },
        to: [{ email: testEmail }],
        subject: "TechZone - Brevo Test Email",
        htmlContent: `
          <html>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
              <h2 style="color: #14213D;">✅ Brevo Email Test Successful!</h2>
              <p style="color: #4b5563;">This is a test email from TechZone.</p>
              <p style="color: #4b5563;">If you received this, your Brevo integration is working correctly.</p>
              <hr style="margin: 20px 0; border: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px;">
                Sent from: ${senderEmail}<br>
                API Key: ${apiKey.substring(0, 12)}...
              </p>
            </body>
          </html>
        `,
      }),
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log("✅ Test email sent successfully!");
      console.log(`   Message ID: ${result.messageId}`);
      console.log(`   Check your inbox at: ${testEmail}`);
      console.log("   (Also check spam/junk folder)");
      return true;
    } else {
      const error = await response.json();
      console.error("❌ Failed to send test email!");
      console.error("   Error Code:", error.code);
      console.error("   Error Message:", error.message);
      
      if (error.code === "unauthorized") {
        console.error("\n🔑 Solution: Your API key is invalid. Check VITE_BREVO_API_KEY in .env");
      } else if (error.message && error.message.includes("sender")) {
        console.error("\n📧 Solution: Your sender email is not verified!");
        console.error("   Go to: https://my.brevo.com/account/senders");
        console.error("   Verify your email: " + senderEmail);
      }
      
      return false;
    }
  } catch (error) {
    console.error("❌ Network error:", error);
    return false;
  }
};

// Auto-run if in browser
if (typeof window !== 'undefined') {
  console.log("Brevo Email Test Utility Loaded");
  console.log("Run: testBrevoEmail() in console to test your configuration");
  (window as any).testBrevoEmail = testBrevoEmail;
}
