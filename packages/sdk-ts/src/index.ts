import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface TraceEvent {
  id: string;
  timestamp: string;
  agentId: string;
  runId: string;
  type: 'llm_call' | 'tool_call' | 'action' | 'error';
  state?: {
    url?: string;
    domSnapshot?: string;
    screenshotBase64?: string;
  };
  llmInteraction?: {
    systemPrompt: string;
    userPrompt: string;
    response: string;
    tokens?: {
      prompt: number;
      completion: number;
    };
  };
  toolCalls?: Array<{
    name: string;
    arguments: Record<string, any>;
    result?: any;
  }>;
}

export interface AgentTracerConfig {
  agentId: string;
  outputDir?: string; // defaults to .agent_traces in cwd
}

export class AgentTracer {
  private agentId: string;
  private runId: string;
  public outputFilePath: string;

  constructor(config: AgentTracerConfig) {
    this.agentId = config.agentId;
    this.runId = `run-${Date.now()}`;
    
    const outputDir = config.outputDir || path.resolve(process.cwd(), '.agent_traces');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    this.outputFilePath = path.join(outputDir, `${this.runId}.jsonl`);
  }

  public logEvent(
    type: TraceEvent['type'],
    state?: TraceEvent['state'],
    llmInteraction?: TraceEvent['llmInteraction'],
    toolCalls?: TraceEvent['toolCalls']
  ) {
    const event: TraceEvent = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      agentId: this.agentId,
      runId: this.runId,
      type,
      state,
      llmInteraction,
      toolCalls
    };

    fs.appendFileSync(this.outputFilePath, JSON.stringify(event) + '\n');
  }
}
