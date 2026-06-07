import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const outputDir = path.resolve(__dirname, '../../.agent_traces');
const outputFile = path.join(outputDir, 'test_run.jsonl');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const runId = `run-${Date.now()}`;
const agentId = 'browser-scraper-agent';

function createEvent(type, state, llmInteraction, toolCalls) {
  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    agentId,
    runId,
    type,
    state,
    llmInteraction,
    toolCalls,
  };
}

const events = [
  createEvent(
    'llm_call',
    { url: 'https://example.com/login', domSnapshot: '<html><body><form><input name="user"/><button>Login</button></form></body></html>' },
    {
      systemPrompt: 'You are a web automation agent.',
      userPrompt: 'Log into the application.',
      response: 'I will fill the username field.',
      tokens: { prompt: 150, completion: 25 },
    },
    [{ name: 'fill_input', arguments: { selector: 'input[name="user"]', value: 'admin' } }]
  ),
  createEvent(
    'action',
    { url: 'https://example.com/login', domSnapshot: '<html><body><form><input name="user" value="admin"/><button>Login</button></form></body></html>' },
    undefined,
    undefined
  ),
  createEvent(
    'llm_call',
    { url: 'https://example.com/login', domSnapshot: '<html><body><form><input name="user" value="admin"/><button>Login</button></form></body></html>' },
    {
      systemPrompt: 'You are a web automation agent.',
      userPrompt: 'The username is filled. What next?',
      response: 'I will click the login button.',
      tokens: { prompt: 160, completion: 20 },
    },
    [{ name: 'click_button', arguments: { selector: 'button' } }]
  )
];

const fileStream = fs.createWriteStream(outputFile);
events.forEach(event => {
  fileStream.write(JSON.stringify(event) + '\n');
});
fileStream.end();

console.log(`Successfully generated mock data at ${outputFile}`);
