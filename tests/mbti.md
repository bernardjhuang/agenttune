# MBTI-style — AgentTune OEJTS adaptation

Instrument: `agenttune-mbti-legacy@1.0.0`. Scorer: `1.0.0`. Definition SHA-256: `f6a4a50959c1a27c15274360f14b54b16c848408de96b6964b286262e65aed07`.

Choose the response that best describes you. Answer every item; scores describe this adaptation and are not a diagnosis. Review any suggested communication preferences before using them.

## Response scale
1. Strongly first statement
2. Lean first statement
3. Neutral
4. Lean second statement
5. Strongly second statement

## Items

| ID | First statement | Second statement | Axis | First pole | Second pole |
|---|---|---|---|---|---|
| mbti-01 | I make lists | I just put stuff wherever | JP | J | P |
| mbti-02 | I am skeptical | I want to believe | TF | T | F |
| mbti-03 | I get bored when I'm alone | I need time alone | EI | E | I |
| mbti-04 | I accept things as they are | I'm unsatisfied with the way things are | SN | S | N |
| mbti-05 | I keep my room clean | I just put stuff wherever | JP | J | P |
| mbti-06 | I think "robotic" is an insult | I strive to have a mechanical mind | TF | F | T |
| mbti-07 | I'm energetic | I'm mellow | EI | E | I |
| mbti-08 | I prefer multiple choice tests | I prefer essay answers | SN | S | N |
| mbti-09 | I'm chaotic | I'm organized | JP | P | J |
| mbti-10 | I'm easily hurt | I'm thick-skinned | TF | F | T |
| mbti-11 | I work best in groups | I work best alone | EI | E | I |
| mbti-12 | I focus on the present | I focus on the future | SN | S | N |
| mbti-13 | I plan far ahead | I plan at the last minute | JP | J | P |
| mbti-14 | I want people's respect | I want their love | TF | T | F |
| mbti-15 | Parties wear me out | Parties fire me up | EI | I | E |
| mbti-16 | I try to fit in | I try to stand out | SN | S | N |
| mbti-17 | I keep my options open | I commit | JP | P | J |
| mbti-18 | I want to be good at fixing things | I want to be good at fixing people | TF | T | F |
| mbti-19 | I talk more than I listen | I listen more than I talk | EI | E | I |
| mbti-20 | When describing an event, I tell what happened | I tell what it meant | SN | S | N |
| mbti-21 | I get work done right away | I procrastinate | JP | J | P |
| mbti-22 | I follow my heart | I follow my head | TF | F | T |
| mbti-23 | I stay at home | I go out on the town | EI | I | E |
| mbti-24 | I want the big picture | I want the details | SN | N | S |
| mbti-25 | I improvise | I prepare | JP | P | J |
| mbti-26 | I base morality on justice | I base morality on compassion | TF | T | F |
| mbti-27 | It's hard for me to yell loudly | Yelling comes naturally to me | EI | I | E |
| mbti-28 | I'm theoretical | I'm empirical | SN | N | S |
| mbti-29 | I work hard | I play hard | JP | J | P |
| mbti-30 | I'm uncomfortable with emotions | I value emotions | TF | T | F |
| mbti-31 | I like to perform in front of people | I avoid public speaking | EI | E | I |
| mbti-32 | I like to know "who, what, when" | I like to know "why" | SN | S | N |

## Scoring
Require all 32 valid integer responses. Missing records return incomplete; duplicate IDs, unknown IDs and invalid values are rejected. No imputation. Subtract 3 from each response. Award the absolute difference to the first pole for values below 3, or the second pole for values above 3. Neutral responses add zero. Compare each axis. Equal totals remain X/unresolved, with no forced type. An explicit follow-up preference may resolve a tied axis for choosing a template, but does not change measured scores.

Scores do not authorize installation or override explicit communication preferences. Review suggested templates before using them.

## Source, terms and adaptations
[Source](https://openpsychometrics.org/tests/OJTS/development/OEJTS1.2.pdf). Instrument content is subject to separate publisher terms; see [third-party notices](https://agent-tune.com/resources/content/THIRD_PARTY_NOTICES.md). Operational availability does not grant unrestricted redistribution rights.

- Preserves the previous AgentTune website wording, display order, keys and response anchors. This is a versioned AgentTune adaptation, not an unmodified publisher edition.
- Item 1 retains the historical substituted second pole. Tied axes remain unresolved unless the user explicitly supplies a preference; preferences are not scored evidence.
