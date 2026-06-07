import { useState, useEffect } from 'react';
import type { TraceEvent } from './types/schema';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
  const [events, setEvents] = useState<TraceEvent[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    fetch('/test_run.jsonl')
      .then(res => res.text())
      .then(text => {
        const lines = text.trim().split('\n');
        const parsedEvents = lines.map(line => JSON.parse(line) as TraceEvent);
        setEvents(parsedEvents);
      })
      .catch(err => console.error("Failed to load trace", err));
  }, []);

  const currentEvent = events[currentStep];

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans overflow-hidden">
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-blue-400">AgentTrace</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Recent Runs</h2>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600 transition-colors">
              <div className="text-sm font-medium">test_run.jsonl</div>
              <div className="text-xs text-gray-400">{events.length} steps</div>
            </li>
          </ul>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-20 border-b border-gray-700 bg-gray-800 flex flex-col justify-center px-6">
          <div className="flex justify-between items-center mb-2">
             <span className="text-sm font-medium">Timeline Scrubber</span>
             <span className="text-xs text-gray-400">Step {currentStep + 1} of {events.length}</span>
          </div>
          <input 
            type="range" 
            min={0} 
            max={Math.max(0, events.length - 1)} 
            value={currentStep}
            onChange={(e) => setCurrentStep(parseInt(e.target.value))}
            className="w-full accent-blue-500"
          />
        </header>

        {currentEvent ? (
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 border-r border-gray-700 p-4 bg-gray-950 overflow-y-auto relative">
               <div className="absolute top-2 left-2 bg-gray-800 text-xs px-2 py-1 rounded text-gray-400 border border-gray-600 z-10">Environment State: {currentEvent.type}</div>
               
               {currentEvent.state?.url && (
                 <div className="mb-4 mt-8 bg-gray-800 p-2 rounded text-xs text-gray-300 font-mono">
                   URL: {currentEvent.state.url}
                 </div>
               )}

               <div className="mt-4 bg-white rounded overflow-hidden h-[500px]">
                  {currentEvent.state?.domSnapshot ? (
                     <iframe 
                       srcDoc={currentEvent.state.domSnapshot} 
                       className="w-full h-full bg-white border-none" 
                       title="dom-snapshot"
                       sandbox="allow-same-origin"
                     />
                  ) : (
                     <div className="flex items-center justify-center h-full text-gray-400">No DOM Snapshot</div>
                  )}
               </div>
            </div>

            <div className="flex-1 p-4 bg-gray-900 overflow-y-auto relative">
               <div className="absolute top-2 left-2 bg-gray-800 text-xs px-2 py-1 rounded text-gray-400 border border-gray-600">AI State</div>
               
               <div className="mt-10 space-y-6">
                  {currentEvent.llmInteraction ? (
                    <>
                      <div>
                        <h3 className="font-semibold text-blue-400 text-xs uppercase tracking-wider mb-2">System Prompt</h3>
                        <div className="border border-gray-700 rounded overflow-hidden">
                          <SyntaxHighlighter language="markdown" style={vscDarkPlus} customStyle={{ margin: 0, fontSize: '0.75rem', background: '#1f2937' }}>
                            {currentEvent.llmInteraction.systemPrompt}
                          </SyntaxHighlighter>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-green-400 text-xs uppercase tracking-wider mb-2">User Prompt</h3>
                        <div className="border border-gray-700 rounded overflow-hidden">
                          <SyntaxHighlighter language="markdown" style={vscDarkPlus} customStyle={{ margin: 0, fontSize: '0.75rem', background: '#1f2937' }}>
                            {currentEvent.llmInteraction.userPrompt}
                          </SyntaxHighlighter>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-purple-400 text-xs uppercase tracking-wider mb-2">Response</h3>
                        <div className="border border-gray-700 rounded overflow-hidden">
                          <SyntaxHighlighter language="markdown" style={vscDarkPlus} customStyle={{ margin: 0, fontSize: '0.75rem', background: '#1f2937' }}>
                            {currentEvent.llmInteraction.response}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-gray-500 italic text-sm">No LLM Interaction recorded for this step.</div>
                  )}

                  {currentEvent.toolCalls && currentEvent.toolCalls.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-orange-400 text-xs uppercase tracking-wider mb-2">Tool Calls</h3>
                      <div className="border border-gray-700 rounded overflow-hidden">
                        <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{ margin: 0, fontSize: '0.75rem', background: '#1f2937' }}>
                          {JSON.stringify(currentEvent.toolCalls, null, 2)}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  )}
               </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Loading trace data...
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
