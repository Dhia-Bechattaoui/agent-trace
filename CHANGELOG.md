# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-07
### Added
- Syntax highlighting (`react-syntax-highlighter`) for the AI State panel to beautifully format JSON tool calls and Markdown prompts.
- Comprehensive `README.md` documentation covering SDK installation, usage, and Dashboard instructions.
- MVP officially completed!

## [0.4.0] - 2026-06-07
### Added
- Initial release of the `@agent-trace/sdk` TypeScript package (`packages/sdk-ts`).
- `AgentTracer` class for logging agent events (`llm_call`, `action`, `error`, etc.) to local `.jsonl` files.
- Example script (`example.ts`) demonstrating how to use the SDK to record trace events.

## [0.3.0] - 2026-06-07
### Added
- Interactive Timeline Scrubber to step through trace events chronologically.
- Dynamic data loading to parse and display `.jsonl` trace files in the dashboard.
- Live Environment State panel rendering DOM snapshots safely via iframes.
- Live AI State panel displaying structured LLM interactions and tool calls.

## [0.2.0] - 2026-06-07
### Added
- TailwindCSS v4 integration into the Vite application.
- Core visualizer dashboard UI layout (Sidebar, Main Content, and Split-View panels for Environment/AI states).

## [0.1.0] - 2026-06-07
### Added
- Vite + React + TS setup for the `visualizer` dashboard.
- `TraceEvent` TypeScript schema definition for trace logs.
- Mock data generation script (`generate-mock-data.js`) to create `.jsonl` trace files.

## [0.0.1] - 2026-06-07
### Added
- Initial project directory structure.
- Basic `.agents` configuration folders.
- `PLAN.md`, `README.md`, and `CHANGELOG.md`.

[1.0.0]: https://github.com/dhia/agent-trace/compare/v0.4.0...v1.0.0
[0.4.0]: https://github.com/dhia/agent-trace/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/dhia/agent-trace/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/dhia/agent-trace/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/dhia/agent-trace/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/dhia/agent-trace/compare/v0.0.0...v0.0.1
