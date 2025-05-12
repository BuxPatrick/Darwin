import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function generateGeminiResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
}

export async function detectSubjectAndTopic(message: string): Promise<{ subject: string; topic: string }> {
  const prompt = `You are an educational subject classifier. Analyze the following message and identify the main academic subject and specific topic being discussed.
  Return ONLY a JSON object with 'subject' and 'topic' fields. Do not include any markdown formatting or other text.
  
  Common subjects include: Mathematics, Science, History, Literature, Computer Science, Physics, Chemistry, Biology, Geography, Economics, etc.
  Topics should be specific to the subject (e.g., "Calculus" for Mathematics, "World War II" for History).
  
  Message: "${message}"`;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini API Response:', data);
    
    const responseText = data.candidates[0].content.parts[0].text;
    console.log('Response Text:', responseText);
    
    // Clean up the response text by removing markdown formatting
    const cleanJson = responseText
      .replace(/```json\n?/g, '') // Remove ```json
      .replace(/```\n?/g, '')     // Remove closing ```
      .trim();                    // Remove extra whitespace
    
    console.log('Cleaned JSON:', cleanJson);
    
    const result = JSON.parse(cleanJson);
    console.log('Parsed Result:', result);
    
    return {
      subject: result.subject || 'General Knowledge',
      topic: result.topic || 'Learning'
    };
  } catch (error) {
    console.error('Error detecting subject and topic:', error);
    return {
      subject: 'General Knowledge',
      topic: 'Learning'
    };
  }
} 