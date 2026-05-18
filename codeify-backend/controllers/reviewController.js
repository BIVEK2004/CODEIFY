import { GoogleGenAI } from "@google/genai";

export const reviewCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

    // Validation
    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "Code and language fields are required",
      });
    }

    // Prompt
    const prompt = `
You are an expert senior software engineer and professional code reviewer.

Analyze the given ${language} code and provide a complete review in the following format:

## Overall Rating
(Excellent / Good / Average / Poor)

## What the Code Does
Explain step by step in simple words.

## Code Output if Without Error and if error tell where the error is like a code editor does

## Strengths
- List what is done well.

## Issues Found
- Syntax errors
- Logical errors
- Performance issues
- Security issues
- Edge cases

## Suggestions for Improvement
- Best practices
- Optimization tips
- Readability improvements

## Improved Version
Provide a better version of the code if improvements are needed.

Code:
${code}
`;

    // OpenRouter API Call
    const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

    const review =
      response ||
      "No review generated.";

    return res.status(200).json({
      success: true,
      review:response.text,
    });
  } catch (error) {
    console.error(
      "Error during code review:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate review.",
      error: error.response?.data || error.message,
    });
  }
};