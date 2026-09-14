import { GoogleGenerativeAI } from '@google/generative-ai';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message, product, customization, quantity } = req.body;

  // Basic Validation
  if (!email || !name) {
    return res.status(400).json({ error: 'Missing required fields: name and email.' });
  }

  try {
    // 1. Gemini AI Setup
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Correct Model Name (Use gemini-1.5-flash or gemini-2.5-flash)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a representative of Aura Global Industries, a premier headwear & apparel manufacturing company based in Nazimabad, Karachi, Pakistan.
Write a concise, warm, and professional confirmation email reply to ${name} acknowledging their inquiry about ${product || 'Custom Caps'} (Quantity: ${quantity || 'N/A'}, Customization: ${customization || 'N/A'}).
User message: "${message || 'Requesting quote details.'}"
Assure them that our sales team is reviewing their requirements and will reach out with a detailed price breakdown within 24 hours. Keep it under 150 words.`;

    const aiResult = await model.generateContent(prompt);
    const aiReply = aiResult.response.text();

    // 2. Nodemailer Transporter Setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    const ownerEmail = process.env.OWNER_EMAIL || process.env.EMAIL_USER;

    // 3. HTML Email Template for Professional Output
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 6px;">
        <h2 style="color: #0a0a0a; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Aura Global Industries</h2>
        <div style="font-size: 14px; line-height: 1.6; whitespace: pre-line;">
          ${aiReply}
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        
        <div style="font-size: 12px; color: #666; background-color: #f9f9f9; padding: 12px; border-radius: 4px;">
          <strong style="color: #0a0a0a;">Inquiry Summary:</strong><br />
          <strong>Client Name:</strong> ${name}<br />
          <strong>Phone/WhatsApp:</strong> ${phone || 'N/A'}<br />
          <strong>Product:</strong> ${product || 'Custom Caps'}<br />
          <strong>Customization:</strong> ${customization || 'N/A'}<br />
          <strong>Quantity:</strong> ${quantity || 'N/A'}<br />
        </div>

        <p style="font-size: 11px; color: #888; text-align: center; margin-top: 20px;">
          Aura Global Industries | Factory: Nazimabad, Karachi, Pakistan
        </p>
      </div>
    `;

    // 4. Send Email
    await transporter.sendMail({
      from: `"Aura Global Industries" <${process.env.EMAIL_USER}>`,
      to: email,
      cc: ownerEmail,
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