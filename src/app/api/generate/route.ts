// this api call is used to generate a response from the LLM

import { OllamaResponse } from '@/types/ollama-response-type';
import { NextResponse } from 'next/server';

const LLM_MODEL = process.env.LLM_MODEL || 'deepseek-r1:7b';
const LLM_API_URL = process.env.LLM_API_URL || 'http://127.0.0.1:11434';
const PROMPT_TEMPLATE = `
You are a helpful AI assistant, that can generate course content based on user prompts.
I provide you with a model of Course response in json format.

\`\`\`json
{
  "title": "Course Title",
  "description": "Detailed course description",
  "instructor": "Instructor Name",
  "duration": 10, // in hours
  "level": "beginner", // can be beginner, intermediate, or advanced
  "price": 99.99, // in USD
  "category": "Programming" // e.g., Programming, Design, Marketing
};
\`\`\`

Response only in JSON format text [NOT JAVASCRIPT OBJECT!].
Do not include any text before or after the JSON.
\n
`;

const generatePrompt = (userPrompt: string) => {
  return `${PROMPT_TEMPLATE}\n\nUser Prompt: ${userPrompt}`;
};

async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt || typeof prompt !== 'string') {
    return new Response('Invalid prompt', { status: 400 });
  }

  const response = await fetch(`${LLM_API_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: LLM_MODEL,
      prompt: generatePrompt(prompt),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('LLM API Error:', errorText);
    return NextResponse.json(
      { error: 'Failed to generate response from LLM' },
      { status: response.status }
    );
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder('utf-8');

  if (!reader) {
    return new Response('No response body', { status: 500 });
  }

  const fullResponse: OllamaResponse[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const decodedValue = decoder.decode(value, { stream: true });
    console.log('Received chunk:', decodedValue);

    try {
      fullResponse.push(JSON.parse(decodedValue));
    } catch (error) {
      console.error('Error parsing JSON chunk:', error);
      return NextResponse.json(
        { error: 'Failed to parse response from LLM' },
        { status: 500 }
      );
    }
  }

  console.log('Full response received:', fullResponse.length, 'chunks');

  const textResponse = fullResponse.map((r) => r.response).join('');
  console.log('Text response:', textResponse);

  // thinking section
  let thinkingSection = '';
  const thinkStart = textResponse.indexOf('<think>');
  const thinkEnd = textResponse.indexOf('</think>');
  if (thinkStart !== -1 && thinkEnd !== -1) {
    thinkingSection = textResponse
      .substring(thinkStart + '<think>'.length, thinkEnd)
      .trim();
  }
  console.log('Thinking section:', thinkingSection);

  // json section
  let jsonSection = '';
  const jsonStart = textResponse.indexOf('{');
  const jsonEnd = textResponse.lastIndexOf('}');
  if (jsonStart !== -1 && jsonEnd !== -1) {
    jsonSection = textResponse.substring(jsonStart, jsonEnd + 1).trim();
  }

  let parsedJson = {};
  try {
    parsedJson = JSON.parse(jsonSection);
  } catch (err) {
    console.error('Error parsing JSON section:', err);
  }
  console.log('JSON section parse object:', parsedJson);

  const responseModel = {
    model: LLM_MODEL,
    created_at: new Date().toISOString(),
    generated_data: parsedJson,
    thinking_section: thinkingSection,
  };
  return NextResponse.json(responseModel, { status: 200 });
}

export { POST };
