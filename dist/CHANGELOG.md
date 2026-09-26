# Changelog

## 1.1.0 — 2026-09-26

Restores MBTI-style, Enneagram, DISC and attachment questionnaire adaptations and full specifications at the site owner’s request. Their original website items, ordering and anchors are pinned as legacy edition 1.0.0. Source terms and unresolved reuse questions remain recorded separately from operational availability. Big Five, preference safeguards, strict input validation and checksum verification are retained.

## 1.0.0 — 2026-09-26

First versioned content release. Rewrites all 43 templates as optional communication preferences with shared accuracy and scope rules. Adds instrument-specific rights metadata, deterministic exports, checksums and a strict local scoring API. Only the rights-reviewed IPIP adaptation is available for current administration; other questionnaire routes explain their status.

Big Five now returns raw totals and means, with no unsupported percentiles or automatic tuning overrides. Existing questionnaire adaptations and research snapshots are identified in `data/legacy-provenance.json`. MBTI item 1 and Enneagram items 15/32 had undocumented substitutions; those editions are withdrawn from current administration, not silently corrected or relabeled. OEPS also changed item order and response anchors between distributions.

Migration: use an exact instrument ID/version and `{itemId,value}` response records. Empty/partial valid records return `incomplete`; invalid values/IDs return `invalid`; complete responses return scores. Positional input requires the exact documented order. Current explicit preferences take precedence over template suggestions. Reading a template is not permission to install it.
