# Ho3Fax — Product Requirements Document (PRD)
Version: 1.0
Status: Initial requirements based on Edward and Muneeb's conversation dated October 13–15, 2026.
Purpose: Put this file in the project root and instruct Cursor to use it as the source of truth for implementation requirements. UI screenshots will be supplied separately by the product owner.

---

## 1. Product overview

**Working product name:** Ho3Fax (domain discussed: `ho3fax.com`; availability/ownership must be confirmed before launch).

**Product type:** A playful novelty calculator / dating-themed entertainment experience. The concept described by the client calculates a fictional estimate using a simple formula and displays a visual “risk meter.”

**Client's stated positioning:** Keep the product playful, visually appealing, catchy, and easy to understand. The client described it as “almost just a widget” and “a fancy, rigged calculator.”

**Important truthfulness requirement:** The result is a fictional entertainment score, not a verified measurement of a real person's sexual history, behavior, fidelity, or risk. Do not present the calculation as scientifically validated or as factual information about a person. Use a visible “For entertainment purposes only” disclaimer.

**Design reference:** The product owner will attach UI screenshots separately. Do not invent a final visual design before those references are provided. Once attached, follow them closely while preserving accessibility and functional behavior.

## 2. Goals

1. Build a simple, polished, playful experience around a calculator and risk meter.
2. Use the client's proposed formula and variation rules, with unresolved details clearly isolated as configurable values rather than silently guessed.
3. Keep results consistent for the same input during a single browser/app session.
4. Reset session-only results after the session ends.
5. Prepare the experience for a proposed $0.99-per-search business model, but do not integrate a real payment provider until the owner confirms the platform, provider, and payment flow.
6. Make the app responsive, accessible, performant, and easy to maintain.

## 3. Out of scope unless separately approved

- Missing-money finder app.
- The future app for women.
- Your Ego Amigo character/animation project.
- Real-world background checks or claims about actual people.
- A permanent database of search histories.
- Advertising integration (client was skeptical of interruptive ads).
- Subscription plans (client said he did not want subscriptions for this concept).
- A production payment integration before payment requirements are confirmed.
- Any external dataset about names or infidelity before the owner supplies a credible source and approves a safe, lawful use.

## 4. Inputs and main interaction

The client explicitly mentioned these input fields:
- Name
- City
- State
- Age

The exact field layout, required/optional status, validation messages, button labels, and responsive placement must follow the UI screenshots when provided. Until then, implement a clean, accessible form without pretending that unspecified UI details are finalized.

### Input validation
- Trim leading/trailing whitespace.
- Name, city, and state should be validated according to the final UI requirements.
- Age must be a valid numeric age within a configured range.
- The client discussed starting-age values of 16, with possible variations of 14 or 13. The exact selection rule is unresolved. Do not silently randomize or select an age; keep it configurable and ask for confirmation.
- Do not collect extra personally identifying information beyond the approved fields.
- Do not use these inputs to identify, profile, or make factual claims about a real individual.

## 5. Proposed calculation

The client gave the formula:

`estimate = weeks × 3 × 11 × 100`

The client explained:
- `weeks` = number of weeks between the assumed starting age and the entered age.
- `3` = assumed three times per week.
- `11` = client's assumed 5.5 inches doubled to represent an in-and-out movement.
- `100` = assumed 100 strokes per encounter.

The client said to use **weeks, not years**. Example supplied by the client: age 39 starting at age 16 gives 1,198 weeks. The formula then produces:

`1198 × 3 × 11 × 100 = 39,534,000`

This is a client-proposed fictional calculation and must not be described as a validated biological or behavioral measure.

### Calculation implementation notes
- Put the calculation in a small, pure, unit-testable function.
- Keep constants named and documented (`TIMES_PER_WEEK = 3`, `MOVEMENT_FACTOR = 11`, `STROKES_PER_ENCOUNTER = 100`).
- Calculate elapsed weeks using a clearly documented convention. The example uses 1,198 weeks for 23 years; confirm the exact age-to-weeks rule before release because calendar years, leap years, and rounding can affect the result.
- Avoid hidden magic numbers.
- Handle invalid inputs safely.
- Display large numbers in a readable, locale-aware format.
- Do not imply that the output reflects real events or a real person’s history.

## 6. Result variation

The client wants variation so that users of the same age do not always see the same result. He proposed:
- Upward adjustments such as +10%, +15%, continuing up to +25%.
- Corresponding downward adjustments.
- Variation that makes the calculator feel less repetitive.

### Required session behavior
- Within one active session, the same normalized name must return exactly the same result.
- Example: search “Sarah”, search “Jessica”, then search “Sarah” again. The second Sarah search must return the first Sarah result for that session.
- A different name can receive a different result.
- When the browser/app session ends, the session results reset.
- Do not store search results in a permanent server database.
- Do not send the search history to analytics or third parties unless separately disclosed, approved, and legally reviewed.

