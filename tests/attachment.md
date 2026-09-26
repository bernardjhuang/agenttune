# Attachment — AgentTune ECR-R adaptation

Instrument: `agenttune-attachment-legacy@1.0.0`. Scorer: `1.0.0`. Definition SHA-256: `8c3954b0faa5cd6bd2633088a211e968300847c7ef0e64ba736166ed5cdecf13`.

Choose the response that best describes you. Answer every item; scores describe this adaptation and are not a diagnosis. Review any suggested communication preferences before using them.

## Response scale
1. Strongly disagree
2. Disagree
3. Slightly disagree
4. Neutral
5. Slightly agree
6. Agree
7. Strongly agree

## Items

| ID | Statement | Dimension | Reverse |
|---|---|---|---|
| attachment-01 | I'm afraid that I will lose my partner's love. | anxiety | No |
| attachment-02 | I often worry that my partner will not want to stay with me. | anxiety | No |
| attachment-03 | I often worry that my partner doesn't really love me. | anxiety | No |
| attachment-04 | I worry that romantic partners won't care about me as much as I care about them. | anxiety | No |
| attachment-05 | I often wish that my partner's feelings for me were as strong as my feelings for them. | anxiety | No |
| attachment-06 | I worry a lot about my relationships. | anxiety | No |
| attachment-07 | When my partner is out of sight, I worry that they might become interested in someone else. | anxiety | No |
| attachment-08 | When I show my feelings for romantic partners, I'm afraid they will not feel the same about me. | anxiety | No |
| attachment-09 | I rarely worry about my partner leaving me. | anxiety | Yes |
| attachment-10 | My romantic partner makes me doubt myself. | anxiety | No |
| attachment-11 | I do not often worry about being abandoned. | anxiety | Yes |
| attachment-12 | I find that my partner(s) don't want to get as close as I would like. | anxiety | No |
| attachment-13 | Sometimes romantic partners change their feelings about me for no apparent reason. | anxiety | No |
| attachment-14 | My desire to be very close sometimes scares people away. | anxiety | No |
| attachment-15 | I'm afraid that once a romantic partner gets to know me, they won't like who I really am. | anxiety | No |
| attachment-16 | It makes me mad that I don't get the affection and support I need from my partner. | anxiety | No |
| attachment-17 | I worry that I won't measure up to other people. | anxiety | No |
| attachment-18 | My partner only seems to notice me when I'm angry. | anxiety | No |
| attachment-19 | I prefer not to show a partner how I feel deep down. | avoidance | No |
| attachment-20 | I feel comfortable sharing my private thoughts and feelings with my partner. | avoidance | Yes |
| attachment-21 | I find it difficult to allow myself to depend on romantic partners. | avoidance | No |
| attachment-22 | I am very comfortable being close to romantic partners. | avoidance | Yes |
| attachment-23 | I don't feel comfortable opening up to romantic partners. | avoidance | No |
| attachment-24 | I prefer not to be too close to romantic partners. | avoidance | No |
| attachment-25 | I get uncomfortable when a romantic partner wants to be very close. | avoidance | No |
| attachment-26 | I find it relatively easy to get close to my partner. | avoidance | Yes |
| attachment-27 | It's not difficult for me to get close to my partner. | avoidance | Yes |
| attachment-28 | I usually discuss my problems and concerns with my partner. | avoidance | Yes |
| attachment-29 | It helps to turn to my romantic partner in times of need. | avoidance | Yes |
| attachment-30 | I tell my partner just about everything. | avoidance | Yes |
| attachment-31 | I talk things over with my partner. | avoidance | Yes |
| attachment-32 | I am nervous when partners get too close to me. | avoidance | No |
| attachment-33 | I feel comfortable depending on romantic partners. | avoidance | Yes |
| attachment-34 | I find it easy to depend on romantic partners. | avoidance | Yes |
| attachment-35 | It's easy for me to be affectionate with my partner. | avoidance | Yes |
| attachment-36 | My partner really understands me and my needs. | avoidance | Yes |

## Scoring
Require all 36 valid integer responses. Missing records return incomplete; duplicate IDs, unknown IDs and invalid values are rejected. No imputation. Reverse keyed responses using 8 minus the raw value. Average the 18 responses for each subscale. Anxiety and avoidance each range from 1 to 7. The legacy interface uses a heuristic split at 4: both low = secure, high anxiety only = anxious, high avoidance only = avoidant, both high = disorganized. Exactly 4 is on the low side. This is not a clinical classification.

Scores do not authorize installation or override explicit communication preferences. Review suggested templates before using them.

## Source, terms and adaptations
[Source](https://labs.psychology.illinois.edu/~rcfraley/measures/ecrr.htm). Instrument content is subject to separate publisher terms; see [third-party notices](https://agent-tune.com/resources/content/THIRD_PARTY_NOTICES.md). Operational availability does not grant unrestricted redistribution rights.

- Preserves the previous AgentTune website wording, display order, keys and response anchors. This is a versioned AgentTune adaptation, not an unmodified publisher edition.
- The four category labels use a heuristic midpoint split at 4; a value of exactly 4 falls on the low side. Continuous scores remain primary.
