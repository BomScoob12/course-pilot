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
  const fullResponse = new Array<OllamaResponse>();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const decodedValue = decoder.decode(value, { stream: true });

    // this is recieving chunks of data from the LLM like this.
    // Received chunk: {"model":"deepseek-r1:7b","created_at":"2025-08-13T07:14:04.1198439Z","response":"Programming","done":false}
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

  // split two section of response
  // 1. thinking section
  // 2. JSON section

  let thinkingSection = '';
  const startThinkingIndex = textResponse.indexOf('<think>');
  const endThinkingIndex = textResponse.lastIndexOf('</think>');
  if (startThinkingIndex !== -1 && endThinkingIndex !== -1) {
    thinkingSection = textResponse
      .substring(startThinkingIndex + 7, endThinkingIndex)
      .trim();
  }

  console.log('Thinking section:', thinkingSection);

  let jsonSction = '';
  const startJsonIndex = textResponse.indexOf('{');
  const endJsonIndex = textResponse.lastIndexOf('}');
  console.log('Start JSON Index:', startJsonIndex);
  console.log('End JSON Index:', endJsonIndex);
  if (startJsonIndex !== -1 && endJsonIndex !== -1) {
    jsonSction = textResponse
      .substring(startJsonIndex, endJsonIndex + 1)
      .trim();
  }

  console.log('JSON section:', jsonSction);
  console.log('JSON section parse object:', JSON.parse(jsonSction));

  return NextResponse.json(fullResponse, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export { POST };
