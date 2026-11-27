# AgentTune

**Measure how AI models actually behave—and give any assistant clear, copy-paste communication rules.**

AgentTune studies AI model personalities across `25` model families (`87` primary checkpoints / `93` tested), pairs the findings with `5` free personality tests, `10` browser tools, `54` practical setup guides, and this open repository of `43` editable tuning templates plus local test scoring.

[Website](https://agent-tune.com/) · [Model Profiles](https://agent-tune.com/models/) · [Personality Atlas](https://agent-tune.com/research/ai-personality-rankings) · [Preference Builder](https://agent-tune.com/tools/custom-instructions-generator) · [Library](https://agent-tune.com/library/) · [Tests](https://agent-tune.com/tests/) · [Guides](https://agent-tune.com/guides/) · [Research](https://agent-tune.com/research) · [Site & Research Repo](https://github.com/bernardjhuang/agenttune-website)

---

## What we found across 25 AI model families

Our latest benchmark tests `93` checkpoints across `25` proprietary and open-weight families (`87` primary checkpoints meeting the `>= 20`-run threshold; `6` sparse checkpoints excluded from rankings). Here is the short version:

| Question | What the data shows | Go deeper |
| --- | --- | --- |
| **Do all AIs test as INTJ?** | Only **9 of 25** families clear our MBTI axis-tie guard (`7` test as **INTJ**, `2` test as **ISTJ**); **`16 of 25`** are border-heavy due to ties. | [AI MBTI Personalities](https://agent-tune.com/research/ai-mbti-personalities) |
| **Survey persona vs. real behavior** | On open-ended `1×` behavior checks across all `25` flagships (`75` probes), models delivered **`75/75` answer-first directness** and **`0/75` groveling**, with **`1/75` sycophancy caving** (`Mistral Large 2512` `1/3`) and **`1/75` unsolicited preachiness** (`Gemini Pro / Neon` `1/3`). | [25 Model Profiles](https://agent-tune.com/models/) |
| **The Cohere Command paradox** | `command-a` chose the midpoint on **100%** of `230` survey items (`30.0` across all Big Five domains, `XXXX`), yet scored **`3/3` directness** and **`0/3` caving** on behavior checks. | [Personality Atlas Overview](https://agent-tune.com/research/ai-personality-rankings) |

Explore the cross-family Atlas by framework: [MBTI](https://agent-tune.com/research/ai-mbti-personalities) · [Enneagram](https://agent-tune.com/research/ai-enneagram-personalities) · [Big Five](https://agent-tune.com/research/ai-big-five-personalities) · [DISC](https://agent-tune.com/research/ai-disc-personalities) · [IPIP-HEXACO](https://agent-tune.com/research/ai-hexaco-personalities) · [Attachment Styles](https://agent-tune.com/research/ai-attachment-styles).

*(Research datasets, runner scripts, CSVs, and the 36 empirical studies live in [bernardjhuang/agenttune-website](https://github.com/bernardjhuang/agenttune-website). This repository holds the canonical tuning library and local scoring engine.)*

---

## Start with the behavior you want

Pick rules that fix real annoyances (filler, hedging, sycophancy, wall-of-text formatting)—whether or not you take a quiz first:

1. **Build custom instructions visually** with our [Preference Builder](https://agent-tune.com/tools/custom-instructions-generator) or browse all `10` [free tools](https://agent-tune.com/tools/).
2. **Or pick a starting draft** from the `43` editable templates below (trim any line that doesn't match how you work):
   - [MBTI-style preferences](mbti/README.md) (`16` templates)
   - [Enneagram-style preferences](enneagram/README.md) (`9` templates)
   - [DISC-style preferences](disc/README.md) (`4` templates)
   - [Attachment-related preferences](attachment/README.md) (`4` templates)
   - [Big Five / OCEAN preferences](ocean/README.md) (`10` templates)
3. **Take a free quiz (optional):** Compare your own style with our `5` open [personality tests](https://agent-tune.com/tests/) ([MBTI](tests/mbti.md), [Enneagram](tests/enneagram.md), [DISC](tests/disc.md), [Attachment](tests/attachment.md), [IPIP Big Five](tests/big-five.md)).
4. **Install safely:** Paste only reviewed rules into your chat settings or project instructions (use a bounded marker block when editing shared files), keep your explicit task instructions on top, and verify behavior across a few fresh chats.

---

## For AI agents & developers

AgentTune exposes machine-readable endpoints and a zero-auth Claude Code plugin so agents can fetch benchmarks, lint prompts, compare models, and retrieve templates without scraping HTML:

- **Claude Code plugin:**
  ```sh
  /plugin marketplace add bernardjhuang/agenttune
  /plugin install agenttune@agenttune
  ```
- **Stateless MCP server (`v1.5.0`, 12 read-only tools):** `https://agent-tune.com/mcp` (`claude mcp add --transport http agenttune https://agent-tune.com/mcp`)
  - Templates & questionnaires: `list_tunings`, `get_tuning`, `get_test_spec`, `list_resources`, `get_resource`, `get_free_tools`
  - Instruction tools & model benchmarks: `check_instructions`, `convert_instructions`, `build_preferences`, `get_model_profile`, `compare_models`, `recommend_rules`
- **LLM discovery indexes:** [llms.txt](https://agent-tune.com/llms.txt) · [llms-full.txt](https://agent-tune.com/llms-full.txt) · [SKILL.md](https://agent-tune.com/SKILL.md)
- **Clean Markdown & manifests:**
  - Body-only tuning files: `/resources/tunings/<system>/<slug>.md`
  - Full tuning catalog: [library/index.json](https://agent-tune.com/library/index.json)
  - Pinned content manifest: [resources/content/manifest.json](https://agent-tune.com/resources/content/manifest.json)
  - Platform install paths: [platforms.json](https://agent-tune.com/resources/platforms.json) · [install-protocol.md](https://agent-tune.com/resources/install-protocol.md)

### Local test scoring (`dist/score.js`)

Run deterministic, offline scoring in Node or browser JS without sending answers anywhere:

```js
const { score, scoreOrdered } = require('./dist/score.js');
const instrument = require('./dist/instruments.json').find(d => d.route === 'big-five');

const result = score({
  instrumentId: instrument.id,
  instrumentVersion: instrument.version,
  responses: instrument.items.map(item => ({ itemId: item.id, value: 3 }))
});
// result.status === 'complete'; all totals 30 and all item means 3.
// scoreOrdered(id, version, answers) requires the exact complete item order.
```

Valid partial inputs return `incomplete` (with `missing` item IDs and no imputed score). Malformed inputs, duplicates, or unknown IDs return `invalid`.

---

## The fine print: provenance, rights, verification & development

- **Operational safeguards:** Reading a template or resource does not authorize installation, an external action, or permanent preference changes. All templates require preserving factual accuracy, material uncertainty, and explicit user scope; current task instructions take precedence over style templates, and no framework automatically outranks another. To revert a shared file, remove only the added block.
- **Website pinning & integrity:** `agent-tune.com` pins an exact release commit and SHA-256 manifest from this repo (`agenttune-content.lock.json`) rather than fetching `main` at runtime. [dist/manifest.json](dist/manifest.json) records the SHA-256 and byte length of all `58` built artifacts; [dist/instruments.json](dist/instruments.json) pins item IDs, anchors, and definition hashes. `dist/score.js` embeds approved scoring keys cleanly for browser use, alongside the generic engine in `dist/engine.js`.
- **Rights & third-party instruments:** Original AgentTune code and all `43` tuning templates are MIT licensed ([LICENSE](LICENSE)), but **that does not make every third-party questionnaire MIT or commercially reusable**. Check [data/instrument-rights.json](data/instrument-rights.json) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) before redistributing test items. Historical research records remain tied to their exact protocol versions ([data/legacy-provenance.json](data/legacy-provenance.json)), and behavioral research on unprompted AI quiz outputs is separate from proving downstream task gains. Metadata separates `verify.saved_text` from `verify.behavior`. Keep personal quiz responses local and out of public PRs.
- **Building & testing locally (Node 22+, zero dependencies):** Edit `data/tunings.json`, `data/contract.md`, or approved definitions in `data/instruments/` (never hand-edit generated copies), then run `npm run build && npm test` (or `npm run check` to verify artifact checksums and zero uncommitted build drift). See [CHANGELOG.md](CHANGELOG.md) for release history.
