# AgentTune

Editable communication preferences for AI assistants. Browse 43 templates, choose the rules that fit, and review them before adding them to your instructions. A personality label is optional; templates are editorial suggestions, not diagnoses or proven performance improvements.

[Website](https://agent-tune.com/) · [Preference builder](https://agent-tune.com/tools/custom-instructions-generator) · [Library](https://agent-tune.com/library) · [Research](https://agent-tune.com/research)

## Start with the behavior you want

1. Describe your preferred level of detail, tone, structure and pushback in the preference builder, or browse a template below.
2. Read and edit the actual rules. Your current request and explicit preferences take precedence. No questionnaire framework automatically outranks another.
3. Add only the reviewed text to the intended conversation, account settings or project instructions. Preserve existing content; use a clearly marked block when editing a shared file.
4. Reopen the destination to verify storage. Compare several new tasks to assess behavior; saved text alone does not prove that a model will follow it.
5. To undo, remove only the added block. Do not delete an existing shared instruction file.

Reading a resource does not authorize installation, an external action or a lasting change to preferences. Templates must preserve accuracy, material uncertainty and authorized scope.

## Browse templates

- [MBTI-style preferences](mbti/README.md): 16 templates
- [Enneagram-style preferences](enneagram/README.md): 9 templates
- [DISC-style preferences](disc/README.md): 4 templates
- [Attachment-related preferences](attachment/README.md): 4 templates
- [OCEAN preferences](ocean/README.md): 10 templates

Combine only rules you want. When two rules conflict, choose explicitly rather than treating a score or framework as an instruction priority. The framework labels are navigation aids, not claims about every person who uses a label.

## Optional questionnaires

The current core release includes a [50-item IPIP Big Five adaptation](tests/big-five.md). It returns raw dimension totals and item means. It does not return population percentiles or select instructions automatically. Review the [availability and rights record](data/instrument-rights.json) for other instruments. Their explanatory pages and communication templates remain available; their questionnaires are excluded until the intended reuse is covered by verified terms.

See [third-party notices](THIRD_PARTY_NOTICES.md) before reusing instrument material. Original AgentTune code and preference templates are MIT licensed; that does not make every third-party instrument MIT or commercially reusable.

## Versioned content and local scoring

This repository owns the canonical content. The website consumes a pinned release, not a runtime fetch from `main`. [dist/manifest.json](dist/manifest.json) gives the release version and SHA-256 of every exported artifact. [dist/instruments.json](dist/instruments.json) identifies the available definitions, item IDs, response anchors and definition hashes. Every scoring result identifies its instrument and scorer version.

```js
const { score, scoreOrdered } = require('./dist/score.js');
const instrument = require('./dist/instruments.json')[0];
const result = score({
  instrumentId: instrument.id,
  instrumentVersion: instrument.version,
  responses: instrument.items.map(item => ({ itemId: item.id, value: 3 }))
});
// result.status === 'complete'; all totals 30 and all item means 3.
// scoreOrdered(id, version, answers) requires the exact complete item order.
```

Valid partial responses return `incomplete`, with missing item IDs and no final score. Duplicate/unknown IDs, noninteger/out-of-range values and malformed responses return `invalid`. Missing answers are never silently imputed. Raw scores are separate from a user's subsequent choice of communication preferences. Keep personal responses local and out of public pull requests.

Browser: load `dist/score.js` to use `AgentTuneScoring`. It contains scoring keys for the approved instrument without embedding question wording. The original generic engine is also available separately as `dist/engine.js`; users are responsible for rights to any definitions they register.

## Agent access

The site exposes body-only Markdown at `/resources/tunings/<system>/<slug>.md`, metadata-rich mirrors via the [tuning catalog](https://agent-tune.com/library/index.json), and a [versioned content manifest](https://agent-tune.com/resources/content/manifest.json). Apply only the body; metadata is for discovery and verification.

The stateless MCP endpoint is `https://agent-tune.com/mcp`. Its tools are `list_tunings`, `get_tuning`, `get_test_spec`, `list_resources`, `get_resource` and `get_free_tools`. Questionnaire availability is explicit; an unavailable specification must not be treated as an instruction to administer an old questionnaire. MCP retrieves public resources and does not need your questionnaire answers.

Use the [installation protocol](https://agent-tune.com/resources/install-protocol.md) and [platform registry](https://agent-tune.com/resources/platforms.json) for current destinations. Metadata separates `verify.saved_text` from `verify.behavior`; there is no universal compliance probe.

## Development and research provenance

Run `npm run build` and `npm test` with Node 22 or later. No dependency installation is needed. Edit `data/tunings.json`, `data/contract.md` and approved definitions in `data/instruments/`; do not edit generated copies. `npm run check` also detects stale generated artifacts. License eligibility, instrument IDs, fixture scores and export parity are release gates.

See the [changelog](CHANGELOG.md) and [legacy provenance](data/legacy-provenance.json). Historical questionnaires contained adaptations and undocumented substitutions. Their responses must remain attached to their actual versions. Correcting future instruments does not retroactively correct previous observations. Research about model questionnaire responses is distinct from evidence that a tuning improves task performance.

## License

[MIT](LICENSE) for original AgentTune work, with the [third-party exceptions and availability policy](THIRD_PARTY_NOTICES.md). Review the per-instrument terms and provenance before redistribution.