### Implementation approach
- Use an in-memory session map keyed by a normalized input identity. At minimum, the key should include the normalized name; decide whether city/state/age should be part of the key only after confirming the intended behavior.
- Generate a variation once per key and cache it for the session.
- Use a deterministic session cache so repeated searches for the same key return the exact same result.
- Do not persist the cache in localStorage, cookies, IndexedDB, a database, or other durable storage if strict reset-on-session-end behavior is required.
- A browser refresh normally preserves the browser session but may clear in-memory state. Confirm whether “session” means until tab closes, until browser closes, or until the app process exits. Do not silently claim stronger behavior than the chosen implementation provides.
- Keep variation logic separate from the base formula and cover it with unit tests.

### Variation specification is not final
The conversation does not define the exact probability distribution, selection sequence, whether the base result is included, whether variations are integer percentages, or whether the percentage applies to the total estimate. Implement a configurable variation module with documented defaults only after the product owner approves them. Do not invent a hidden rule and call it client-approved.

## 7. Risk meter

The client specifically likes a “risk meter” and suggested:
- A scale that moves from left to right.
- Green visual state for the low end.
- Red visual state for the high end.
- A siren sound if the meter enters red.
- Wedding-bell sounds if the meter stays green.

### Requirements
- The UI reference screenshot will determine the visual style, size, labels, and placement.
- The score-to-meter mapping and green/yellow/red thresholds are not specified. Keep thresholds configurable and request confirmation.
- Do not label a real person as likely to cheat or otherwise infer real-world behavior from their name or age.
- Label the meter as a fictional entertainment result. Prefer labels such as “novelty score” or similarly clear language if the UI can accommodate them.
- Respect reduced-motion preferences where supported.
- Provide a way to mute sound and never autoplay sound before a user gesture.
- Sound must not be the only way to communicate the state; color should be supplemented by text/labels.

## 8. Audio and animation

The client proposed the following experience:
1. Play suspense music while the calculator is “calculating.”
2. Increase sound as the risk scale moves from left to right.
3. Play a siren when the meter goes into the red zone.
4. Play a wedding-bell tune if the meter stays in green.

### Implementation notes
- Keep audio assets local where practical and appropriately licensed.
- Add a mute/unmute control.
- Keep volumes comfortable and avoid sudden excessive loudness.
- Start playback only after an explicit user action because browsers restrict autoplay.
- Stop suspense audio when calculation finishes.
- Avoid overlapping sounds; transition cleanly between calculation and result audio.
- Respect the device's reduced-motion and accessibility settings where possible.
- Do not make audio required to understand the result.
- The exact audio files, duration, volume ramp, and animation duration are not provided yet. Use placeholders or a clean audio abstraction until assets are supplied.

## 9. Name-based adjustment request

On October 15, the client said: “Top 5 female names that cheat” and asked that this be factored into the random formula or at least the risk meter. He has not supplied the names or a source in the conversation.

**Do not implement a real-name infidelity ranking by default.** Such a list could be unreliable and misleading, and it could create harmful claims about people based on a name. Keep this requirement blocked pending owner review. If the owner still wants a name-based novelty effect, recommend clearly fictional, randomized entertainment behavior that does not claim that any name is associated with cheating. Do not scrape or invent statistics.

## 10. Monetization

The client's proposal:
- Charge **$0.99 per search**.
- Avoid subscriptions because he believes they would deter users.
- He was skeptical of in-app ads because ads might interrupt paid searches and generate less revenue.
- He suggested a funny YouTube promotion or a promotional video with a commercial as a possible alternative.

### Requirements and unresolved decisions
- Treat $0.99 as the proposed price, not an implemented payment contract.
- Do not charge users or simulate successful payments in production without a selected payment provider and explicit approval.
- Confirm platform (web, mobile, or both) before selecting payment technology.
- Confirm what counts as one paid search, whether retries are charged, and whether cached/repeated searches require another payment.
- Define failure, refund, receipt, tax, and customer-support behavior before launch.
- Do not add ads or subscriptions unless the owner changes the requirement.
- Any revenue projections are hypothetical and must not be treated as guaranteed results.

## 11. Privacy, data, and disclaimer

The client said:
- Do not show photos or addresses or anything that specifically identifies a person.
- Do not retain data like a database.
- Include the wording “For entertainment purposes only.”

### Requirements
- Do not create a persistent search-history database.
- Do not show profile photos, street addresses, contact details, or real-person records.
- Keep session results in memory only unless the owner explicitly approves a different privacy design.
- Do not log names or full search inputs to application logs, crash reports, analytics, or server telemetry by default.
- Avoid sending personally identifying inputs to external services.
- Provide the disclaimer prominently enough to be noticed, not only hidden in a footer.
- The disclaimer does not itself establish legal compliance. Privacy practices, data collection, marketing claims, payment policies, and applicable laws must be reviewed before launch.

## 12. Branding and UI

The client said:
- TwatFax felt too harsh.
- He suggested Ho3Fax because Hoefax.com was taken.
- He wants a catchy logo and a playful theme.
- He considers a good-looking theme important.
- He will research themes and work on a logo.
- He suggested suspense music and animated meter behavior.

**Screenshots:** The product owner will attach UI screenshots manually. Cursor must inspect those images when available and use them as the primary design reference. Do not invent screenshot contents or claim pixel-perfect matching until the screenshots are present.

