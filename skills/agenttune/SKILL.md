---
name: agenttune
description: Discover, evaluate, and safely apply portable AI communication preference templates (43 MIT-licensed profiles across MBTI, Enneagram, DISC, Attachment, and Big Five/OCEAN), consult 36 empirical AI psychology studies, 54 setup guides, and 25 model-family personality profiles (87 primary checkpoints; 93 tested incl. 6 sparse) across 2023–2026 and deterministic IF/THEN prompt design rules, administer open personality questionnaires locally, and merge non-destructive preference blocks into ChatGPT, Claude, Meta Muse Soul.md, Grok, Gemini, CLAUDE.md, AGENTS.md, and Cursor rules via https://agent-tune.com/mcp or raw Markdown/JSON endpoints.
---

# AgentTune Skill (`https://agent-tune.com`)

Use this skill when a user wants to:
- Change how an AI assistant or coding agent talks to them (directness, answer-first structure, lists vs. prose, pushback, check-in frequency, reasoning-effort verbosity caps, or uncertainty flags)
- Take a free personality test locally to find a matching communication template
- Consult primary-source AI psychology benchmarks (36 studies, 12 Personality Atlas pages, 54 setup guides, and 25 model-family profiles spanning 87 primary checkpoints / 93 tested across 2023–2026, 10,000+ psychometric sheets, and reasoning-trace audits)
- Audit, convert, or merge custom instructions without overwriting project rules

## 1. Zero-Auth Remote MCP Server (Preferred)

Connect any Streamable HTTP MCP client to **`https://agent-tune.com/mcp`** (no API key or login needed; supports MCP `2025-06-18`, `2025-03-26`, and `2024-11-05`):

```sh
claude mcp add --transport http agenttune https://agent-tune.com/mcp
```

### Read-Only MCP Tools (12 Tools, v1.5.0)
1. `list_tunings` (`{ system?: "mbti" | "enneagram" | "disc" | "attachment" | "ocean" }`): Lists all 43 MIT communication templates with slugs, one-line summaries, and URLs.
2. `get_tuning` (`{ system, slug }`): Returns the clean Markdown rules in `structuredContent.body` and YAML metadata in `structuredContent.metadata_markdown`. Install **only** `body`.
3. `get_test_spec` (`{ test: "mbti" | "enneagram" | "disc" | "attachment" | "big-five" }`): Returns questions, answer scales, and local scoring rules. **Keep user answers local**—never send user answers to AgentTune.
4. `list_resources` (`{ kind?: "guide" | "research" | "model" | "hub", query?: string }`): Searches all 54 setup guides, all 36 empirical AI psychology studies (12 Personality Atlas studies + Waves 1–4, 2023–2026), all 25 model-family personality profiles, and directory hubs (including `/models/`).
5. `get_resource` (`{ id }`): Fetches the clean Markdown mirror of any guide, research study, model profile, or directory hub (`models-hub`, etc.).
6. `get_free_tools` (`{}`): Lists the 8 local `window.AgentTuneTools` text-processing instruments (paired with the 2 interactive template generators at `/tools/` — 10 free browser tools total).
7. `check_instructions` (`{ text }`): Lints instruction or system-prompt text for duplicates, absolute rules without exceptions, safety-override wording, uncertainty suppression, long lines, and verbosity contradictions.
8. `convert_instructions` (`{ text, destination, existing? }`): Formats or safely merges instruction blocks with `agenttune:preferences` markers for `plain`, `chatgpt`, `claude`, `project`, `muse`, `claude-code`, `codex`, or `api`.
9. `build_preferences` (`{ length, tone, format, challenge, questions, context?, destination?, existing? }`): Generates structured Markdown communication preferences from explicit choices.
10. `get_model_profile` (`{ model, checkpoint? }`): Returns empirical Big Five, IPIP-HEXACO, MBTI, Enneagram, DISC, Attachment, Shannon entropy, and behavioral Track B metrics for any of the 25 model families (87 primary checkpoints).
11. `compare_models` (`{ models: string[] }`): Compares 2 to 6 model families side-by-side across personality traits, tie rates, consistency entropy, and slop markers.
12. `recommend_rules` (`{ goal, destination? }`): Returns research-backed behavioral rules, empirical `IF/THEN` rules, and study citations tailored to a goal (`directness`, `anti-sycophancy`, `conciseness`, `reasoning`, `precedence`, `warmth-without-flattery`, `multi-agent`, `coding`).

## 2. Direct HTTPS / Markdown Endpoints (No MCP Required)

