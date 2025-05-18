// ../components/Interview/CodeEditor.jsx
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Start coding...');
  const [output, setOutput] = useState('');
  const [outputType, setOutputType] = useState('success'); // 'success' or 'error'

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setCode('');
    setOutput('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setOutput('Code copied to clipboard!');
    setOutputType('success');
  };

  const handleRun = () => {
  if (language !== 'javascript') {
    setOutput(`Execution for "${language}" not supported yet.`);
    setOutputType('error');
    return;
  }

  try {
    let logs = [];
    const customConsole = {
      log: (...args) => logs.push(args.join(' ')),
    };

    // Redirect console.log calls
    const wrappedCode = `
      (function(console){
        ${code}
      })({
        log: (...args) => { console.log(...args); __capture(...args); }
      });
    `;

    const __capture = (...args) => {
      logs.push(args.join(' '));
    };

    // Use new Function to sandbox user code
    const runner = new Function('__capture', wrappedCode);
    runner(__capture);

    setOutput(logs.join('\n') || 'Code executed successfully with no output.');
    setOutputType('success');
  } catch (err) {
    setOutput(err.message);
    setOutputType('error');
  }
};


  return (
    <div className="bg-[#1e1e1e] text-white p-4 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-green-400 font-semibold">Code Editor</h2>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-[#2d2d2d] text-white p-1 rounded"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="typescript">TypeScript</option>
        </select>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="400px"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={(value) => setCode(value)}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'Fira Code, monospace',
        }}
      />

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleCopy}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
        >
          Copy Code
        </button>
        <button
          onClick={handleRun}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
        >
          Run Code
        </button>
      </div>

      {/* Terminal Output */}
      {output && (
        <div className="mt-4 bg-black rounded-lg p-3 font-mono text-sm border border-gray-700">
          <div className="mb-1 text-gray-400">Terminal Output:</div>
          <pre className={outputType === 'error' ? 'text-red-500' : 'text-green-400'}>
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
