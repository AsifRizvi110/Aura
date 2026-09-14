import { GoogleGenerativeAI } from '@google/generative-ai';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, category, customization, quantity, message } = req.body;

  try {
    // 1. Initialize Gemini AI (Free Model)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an AI sales agent for Aura Global Industries (custom headwear manufacturer in Karachi, Pakistan). 
    A client named ${name} requested a quote for ${category} (Quantity: ${quantity}, Customization: ${customization}). 
    Details: ${message}. 
    Write a short, highly professional response acknowledging their quote request and letting them know our sales team will follow up shortly with pricing.`;

    const aiResult = await model.generateContent(prompt);
    const aiReply = aiResult.response.text();

    // 2. Setup Free Email Transporter (Nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to Owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Lead: ${name} (${category})`,
      html: `<h3>New Lead Received</h3>
             <p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Phone:</b> ${phone}</p>
             <p><b>Category:</b> ${category}</p>
             <p><b>Quantity:</b> ${quantity}</p>
             <p><b>Message:</b> ${message}</p>`,
    });

    // Confirmation Email to Client
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Quote Request Received - Aura Global Industries`,
      text: aiReply,
    });

    return res.status(200).json({ success: true, reply: aiReply });
  } catch (error) {
    console.error('AI/Email Error:', error);
    return res.status(500).json({ error: error.message });
  }
}