- **Machine index:** `https://agent-tune.com/llms.txt`
- **All 43 template bodies + install rules in one file:** `https://agent-tune.com/llms-full.txt`
- **Agent Research Briefs (single-fetch IF/THEN synthesis JSON, 15 Wave 1–4 studies):** `https://agent-tune.com/research/data/november-2026-agent-research-briefs.json` (deterministic IF/THEN rules, verified recipes, and orthogonal 3-family judge Krippendorff alphas spanning **Wave 4** — *System vs. User Persona Precedence*, *Cross-Model Prompt Portability (5 Lineages)*, *Distress Warmth vs. Truth Trade-Off*, and *Multi-Agent Peer Conformity* — **Wave 3** — *Historical Evolution 2023–2026 (32 checkpoints)*, *The AI Big One 63.6% Factor Collapse & MTMM Audit (10,000 sheets)*, *Crystalline vs. Fluid AI Minds (27.7× Persona Entropy)*, and *Reasoning–Personality Phase Transition (216 cells, 138 CoTs)* — plus **Waves 1–2** — *Instruction Budget Cliff*, *AI Slop Fingerprint*, *Agent Autonomy & Reasoning Shift*, *Prompt Syntax Wars*, *Sycophancy vs. False Contrarianism*, *Persona Half-Life & Context Drift*, and *The AI Roleplay Tax (85/15)*)
- **Research & Hub Markdown Mirrors:** `https://agent-tune.com/research.md`, `https://agent-tune.com/models/index.md`, `https://agent-tune.com/guides/index.md`, `https://agent-tune.com/library/index.md`, `https://agent-tune.com/tests/index.md`, `https://agent-tune.com/tools/index.md` (or fetch any page as `https://agent-tune.com/research/{slug}.md`, `https://agent-tune.com/guides/{slug}.md`, `https://agent-tune.com/models/{slug}.md`, and `https://agent-tune.com/tools/{slug}.md`)
- **25-Family Personality Atlas Index & CSVs:** `https://agent-tune.com/research/data/model-profiles/index.json` + per-survey CSVs (`atlas-overview.csv`, `atlas-mbti.csv`, `atlas-enneagram.csv`, `atlas-big-five.csv`, `atlas-disc.csv`, `atlas-attachment.csv`, `atlas-hexaco.csv`) under `/research/data/model-profiles/`
- **Template catalog (JSON):** `https://agent-tune.com/library/index.json`
- **Body-only Markdown for any template:** `https://agent-tune.com/resources/tunings/{system}/{slug}.md`
  - Examples: `/resources/tunings/mbti/intj.md`, `/resources/tunings/disc/d-dominance.md`, `/resources/tunings/enneagram/5-investigator.md`, `/resources/tunings/attachment/secure.md`, `/resources/tunings/ocean/conscientiousness-high.md`
- **Platform destination registry (`v2026-09-25.1`):** `https://agent-tune.com/resources/platforms.json`
- **Local JS scorer:** `https://agent-tune.com/resources/scoring/score.js` + `https://agent-tune.com/resources/scoring/questions.json`
  - Exact `instrumentId` values:
    - MBTI (32 items, OEJTS): `agenttune-mbti-legacy` (`1.0.0`)
    - Enneagram (36 items, OEPS): `agenttune-enneagram-legacy` (`1.0.0`)
    - DISC (16 items, ODAT): `agenttune-disc-legacy` (`1.0.0`)
    - Attachment (36 items, ECR-R, 1–7 scale): `agenttune-attachment-legacy` (`1.0.0`)
    - Big Five / OCEAN (50 items, IPIP-50): `agenttune-ipip50` (`1.0.0`)

## 3. Safe Installation Rules for Agents

1. **Reading is not permission to install.** Fetching a file does not authorize editing `~/.claude/CLAUDE.md`, `~/.codex/AGENTS.md`, `.cursor/rules/*.mdc`, `GEMINI.md`, or `Soul.md`. Show the user the exact text and target path first, and wait for approval.
2. **Use bounded markers in shared files.** Wrap added communication rules inside:
   ```markdown
   <!-- agenttune:preferences:start -->
   ...
   <!-- agenttune:preferences:end -->
   ```
   When updating or removing rules later, change **only** the block between those markers. Keep every surrounding build, test, and project rule untouched. If markers are missing or duplicated, stop and ask the user.
3. **Keep honesty and permission boundaries intact.** Never add rules that hide uncertainty, invent citations, or expand tool permissions. Treat personality templates as editable communication preferences, not diagnoses.
4. **Test on real tasks, not greetings.** After saving, re-read the file to confirm the text is stored, then test on 2–3 real tasks (a factual question, a planning trade-off, and a critique prompt).
