# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[0.3.0]: https://github.com/dhia/agent-trace/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/dhia/agent-trace/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/dhia/agent-trace/compare/v0.0.1...v0.1.0
[0.0.1]: https://github.com/dhia/agent-trace/compare/v0.0.0...v0.0.1
