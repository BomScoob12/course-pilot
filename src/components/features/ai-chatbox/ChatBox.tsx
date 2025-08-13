import React from 'react';

function ChatBox({
  promptValue,
  thinkingMessage,
  setPromptValue,
  handleSubmit,
}: {
  promptValue: string;
  thinkingMessage?: string;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptValue(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">Let{`\'`}s AI Generate your course</h1>
      <p>
        Use the input box below to ask questions or provide prompts for AI
        assistance in course creation.
      </p>
      <ul className="list-disc list-inside space-y-1 text-gray-800">
        <li>Title</li>
        <li>Course Description</li>
      </ul>

      {thinkingMessage && (
        <p className="text-gray-600 mt-4">{thinkingMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Type your question or prompt here..."
          className="w-full mt-6 h-32 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          cols={50}
          aria-label="AI prompt input"
          spellCheck="true"
          autoFocus
          value={promptValue}
          onChange={handleInputChange}
        ></textarea>

        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate course content
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
