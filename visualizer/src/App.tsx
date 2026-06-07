import { useState } from 'react';

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans overflow-hidden">
      {/* Sidebar for runs */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-blue-400">AgentTrace</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Recent Runs</h2>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 transition-colors">
              <div className="text-sm font-medium">run-123456789</div>
              <div className="text-xs text-gray-400">3 steps</div>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Header/Scrubber Area Placeholder */}
        <header className="h-16 border-b border-gray-700 bg-gray-800 flex items-center px-6">
          <div className="text-sm text-gray-300">Timeline Scrubber will go here</div>
        </header>

        {/* Split View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Environment State */}
          <div className="flex-1 border-r border-gray-700 p-4 bg-gray-950 overflow-y-auto relative">
             <div className="absolute top-2 left-2 bg-gray-800 text-xs px-2 py-1 rounded text-gray-400 border border-gray-600">Environment State</div>
             <div className="mt-12 flex items-center justify-center h-full border-2 border-dashed border-gray-800 rounded-lg">
                <span className="text-gray-600">DOM/Screenshot View</span>
             </div>
          </div>

          {/* Right Panel: AI State */}
          <div className="flex-1 p-4 bg-gray-900 overflow-y-auto relative">
             <div className="absolute top-2 left-2 bg-gray-800 text-xs px-2 py-1 rounded text-gray-400 border border-gray-600">AI State</div>
             
             <div className="mt-10 space-y-6">
                <div>
                  <h3 className="font-semibold text-blue-400 text-xs uppercase tracking-wider mb-2">Prompt</h3>
                  <div className="bg-gray-800 border border-gray-700 p-3 rounded text-gray-300 font-mono text-xs whitespace-pre-wrap">
                    You are a web automation agent.
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-green-400 text-xs uppercase tracking-wider mb-2">Response</h3>
                  <div className="bg-gray-800 border border-gray-700 p-3 rounded text-gray-300 font-mono text-xs whitespace-pre-wrap">
                    I will fill the username field.
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-purple-400 text-xs uppercase tracking-wider mb-2">Tool Calls</h3>
                  <div className="bg-gray-800 border border-gray-700 p-3 rounded text-gray-300 font-mono text-xs overflow-x-auto">
                    {`[
  {
    "name": "fill_input",
    "arguments": {
      "selector": "input[name='user']",
      "value": "admin"
    }
  }
]`}
                  </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
