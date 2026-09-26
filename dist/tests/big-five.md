# Big Five — IPIP 50-item adaptation

Instrument: `agenttune-ipip50@1.0.0`. Scorer: `1.0.0`. Definition SHA-256: `d310c892c4a4fc6d2bb3b1b443bce43d697b808e92f6d26ecdce1139b8ebb352`.

Describe your typical behavior. Complete all 50 items. These are questionnaire scores, not population percentiles or a diagnosis.

## Response scale
1. Very inaccurate
2. Moderately inaccurate
3. Neither accurate nor inaccurate
4. Moderately accurate
5. Very accurate

## Items

| ID | Statement | Dimension | Reverse |
|---|---|---|---|
| ipip50-01 | Am the life of the party. | E | No |
| ipip50-02 | Feel little concern for others. | A | Yes |
| ipip50-03 | Am always prepared. | C | No |
| ipip50-04 | Get stressed out easily. | N | No |
| ipip50-05 | Have a rich vocabulary. | O | No |
| ipip50-06 | Don't talk a lot. | E | Yes |
| ipip50-07 | Am interested in people. | A | No |
| ipip50-08 | Leave my belongings around. | C | Yes |
| ipip50-09 | Am relaxed most of the time. | N | Yes |
| ipip50-10 | Have difficulty understanding abstract ideas. | O | Yes |
| ipip50-11 | Feel comfortable around people. | E | No |
| ipip50-12 | Insult people. | A | Yes |
| ipip50-13 | Pay attention to details. | C | No |
| ipip50-14 | Worry about things. | N | No |
| ipip50-15 | Have a vivid imagination. | O | No |
| ipip50-16 | Keep in the background. | E | Yes |
| ipip50-17 | Sympathize with others' feelings. | A | No |
| ipip50-18 | Make a mess of things. | C | Yes |
| ipip50-19 | Seldom feel blue. | N | Yes |
| ipip50-20 | Am not interested in abstract ideas. | O | Yes |
| ipip50-21 | Start conversations. | E | No |
| ipip50-22 | Am not interested in other people's problems. | A | Yes |
| ipip50-23 | Get chores done right away. | C | No |
| ipip50-24 | Am easily disturbed. | N | No |
| ipip50-25 | Have excellent ideas. | O | No |
| ipip50-26 | Have little to say. | E | Yes |
| ipip50-27 | Have a soft heart. | A | No |
| ipip50-28 | Often forget to put things back in their proper place. | C | Yes |
| ipip50-29 | Get upset easily. | N | No |
| ipip50-30 | Do not have a good imagination. | O | Yes |
| ipip50-31 | Talk to a lot of different people at parties. | E | No |
| ipip50-32 | Am not really interested in others. | A | Yes |
| ipip50-33 | Like order. | C | No |
| ipip50-34 | Change my mood a lot. | N | No |
| ipip50-35 | Am quick to understand things. | O | No |
| ipip50-36 | Don't like to draw attention to myself. | E | Yes |
| ipip50-37 | Take time out for others. | A | No |
| ipip50-38 | Shirk my duties. | C | Yes |
| ipip50-39 | Have frequent mood swings. | N | No |
| ipip50-40 | Use difficult words. | O | No |
| ipip50-41 | Don't mind being the center of attention. | E | No |
| ipip50-42 | Feel others' emotions. | A | No |
| ipip50-43 | Follow a schedule. | C | No |
| ipip50-44 | Get irritated easily. | N | No |
| ipip50-45 | Spend time reflecting on things. | O | No |
| ipip50-46 | Am quiet around strangers. | E | Yes |
| ipip50-47 | Make people feel at ease. | A | No |
| ipip50-48 | Am exacting in my work. | C | No |
| ipip50-49 | Often feel blue. | N | No |
| ipip50-50 | Am full of ideas. | O | No |

## Scoring
Require all 50 valid integer responses. Missing records return incomplete; duplicate IDs, unknown IDs and invalid values are rejected. No imputation. Reverse keyed responses using 6 minus the raw value. Sum each dimension’s ten scored responses (10–50) and divide by ten for its mean (1–5). These are raw scores, not population percentiles. No instruction is selected automatically.

Scores do not authorize installation or override explicit communication preferences. Review suggested templates before using them.

## Source, terms and adaptations
[Source](https://ipip.ori.org/newBigFive5broadKey.htm). Instrument content is subject to separate publisher terms; see [third-party notices](https://agent-tune.com/resources/content/THIRD_PARTY_NOTICES.md). Operational availability does not grant unrestricted redistribution rights.

- Neuroticism is scored in the opposite orientation to the upstream Emotional Stability factor.
- O is displayed as Openness; the upstream factor is Intellect/Imagination.
- Items are interleaved in the documented AgentTune display order.
- First-person prefix is supplied by the questionnaire UI.
