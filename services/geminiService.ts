
import { GoogleGenAI, Type } from "@google/genai";
import { CoffeeStory } from "../types";

export const generateCoffeeStory = async (): Promise<CoffeeStory> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = "Generate a short, poetic storytelling heading and subtext for a high-end coffee brand called 'Freya'. The background is a slow-motion video of rich espresso being poured. Focus on the sensory details: the golden crema, the aroma, and the soul of the bean.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            heading: { type: Type.STRING, description: 'A bold poetic heading' },
            subtext: { type: Type.STRING, description: 'A short descriptive paragraph' },
            poeticDetail: { type: Type.STRING, description: 'A one-line artistic thought' }
          },
          required: ["heading", "subtext", "poeticDetail"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return result as CoffeeStory;
  } catch (error) {
    console.error("Failed to generate coffee story:", error);
    return {
      heading: "The Golden Alchemy",
      subtext: "Born from the earth's deepest secrets, every drop of Freya espresso is a testament to the patient dance between flame and bean.",
      poeticDetail: "Captured in the amber light of dawn."
    };
  }
};
