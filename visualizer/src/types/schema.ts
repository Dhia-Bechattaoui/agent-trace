export interface TraceEvent {
  id: string;
  timestamp: string;
  agentId: string;
  runId: string;
  type: 'llm_call' | 'tool_call' | 'action' | 'error';
  
  // The context at this step (Environment State)
  state?: {
    url?: string;
    domSnapshot?: string;
    screenshotBase64?: string;
  };

  // The AI interaction
  llmInteraction?: {
    systemPrompt: string;
    userPrompt: string;
    response: string;
    tokens?: {
      prompt: number;
      completion: number;
    };
  };

  // Tools called by the agent
  toolCalls?: Array<{
    name: string;
    arguments: Record<string, any>;
    result?: any;
  }>;
}