### UI implementation expectations
- Reproduce the supplied layout, hierarchy, colors, typography, spacing, borders, shadows, and meter style as closely as practical.
- Ensure responsive behavior across common mobile and desktop widths.
- Preserve accessible contrast, visible focus states, keyboard navigation, labels, and reduced-motion support.
- Do not replace the supplied design with a generic template without asking.
- Use reusable components for inputs, calculation state, risk meter, sound controls, disclaimer, and result display.

## 13. Suggested user flow

The precise flow must follow the attached UI references, but the product behavior is expected to cover:

1. User opens the Ho3Fax experience.
2. User sees the brand and entertainment disclaimer.
3. User enters the approved fields (name, city, state, age).
4. User starts the calculation.
5. A suspenseful calculation animation/audio may play, subject to user sound settings.
6. The calculator computes the fictional estimate and session variation.
7. The result and risk meter appear.
8. Green/red audio behavior follows the approved threshold rules, if sound is enabled.
9. Searching the same name again during the same session returns the same result.
10. Ending the session clears all temporary search results.

A paid-search gate must not be added until the payment flow is confirmed.

## 14. Technical and code-quality requirements

- First inspect the existing repository, framework, package manager, routing, styling system, and test setup before modifying files.
- Follow existing conventions and avoid unnecessary rewrites.
- Use typed, maintainable code consistent with the project's language/framework.
- Separate concerns: form validation, formula, variation/session cache, risk-meter mapping, audio, payment (if later approved), and UI.
- Keep calculation logic pure and unit-testable.
- Add tests for formula calculation, invalid input, variation bounds, stable same-key session results, different-key behavior, and session reset behavior.
- Do not add a backend or database unless a confirmed requirement needs it.
- Do not add dependencies without checking whether existing libraries can meet the need.
- Add loading, error, empty, and success states where applicable.
- Ensure no secrets, payment keys, or private credentials are committed.
- Do not mark a feature complete until it is implemented and tested.
- When blocked by an unresolved requirement, document the blocker and ask rather than making a consequential product decision silently.

## 15. Acceptance criteria

The initial implementation is acceptable when:
- The provided screenshots have been inspected and the UI follows them closely.
- The approved input fields are present and validated.
- The formula is implemented in a documented, testable function.
- The chosen weeks/age rule has been confirmed and matches the approved specification.
- The variation module follows an explicitly approved rule.
- The same normalized key returns the same result throughout the active session.
- A new session starts with an empty cache.
- The risk meter uses approved thresholds and does not make factual claims about a real person.
- Sound is user-controlled, does not autoplay unexpectedly, and follows the approved meter states.
- The disclaimer is visible.
- No persistent database of search inputs or results is introduced.
- Payment, ads, name-based rankings, and any external data integration remain disabled until explicitly approved.
- Tests pass and the README explains setup, configuration, and known limitations.

## 16. Open questions — do not silently decide

1. Is the first release a website, a mobile app, or both?
2. What framework and deployment environment should be used? Inspect the repository first.
3. Is age a required input, and what is its permitted range?
4. How exactly should the starting age be selected: fixed at 16, selectable, or another approved rule?
5. How should weeks be calculated and rounded?
6. What are the precise variation probabilities and percentages?
7. Does the session cache key consist of name alone or name + city + state + age?
8. What precisely ends a session: closing a tab, closing the browser, or exiting the app?
9. What numeric ranges correspond to green, yellow (if any), and red?
10. What are the final UI screenshots, logo, font, colors, and audio assets?
11. Which payment provider and checkout flow should support the proposed $0.99 charge?
12. Does a repeated search in the same session count as a new paid search?
13. Will the client supply a credible source for the proposed top-five-name idea? Recommendation: do not make real-name claims; use fictional entertainment variation instead.
14. Has the domain been secured and the final brand approved?
15. What privacy policy, terms, age policy, and legal review are required for the launch jurisdiction?

## 17. Instructions for Cursor

Treat this document as the initial product requirements source of truth.

1. Read this entire document before coding.
2. Inspect the repository and report its current framework and structure.
3. Inspect any UI screenshots attached by the owner; use them as the visual reference.
4. Separate confirmed requirements from open questions.
5. Implement only confirmed requirements.
6. Do not invent final design details, randomization rules, risk thresholds, payments, or name-based statistics.
7. If a question blocks implementation, list it clearly and implement only the independent parts.
8. Add tests for the calculation and session behavior.
9. At the end, report files changed, features implemented, tests run and their results, unresolved questions, and anything that still needs owner approval.

---

## Source notes

This PRD is based on the client conversation supplied by the owner, dated October 13–15, 2026. The client explicitly mentioned the product name/domain idea, required inputs, formula and its explanation, variation concept, session consistency/reset behavior, risk meter, audio ideas, $0.99-per-search proposal, dislike of subscriptions and interruptive ads, privacy constraints, entertainment disclaimer, and a name-based adjustment idea.

Where the conversation did not specify a precise implementation detail, this document marks it as unresolved instead of presenting a guess as an agreed requirement.
