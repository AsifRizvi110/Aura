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
    // 1. Multi-Language Adaptive Gemini Prompt Setup
    const promptText = `You are a professional customer support representative for Aura Global Industries, a top-tier headwear & apparel manufacturer based in Nazimabad, Karachi, Pakistan.

CRITICAL INSTRUCTION FOR LANGUAGE:
1. Detect the language used in the user's message below: "${message || 'Requesting quote details.'}".
2. Write the ENTIRE reply in the SAME LANGUAGE as the user's message (e.g., if the message is in Urdu, reply in Urdu; if in Roman Urdu, reply in Roman Urdu; if in Spanish, reply in Spanish; if in English, reply in English).

EMAIL CONTENT REQUIREMENTS:
- Address the client by name: ${name}
- Acknowledge their inquiry regarding ${product || 'Custom Caps'} (Quantity: ${quantity || 'N/A'}, Customization: ${customization || 'N/A'}).
- Reassure them that our sales team is analyzing their design and specifications, and will send a detailed custom quotation within 24 hours.
- Keep the response warm, professional, concise, and under 150 words.`;

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

    // 2. Nodemailer Transporter Setup
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
          <strong style="color: #0a0a0a;">Inquiry Summary / تفصیلات:</strong><br />
          <strong>Client Name:</strong> ${name}<br />
          <strong>Phone:</strong> ${phone || 'N/A'}<br />
          <strong>Product:</strong> ${product || 'Custom Caps'}<br />
          <strong>Quantity:</strong> ${quantity || 'N/A'}<br />
        </div>
        <p style="font-size: 11px; color: #888; text-align: center; margin-top: 20px;">
          Aura Global Industries | Factory: Nazimabad, Karachi, Pakistan
        </p>
      </div>
    `;

    // 4. Send Email
    await transporter.sendMail({
      from: `Aura Global Industries <${process.env.EMAIL_USER}>`,
      to: email.trim(),
      replyTo: ownerEmail,
      bcc: ownerEmail,
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