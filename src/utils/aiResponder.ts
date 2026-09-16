export const generateAiReply = async (userMessage: string, userName: string) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return "Thank you for contacting Aura Global Industries. We have received your inquiry.";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an AI assistant for Aura Global Industries (cap manufacturer). 
              Respond to customer "${userName}" in the EXACT SAME LANGUAGE they used in their message. 
              Keep it professional, polite, and short (under 3 sentences).
              User Message: "${userMessage}"`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Thank you for reaching out to Aura Global Industries. Our team will contact you shortly.";
  }
};