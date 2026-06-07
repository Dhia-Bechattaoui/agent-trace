import { AgentTracer } from './src/index';

const tracer = new AgentTracer({
  agentId: 'my-test-agent',
});

console.log('Starting trace...', tracer.outputFilePath);

tracer.logEvent(
  'llm_call',
  { url: 'https://github.com' },
  {
    systemPrompt: 'You are an agent',
    userPrompt: 'Find the latest release',
    response: 'I will use the search tool.'
  },
  [{ name: 'search_repo', arguments: { query: 'releases' } }]
);

tracer.logEvent(
  'action',
  { url: 'https://github.com/search?q=releases', domSnapshot: '<h1>Search Results</h1>' },
);

console.log('Finished writing trace data!');
