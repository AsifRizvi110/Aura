import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message, product, customization, quantity } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Missing required fields: name and email.' });
  }

  try {
    // 1. Gemini AI Direct REST API Call
    const promptText = `You are a representative of Aura Global Industries, a premier headwear & apparel manufacturing company based in Nazimabad, Karachi, Pakistan.
Write a concise, warm, and professional confirmation email reply to ${name} acknowledging their inquiry about ${product || 'Custom Caps'} (Quantity: ${quantity || 'N/A'}, Customization: ${customization || 'N/A'}).
User message: "${message || 'Requesting quote details.'}"
Assure them that our sales team is reviewing their requirements and will reach out with a detailed price breakdown within 24 hours. Keep it under 150 words.`;

    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

    const aiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
      }),
    });

    const aiData = await aiResponse.json();

    if (!aiResponse.ok) {
      throw new Error(aiData.error?.message || 'Failed to generate content from Gemini API');
    }

    const aiReply =
      aiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Thank you for reaching out to Aura Global Industries. Our team will review your quote request and get back to you shortly.';

    // 2. Nodemailer Setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const ownerEmail = process.env.OWNER_EMAIL || process.env.EMAIL_USER;

    // 3. HTML Layout
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 6px;">
        <h2 style="color: #0a0a0a; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Aura Global Industries</h2>
        <div style="font-size: 14px; line-height: 1.6; white-space: pre-line;">
          ${aiReply}
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <div style="font-size: 12px; color: #666; background-color: #f9f9f9; padding: 12px; border-radius: 4px;">
          <strong style="color: #0a0a0a;">Inquiry Details Submitted:</strong><br />
          <strong>Name:</strong> ${name}<br />
          <strong>Phone:</strong> ${phone || 'N/A'}<br />
          <strong>Product:</strong> ${product || 'Custom Caps'}<br />
          <strong>Quantity:</strong> ${quantity || 'N/A'}<br />
        </div>
      </div>
    `;

    // 4. Send Email Direct to Client Address (`to: email`)
    await transporter.sendMail({
      from: `Aura Global Industries <${process.env.EMAIL_USER}>`,
      to: email.trim(), // User ki email par send hoga
      replyTo: ownerEmail, // User reply karega to aapko milega
      bcc: ownerEmail, // CC ki jagah BCC use karein taaki header confuse na ho
      subject: `Quote Request Confirmation - Aura Global Industries`,
      text: aiReply,
      html: htmlTemplate,
    });

    return res.status(200).json({ success: true, reply: aiReply });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}