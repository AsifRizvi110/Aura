import { GoogleGenerativeAI } from '@google/generative-ai';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, product, quantity } = req.body;

  try {
    // 1. Gemini AI Setup (Updated to gemini-3.6-flash)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const prompt = `You are a representative of Aura Global Industries, a premier headwear & apparel manufacturing company based in Nazimabad, Karachi, Pakistan.
Write a concise, warm, and professional email reply to ${name} acknowledging their inquiry about ${product || 'custom caps'} (Quantity: ${quantity || 'N/A'}).
User message: "${message || 'Requesting quote details.'}"
Assure them that our sales team is reviewing their requirements and will reach out with a detailed price breakdown shortly.`;

    const aiResult = await model.generateContent(prompt);
    const aiReply = aiResult.response.text();

    // 2. Nodemailer Transporter Setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Email to Customer
    await transporter.sendMail({
      from: `"Aura Global Industries" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting Aura Global Industries',
      text: aiReply,
    });

    // 4. Notification Email to Owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL || process.env.EMAIL_USER,
      subject: `New Lead: ${name} - ${product || 'Cap Inquiry'}`,
      text: `New Inquiry Received:\n\nName: ${name}\nEmail: ${email}\nProduct: ${product}\nQuantity: ${quantity}\nMessage: ${message}\n\nAI Reply Sent:\n${aiReply}`,
    });

    return res.status(200).json({ success: true, reply: aiReply });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}