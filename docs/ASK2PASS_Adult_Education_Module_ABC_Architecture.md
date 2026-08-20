
## The ABC of Reading and Writing

**Status:** Architecture / Product Requirement Specification
**Module:** Adult Education Module
**Programme:** The ABC of Reading and Writing
**Date:** 2026-08-17

---

## 1. Purpose

The Adult Education Module provides a continuous, progressive adult-literacy learning pathway for learners who need foundational and functional reading and writing education.

It is a programme/domain operated by the common ASK2PASS AI and learning infrastructure, not a separate learning engine.

---

## 2. Core Architectural Principle

The Adult Education Module shall reuse the existing ASK2PASS learning infrastructure, including:

- AI Engine
- Learning Orchestration
- Learning Delivery
- Learning Runtime
- Learning Progress
- Adaptive Learning
- Assessment infrastructure
- Learning session continuity
- Lesson-note and learner-record infrastructure

It shall maintain its own Adult Education curriculum, progression rules, mastery gates and examination rules.

### Academic learning

`Curriculum → TCC/DCC → DSC → Learning → Recovery`

### Adult Education

`ABC Curriculum → Progressive Path → Adaptive Learning → Mastery → Next Authorized Topic`

Both ultimately operate through the shared ASK2PASS learning infrastructure.

---

## 3. Dashboard Identity

The dashboard module shall be named:

**Adult Education Module**
**The ABC of Reading and Writing**

It is the seventh Learning Module.

The existing six Learning Modules remain intact:

1. SCLA — School Classroom Learning Activities
2. PTDM — Personal Tutorial Drills
3. CEDM — Certificate Examination Drilling Module
4. MEDM — Mock Examinations Drill Module
5. SAP — Skill Acquisition Programme
6. BM — Business Modelling

The Adult Education Module should be presented as a prominent full-width horizontal tile, preferably beneath the first two rows of the existing Learning Modules.

Recommended visual arrangement:

```text
SCLA                         PTDM
CEDM                         MEDM

┌─────────────────────────────────────────────┐
│        ADULT EDUCATION MODULE               │
│        THE ABC OF READING AND WRITING       │
│        Progressive Literacy → Mastery       │
└─────────────────────────────────────────────┘

SAP                          BM


## 4. Curriculum Model

The programme uses an A–Z master curriculum framework.

A–Z represents curriculum domains, not merely 26 lessons.

Each domain can contain dynamically generated topics, exercises, reviews and assessments.

### A — Alphabet & Print Awareness
Letter recognition, uppercase/lowercase, alphabet sequence, print awareness and letter identification.

### B — Beginning Sounds
Initial sounds, sound discrimination and letter-to-sound relationships.

### C — Consonants & Vowels
Vowels, consonants, short/long vowel awareness and core sound patterns.

### D — Decoding
Sound blending, syllables, CVC patterns and decoding unfamiliar simple words.

### E — Early Word Reading
Simple words, high-frequency words, word recognition and word-picture association.

### F — Phonics & Word Families
Common sound patterns, rhyming, word families and pattern recognition.

### G — Guided Reading
Simple sentences, reading fluency and extracting meaning from short sentences.

### H — High-Frequency Vocabulary
Common everyday words, personal information, family, places, time and objects.

### I — Information Reading
Signs, labels, notices, instructions, forms and short messages.

### J — Joining Words
Combining words, sentence formation and basic conjunctions.

### K — Key Vocabulary
Everyday vocabulary expansion, opposites, synonyms and contextual meaning.

### L — Listening to Reading
Hear → identify → read → understand → use.

### M — Meaning & Comprehension
Who, what, where, when, why, main idea and simple inference.

### N — Numbers & Numeracy Literacy
Reading numbers, dates, prices, quantities, addresses and practical numerical information.

### O — Oral-to-Written Language
Speaking-to-writing, dictation, everyday communication and expressing simple ideas.

### P — Practical Writing
Names, addresses, notes, lists, messages and basic forms.

### Q — Question Literacy
Understanding, reading and answering questions; asking questions and question words.

### R — Reading Fluency
Accuracy, repeated reading, phrase recognition and progressively longer passages.

### S — Sentence Construction
Subject, verb, object, word order, capitalization and punctuation.

### T — Text Understanding
Short paragraphs, main ideas, supporting details, sequence and simple summaries.

### U — Useful Everyday Documents
Notices, receipts, instructions, schedules and public/workplace information.

### V — Vocabulary Expansion
Context, word relationships, meaning and usage.

### W — Writing Development
Sentence writing, short paragraphs, descriptions and functional communication.

### X — Expression
Communicating ideas, written responses, descriptions and organizing thoughts.

### Y — Your Everyday Literacy
Integrated practical reading, writing, listening, understanding and communication.

### Z — Independent Literacy & Mastery
Independent reading, comprehension, writing and practical functional-literacy performance.

---

## 5. Progressive Learning Rule

The learner normally progresses continuously through the authorized curriculum path.

The system automatically generates or selects the next appropriate topic based on:

- current mastery
- previous performance
- prerequisite mastery
- adaptive difficulty
- learner history
- assessment results

The learner does not manually browse and jump to arbitrary unmastered topics under normal operation.

The system controls the authorized progression boundary.

---

## 6. Mastery and Authorized Topic Jumping

The no-jump rule has one deliberate exception.

A learner may request access to a later topic or domain of interest.

The system shall not simply unlock it because the learner requested it.

Instead, the system may generate an entry/proficiency assessment covering the prerequisite knowledge required for that requested topic.

### If the learner passes

The system may:

- recognize the prerequisite competencies as demonstrated
- authorize the requested topic/domain
- record the assessment evidence
- update the learner's progression state
- preserve the learner's previous records
- continue adaptive learning from the newly authorized position

### If the learner does not pass

The system shall:

- keep the requested topic locked
- identify prerequisite weaknesses
- generate appropriate adaptive learning/reinforcement
- return the learner to the appropriate authorized progression point

Therefore:

**Learners cannot arbitrarily jump topics, but demonstrated competence can earn an authorized progression jump.**

This is a mastery-based exception, not unrestricted topic skipping.

---

## 7. Daily Study Cycle

A normal Adult Education study cycle is 40 minutes.

It consists of:

### Lesson — 25 minutes

Adaptive instruction and learning activity.

The 25-minute period is a lesson duration, not a one-topic duration.

A fast learner may complete:

- one topic
- two topics
- three topics
- or another number of topics

within the lesson period, depending on demonstrated mastery and the adaptive engine.

### Review — 5 minutes

Review of material learned during the study cycle.

### CBT Quiz — 10 minutes

A short computer-based assessment measuring the learning covered during the cycle.

### Total

**25 + 5 + 10 = 40 minutes**

The 40-minute period represents a study cycle, not a topic boundary.

---

## 8. Break Rule

After a 40-minute study cycle, the system shall recommend/require a break before beginning another standard cycle.

The break is a learning-session boundary.

It does not impose a daily study limit.

A learner may return and undertake another study cycle.

There is no imposed limit on:

- number of study cycles per day
- number of days of study
- total lifetime study sessions

The learner may study again whenever they are ready.

---

## 9. Continuous Study

The system must preserve continuity across sessions.

On login or classroom entry, the learner should see:

- current A–Z position
- current domain
- current topic
- mastery/progression state
- recent lesson activity
- completed topics
- topics requiring reinforcement
- next authorized topic
- relevant study-cycle status

The learner should be able to continue directly from the correct state.

The learner should not have to manually search for where they stopped.

---

## 10. Progression Chart

The Adult Education classroom shall display a persistent progression chart.

The chart must be visible when the learner enters the classroom and again when the learner completes/logs out of a learning session.

Conceptually:

A → B → C → D → E → F → G → H → I → J → K → L → M
                              ↑
                           CURRENT

N → O → P → Q → R → S → T → U → V → W → X → Y → Z

Each A–Z domain may contain multiple internal topics.

The progression chart must therefore represent both:

- high-level A–Z progress
- detailed topic-level progress within the current domain

The backend remains authoritative for progression state.

---

## 11. Adaptive Learning

Adaptive mode is mandatory.

The system dynamically adjusts:

- topic selection
- difficulty
- explanation
- practice quantity
- reinforcement
- review
- assessment generation
- progression decisions

A learner who demonstrates faster mastery should progress faster.

A learner who requires reinforcement should receive additional adaptive instruction without being treated as having failed the entire programme.

---

## 12. Language Controls

The classroom shall provide language controls for learner support and instruction.

Language selection must be integrated with the AI learning experience.

Language configuration should remain extensible rather than permanently hard-coded to a fixed list.

Language support may affect:

- explanations
- instructions
- examples
- spoken/audio support
- clarification
- learner interaction

The underlying literacy progression and mastery requirements remain controlled by the Adult Education curriculum.

---

## 13. Monthly Examination

Every Adult Education learner must undertake a monthly examination.

The monthly examination contains both:

1. CBT examination
2. Essay/writing examination

The examination must be recorded as part of the learner's formal assessment history.

The monthly examination is distinct from the normal 10-minute study-cycle CBT quiz.

### Study-cycle CBT

- 10 minutes
- frequent
- formative
- measures current lesson-cycle learning

### Monthly examination

- formal periodic assessment
- CBT component
- Essay/writing component
- recorded in assessment history

---

## 14. Lesson Notes

A lesson note shall be filed after every completed lesson/study activity according to the existing ASK2PASS lesson-record architecture.

The record should capture, as applicable:

- learner
- date/time
- Adult Education programme
- A–Z domain
- topics covered
- learning objectives
- adaptive level/state
- performance
- mastery outcome
- review outcome
- CBT quiz result
- next authorized topic
- reinforcement requirements

Lesson notes must remain accessible through the learner's records.

---

## 15. Assessments and Records

Adult Education learners receive the same normal ASK2PASS academic/learning record discipline as other learners, where applicable.

Records shall include:

- lesson records
- progression records
- mastery records
- study-session records
- CBT quiz records
- monthly examination records
- essay assessment records
- adaptive learning history
- authorized progression jumps
- reinforcement history

These records are persistent and backend-authoritative.

---

## 16. Stars & Awards

Adult Education learners are not entitled to Stars & Awards through this programme.

Therefore:

- Adult Education performance must still be recorded.
- Assessment and progression records must still be retained.
- Mastery must still be measured.
- The programme must not award Stars or Awards for its normal progression.

The existing Stars & Awards infrastructure should not be duplicated.

The Adult Education programme should instead expose meaningful learning-progress indicators such as:

- A–Z progression
- mastery
- completed domains
- completed topics
- study cycles
- examination performance
- literacy competencies achieved

---

## 17. Backend Integration Requirements

The Adult Education domain must integrate with existing ASK2PASS infrastructure rather than creating a parallel learning engine.

Required integration areas include:

- curriculum/content
- learning path
- learning orchestration
- learning delivery
- learning runtime
- adaptive learning
- learning progress
- assessment engine
- learner records
- lesson notes
- session continuity
- AAT/AI operative infrastructure where appropriate

TCC/DCC and DSC are not required as the Adult Education scheduling mechanism.

---

## 18. Progression State

The backend should maintain an authoritative Adult Education progression state containing at minimum:

- learner ID
- programme ID
- current A–Z domain
- current topic
- current mastery state
- mastery evidence
- completed topics
- reinforcement topics
- adaptive state
- language preference
- last session
- current study-cycle state
- next authorized topic
- authorized progression jumps
- examination history

The mobile application must not become the source of truth for this state.

## 19. Progression State and Progression States

AEM progression is a backend-authoritative state machine. The learner's current position, mastery status, prerequisite status, assessment results, authorized jumps, and session continuity must be determined from persistent backend records rather than from the mobile client.

A topic may move through progression states such as:

- `LOCKED` — The topic is not currently available to the learner.
- `AVAILABLE` — The system has determined that the topic is the appropriate next learning target.
- `IN_PROGRESS` — The learner has entered and is actively studying the topic.
- `LEARNING` — The learner is receiving instruction and adaptive practice.
- `ASSESSMENT_REQUIRED` — The system requires an assessment before progression can continue.
- `MASTERED` — The learner has demonstrated the required proficiency.
- `AUTHORIZED_JUMP` — A later topic was requested and the learner demonstrated sufficient prerequisite competence for access.
- `REINFORCEMENT` — The learner did not yet demonstrate sufficient competence and has been directed to adaptive reinforcement.
- `COMPLETED` — The required learning activity and associated assessment requirements have been completed.
- `SUSPENDED` — Progression is temporarily paused because of an incomplete or interrupted process.

The exact implementation may use database enums, state records, or another equivalent representation, but the semantic states must remain consistent across the backend, API, adaptive engine, classroom, and records system.

The learner must not be able to directly write or manipulate progression states from the mobile application.

The backend determines the valid next state from:

1. Current curriculum domain and topic.
2. Previous learning history.
3. Demonstrated mastery.
4. Required prerequisites.
5. Assessment results.
6. Adaptive-learning decisions.
7. Authorized topic-jump decisions.
8. Session completion or interruption.
9. Applicable examination or programme rules.

Progression must be monotonic with respect to demonstrated mastery. A learner's previous mastery record must not be silently erased merely because a later assessment indicates that reinforcement is needed.

Where reassessment identifies a knowledge gap, the system should create a new adaptive learning requirement while retaining the historical mastery and assessment evidence.

---

## 20. Topic Generation and Topic Authorization

A–Z in AEM represents curriculum domains rather than a fixed list of twenty-six lessons.

Each domain may contain an expandable collection of topics, subtopics, learning activities, practice activities, assessments, and mastery requirements. Topics may therefore be generated or selected dynamically while remaining inside the defined curriculum boundaries.

The existing ASK2PASS AI/adaptive architecture is responsible for selecting or generating an appropriate next learning target. AEM does not introduce a separate learning engine.

Topic generation must be constrained by the authoritative AEM curriculum definition. Generated content must not be allowed to redefine the curriculum domain, bypass prerequisite relationships, or independently authorize learner progression.

The normal topic-selection process is:

1. Determine the learner's current progression state.
2. Identify the next appropriate domain/topic.
3. Evaluate prerequisite knowledge.
4. Select an existing approved topic or generate an appropriate topic instance.
5. Deliver the learning activity.
6. Collect learning and assessment evidence.
7. Update mastery and progression.
8. Determine the next authorized learning target.

A learner may request access to a later topic. Such a request is treated as a **topic-jump request**, not as direct authorization.

The backend must first identify the prerequisite knowledge required by the requested topic. It then generates or selects an appropriate proficiency assessment.

If the learner demonstrates the required competence:

`REQUESTED → PREREQUISITE ASSESSMENT → PASS → AUTHORIZED_JUMP`

If the learner does not demonstrate the required competence:

`REQUESTED → PREREQUISITE ASSESSMENT → INSUFFICIENT → REINFORCEMENT → LOCKED/AVAILABLE`

The mobile application must never convert a requested topic into an authorized topic merely because the learner selected it.

---

## 21. Study Session Lifecycle

An AEM study session represents a continuous learning interaction and is independent of the number of topics completed during that session.

The standard study cycle is:

- Lesson — 25 minutes.
- Review — 5 minutes.
- CBT quiz — 10 minutes.
- Total — 40 minutes.

The 40-minute cycle is a study-cycle boundary, not a curriculum-topic boundary.

A fast learner may complete more than one topic during the lesson portion of a single cycle. The system must therefore record completed learning activities independently from the fixed study-cycle duration.

A normal session lifecycle is:

`SESSION_STARTED`

→ learner identity and AEM enrolment verified

→ current progression retrieved

→ appropriate topic selected

→ lesson/activity begins

→ adaptive interaction occurs

→ review performed

→ CBT quiz completed

→ mastery/proficiency evidence evaluated

→ lesson note and activity records persisted

→ progression updated

→ study cycle completed

→ break boundary presented

→ session closed or a subsequent session may later begin.

If the learner stops before the cycle is complete, the backend must preserve the incomplete session state and the completed activities. The learner must not lose valid learning evidence because the application was closed, disconnected, or interrupted.

A session may contain multiple topic activities where the learner progresses rapidly. Each completed activity must remain individually identifiable in the learner record.

There is no daily limit on the number of study cycles. After the applicable break boundary, the learner may begin another study cycle whenever they choose.

---

## 22. Assessment and Mastery Gates

Assessment is a core component of AEM progression and must be integrated with the existing ASK2PASS assessment architecture.

AEM assessments serve different purposes and must not be conflated.

### 22.1 Learning-Cycle CBT

The normal study cycle contains a 10-minute CBT component. This assessment provides immediate evidence about the learner's understanding of the material studied during that cycle.

Its result may influence:

- Topic mastery.
- Adaptive reinforcement.
- Review requirements.
- The next appropriate learning activity.
- Progression state.

The study-cycle CBT is **not** the monthly formal examination.

### 22.2 Prerequisite/Proficiency Assessment

When a learner requests a later topic, the system must determine what prerequisite competence is required.

The backend must then generate or select an appropriate proficiency assessment.

A successful result may authorize the requested topic as `AUTHORIZED_JUMP`.

An unsuccessful result must not punish the learner or permanently prevent future access. Instead, the system must identify the relevant learning gap and provide adaptive reinforcement before reconsidering progression.

### 22.3 Mastery Gate

A mastery gate is satisfied only when the learner has demonstrated the required level of competence defined for the relevant learning objective.

Mastery decisions should consider the appropriate evidence available to the adaptive/assessment architecture rather than relying solely on a single client-side score.

The backend must record:

- Assessment type.
- Topic/domain.
- Attempt.
- Result.
- Mastery decision.
- Required threshold or proficiency rule.
- Timestamp.
- Related learning session.
- Adaptive action taken.
- Progression state before and after assessment.

### 22.4 Monthly Formal Examination

The monthly examination is a separate programme-level assessment containing:

- CBT.
- Essay/writing component.

Its results must be stored separately from ordinary study-cycle CBT results.

The examination must not be treated as a normal topic lesson, and completion of a study-cycle CBT must never be recorded as completion of the monthly examination.

---

## 23. Adult Education Classroom Requirements

The AEM classroom is the learner-facing environment for the Adult Education programme.

It must expose the learner's current progression without allowing the learner to directly control authoritative progression.

When the learner enters the classroom, the system must retrieve and display the current progression state from the backend.

The classroom should provide, as applicable:

- Current A–Z curriculum domain.
- Current topic.
- Current learning objective.
- Mastery/proficiency status.
- Progression position.
- Adaptive learning status.
- Authorized topic-jump status.
- Completed learning activities.
- Study-cycle status.
- Review status.
- CBT status.
- Relevant lesson notes or learning records.
- Language controls.
- Session controls.

A progression chart must be visible inside the classroom. It should communicate where the learner is within the A–Z programme and which learning targets have been completed, are active, require reinforcement, or remain locked.

The progression chart must not imply that every A–Z domain is a fixed number of lessons. Domains may expand dynamically as approved topics are introduced.

The classroom must clearly distinguish:

- Current authorized learning.
- Completed mastery.
- Reinforcement.
- Locked topics.
- Authorized jumps.
- Requested but not yet authorized topics.

The learner may request a later topic from the classroom. The request must be submitted to the backend, where the prerequisite assessment and authorization decision occur.

The classroom must support adaptive mode as a mandatory learning behavior. Adaptive mode must be treated as part of AEM operation rather than as an optional decorative feature.

At the end of a completed session or when the learner exits, the classroom must retrieve or display the latest progression information so the learner can see what was achieved and what the system has identified as the next appropriate step.

---

## 24. Mobile Learning Module Integration

AEM becomes the **seventh Learning Module/interface** within the existing ASK2PASS Learning Modules architecture.

The existing six Learning Modules remain intact:

1. SCLA — School Classroom Learning Activities.
2. PTDM — Personal Tutors Drill Module.
3. CEDM — Certificate Examination Drilling Module.
4. MEDM — Mock Examinations Drill Module.
5. SAP — Skill Acquisition Programme.
6. BM — Business Modelling.

AEM must be added as an interface to the existing architecture rather than introduced as another independent learning engine.

The existing six modules must not be destroyed or unnecessarily rearranged. AEM should occupy a horizontally flat position across the top beneath either the first three or the second three existing Learning Modules, according to the established dashboard layout.

The mobile interface must communicate that AEM is a specialized Adult Education programme and not another copy of the existing AI learning engine.

The mobile client is responsible for presentation and user interaction. It is not authoritative for:

- Curriculum ownership.
- Topic authorization.
- Mastery.
- Progression state.
- Assessment validity.
- Authorized jumps.
- Record retention.
- Examination completion.

The mobile application must obtain these decisions from the backend through the established ASK2PASS API and learning architecture.

AEM integration should reuse existing services and infrastructure wherever the existing architecture already provides the required capability. New code should be introduced only where AEM-specific behavior is genuinely required.

The implementation order is therefore:

1. Define and validate backend AEM contracts.
2. Integrate AEM with existing curriculum and learning architecture.
3. Integrate progression and mastery persistence.
4. Integrate assessment and adaptive behavior.
5. Expose the required API operations.
6. Verify backend authority and error recovery.
7. Test the complete backend flow.
8. Only then implement or modify the AEM mobile classroom and dashboard interface.

The AEM mobile screen must never become the source of truth for learner progression.


## 25. Security, Authority and Data Ownership

AEM must follow the existing ASK2PASS principle that the backend is authoritative for learner progression, mastery, assessment results, topic authorization, session records, and programme records.

The mobile application must never be trusted to determine or permanently modify authoritative learning state.

The backend must validate:

- Learner identity.
- AEM programme enrollment.
- Topic access.
- Topic-jump requests.
- Prerequisite requirements.
- Assessment submissions.
- Mastery decisions.
- Session ownership.
- Examination ownership.
- Record ownership.
- Any state transition affecting progression.

Client-supplied progression states must be treated as untrusted input.

A learner may request an action from the mobile application, but the backend determines whether that action is permitted.

### 25.1 Backend Authority

The backend is the authoritative owner of:

- AEM curriculum definitions.
- Curriculum domains.
- Topic relationships.
- Prerequisite relationships.
- Progression states.
- Mastery records.
- Authorized jumps.
- Adaptive decisions.
- Study sessions.
- Lesson completion records.
- CBT records.
- Monthly examination records.
- Essay/writing records.
- Lesson notes.
- Progression history.

The client may cache information for presentation and continuity, but cached information must never override the authoritative backend state.

### 25.2 Data Ownership

AEM learner records belong to the learner's ASK2PASS learning record and must remain associated with the correct authenticated learner.

Records must not be duplicated merely because the learner accesses AEM through a different interface.

Where an existing ASK2PASS service already owns a relevant record type, AEM must integrate with that service rather than creating an independent duplicate record system.

### 25.3 Authorization

Every protected AEM operation must verify that the authenticated user is authorized to access the requested learner record and programme function.

Authorization must be enforced server-side.

The system must prevent:

- Access to another learner's progression.
- Unauthorized topic completion.
- Unauthorized mastery assignment.
- Unauthorized topic jumps.
- Modification of examination results.
- Modification of lesson records.
- Client-side bypass of locked topics.

### 25.4 Auditability

Important progression events should be traceable through persistent records or existing ASK2PASS audit mechanisms.

At minimum, the system should be able to determine:

1. What action occurred.
2. Which learner initiated or received the action.
3. Which topic or curriculum domain was affected.
4. Which assessment or evidence supported the decision.
5. What the previous state was.
6. What the resulting state became.
7. When the event occurred.

---

## 26. Persistence and Record Retention

AEM progression must be persistent.

Closing the application, losing network connectivity, restarting the device, or beginning a later study session must not erase valid learner progress.

The backend must retain the records necessary to reconstruct the learner's AEM history.

Persistent records should include, where applicable:

- Learner AEM enrollment.
- Curriculum domain assignments.
- Topic definitions or generated topic references.
- Topic prerequisites.
- Progression states.
- Mastery evidence.
- Topic-jump requests.
- Authorized jumps.
- Reinforcement decisions.
- Study sessions.
- Session interruptions.
- Completed lesson activities.
- Lesson notes.
- Review activities.
- Study-cycle CBT results.
- Prerequisite assessments.
- Adaptive-learning history.
- Monthly examinations.
- Monthly CBT results.
- Essay/writing results.
- Examination completion status.

AEM must use existing ASK2PASS persistence infrastructure whenever it already provides the appropriate capability.

A new table, entity, or record type should only be introduced where the existing architecture cannot represent the required AEM information without ambiguity.

### 26.1 Historical Integrity

Historical assessment and progression evidence must not be silently overwritten.

When a new assessment changes the learner's current adaptive requirement, the system should preserve the previous evidence and record the new decision as a subsequent event or state evaluation.

This allows the system to distinguish:

- What the learner previously mastered.
- What was reassessed.
- What the latest result showed.
- Why reinforcement was recommended.
- Why a topic jump was authorized or rejected.

### 26.2 Lesson Notes

A lesson note must be filed after every completed lesson or qualifying study activity according to the final backend contract.

The note should be linked to:

- Learner.
- AEM programme.
- Curriculum domain.
- Topic.
- Study session.
- Activity.
- Completion status.
- Relevant assessment evidence.

Lesson notes must remain part of the learner's persistent educational record.

### 26.3 No Stars & Awards Duplication

AEM learners are not entitled to Stars & Awards.

AEM must not create a new Stars/Awards mechanism, duplicate an existing awards service, or introduce reward records solely for Adult Education.

---

## 27. Error Recovery and Continuity

AEM must be resilient to interruptions because learning may occur on mobile devices and over unstable network connections.

The system must preserve valid learning evidence when an interruption occurs.

Possible interruptions include:

- Application closure.
- Device restart.
- Network loss.
- API timeout.
- Temporary backend failure.
- Session expiration.
- Duplicate submission.
- Interrupted assessment.
- Interrupted lesson.
- Interrupted monthly examination.

### 27.1 Session Recovery

When an incomplete session is detected, the backend must be able to determine the last authoritative state.

The learner should be able to resume from the most recent valid checkpoint rather than being forced to restart completed work.

The system must distinguish between:

- Completed activity.
- Activity in progress.
- Activity started but not completed.
- Assessment submitted.
- Assessment not submitted.
- Session completed.
- Session interrupted.

### 27.2 Idempotency

Operations that may be retried because of network failures should use appropriate idempotency protection.

A repeated request must not accidentally:

- Complete the same lesson twice.
- Create duplicate CBT results.
- Create duplicate examination submissions.
- Award mastery twice.
- Create duplicate authorized jumps.
- Create duplicate lesson notes.

Where an existing ASK2PASS idempotency or transaction mechanism exists, AEM must use it.

### 27.3 Transactional Integrity

Related state changes should be persisted atomically where required.

For example, when a completed activity causes an assessment result and progression transition to be recorded, the system must avoid leaving the learner with a partially updated progression record.

The exact transaction boundaries must follow the existing ASK2PASS persistence architecture and database conventions.

### 27.4 Recovery Priority

When recovering from an interruption, the backend should prioritize authoritative persisted records over client-side cached state.

If the client and backend disagree, the backend state wins.

The client must refresh its displayed progression after recovery.

---

## 28. Testing and Acceptance Criteria

AEM implementation must be tested at the backend, integration, persistence, API, adaptive-learning, assessment, and mobile-contract levels before the AEM classroom is considered complete.

Testing must verify both normal progression and exceptional conditions.

### 28.1 Curriculum Tests

The system must verify that:

- All A–Z curriculum domains are represented.
- A–Z domains are not treated as exactly twenty-six lessons.
- Domains can contain multiple topics.
- Topics can be dynamically selected or generated within approved curriculum boundaries.
- Topic generation cannot bypass curriculum constraints.

### 28.2 Progression Tests

The system must verify that:

- The backend selects the appropriate next topic.
- Locked topics cannot be directly opened.
- A learner can request a later topic.
- A prerequisite assessment is generated or selected for the request.
- Passing the assessment can produce `AUTHORIZED_JUMP`.
- Failing the assessment produces adaptive reinforcement.
- Unauthorized jumps cannot be created from the client.
- Mastery and progression remain persistent.

### 28.3 Study-Cycle Tests

The system must verify the standard:

`25-minute lesson + 5-minute review + 10-minute CBT = 40-minute study cycle`

The tests must also verify that:

- A topic may finish before the cycle ends.
- Multiple topics may be completed during one lesson period.
- A study-cycle boundary does not force a topic boundary.
- There is no daily topic-count limit.
- A subsequent study cycle can begin after the applicable break.

### 28.4 Assessment Tests

Tests must distinguish:

- Study-cycle CBT.
- Prerequisite/proficiency assessment.
- Mastery assessment.
- Monthly formal CBT.
- Monthly essay/writing examination.

The system must not record one assessment type as another.

### 28.5 Persistence Tests

Tests must verify that learner records survive:

- Application restart.
- Device restart.
- Network interruption.
- Session interruption.
- API retry.
- Backend restart where applicable.

### 28.6 Security Tests

Tests must verify that a learner cannot:

- Modify progression directly.
- Mark a locked topic as completed.
- Assign personal mastery.
- Authorize a topic jump without the required assessment.
- Read another learner's records.
- Modify another learner's examination results.

### 28.7 Acceptance Criteria

AEM is ready for the next implementation stage only when:

1. Backend progression is authoritative.
2. A–Z domains are correctly represented.
3. Dynamic topic selection is integrated.
4. Mastery gates operate correctly.
5. Authorized jumps operate correctly.
6. Adaptive reinforcement operates correctly.
7. Study-cycle timing is represented correctly.
8. Lesson notes persist.
9. Monthly examinations are independently recorded.
10. Error recovery preserves valid learning evidence.
11. Stars & Awards are not duplicated or granted.
12. Existing ASK2PASS learning infrastructure remains intact.

---

## 29. Future Extensibility

AEM must be designed so that future improvements can be introduced without replacing the underlying ASK2PASS learning architecture.

The architecture should permit additional adult-literacy capabilities such as:

- Additional languages.
- Expanded reading pathways.
- Expanded writing pathways.
- Numeracy-related adult education domains where approved.
- Additional curriculum domains.
- More sophisticated adaptive assessment.
- Additional examination formats.
- Accessibility improvements.
- New lesson activity types.
- Additional approved learning resources.

Future expansion must preserve the central architectural decision:

**AEM is a specialized curriculum/programme operating on the existing ASK2PASS learning architecture, not a new independent learning engine.**

New capabilities should therefore be integrated through existing services where appropriate.

### 29.1 Curriculum Expansion

Additional domains may be introduced without changing the A–Z concept.

An A–Z domain may grow in depth through additional topics, prerequisites, learning activities, and assessments.

The system must not assume that the number of topics within a domain is fixed.

### 29.2 Language Expansion

Language support must be designed so that additional supported languages can be introduced without rewriting the progression engine.

Language selection should affect the learner-facing learning experience while preserving a stable underlying curriculum identity and progression record.

### 29.3 Adaptive Expansion

The adaptive system may become more sophisticated over time.

Future adaptive models may consider additional evidence, but they must continue to respect:

- Curriculum boundaries.
- Prerequisites.
- Mastery requirements.
- Backend authority.
- Learner record integrity.

### 29.4 Integration Expansion

Future AEM capabilities should be able to connect to existing ASK2PASS modules and services where appropriate without creating duplicate engines.

Any future integration must first identify whether an existing ASK2PASS service already provides the required capability.

---

## 30. Implementation and Delivery Requirements

AEM implementation must follow a backend-first delivery sequence.

The architecture documented in Sections 1–29 is the authoritative design basis for implementation.

The implementation must not begin by building an isolated mobile AEM classroom and then attempting to construct backend support afterward.

### 30.1 Phase 1 — Repository and Architecture Inspection

Before coding:

1. Inspect the existing ASK2PASS repository.
2. Inspect the current curriculum architecture.
3. Inspect existing learning engines and orchestration services.
4. Inspect adaptive-learning services.
5. Inspect assessment services.
6. Inspect learning-progress and learning-runtime services.
7. Inspect existing lesson-note and learner-record infrastructure.
8. Inspect API conventions.
9. Inspect database entities and migrations.
10. Identify reusable infrastructure.

No duplicate engine should be created where an existing service can satisfy the requirement.

### 30.2 Phase 2 — Backend AEM Foundation

Implement only the AEM-specific backend capabilities that are required after the repository inspection confirms the missing pieces.

This may include:

- AEM curriculum definitions.
- AEM domain/topic metadata.
- Progression state management.
- Topic authorization.
- Topic-jump requests.
- Prerequisite assessment integration.
- Study-session management.
- Lesson-note integration.
- Assessment integration.
- Monthly examination records.
- Adaptive-learning integration.

The exact modules, entities, services, and controllers must follow existing ASK2PASS architectural conventions.

### 30.3 Phase 3 — Integration and Wiring

Wire AEM into the existing ASK2PASS architecture.

Integration must verify:

- Curriculum integration.
- Learning orchestration.
- Adaptive learning.
- Assessment.
- Progress tracking.
- Learning runtime.
- Persistence.
- API exposure.
- Error recovery.

AEM must not bypass the established orchestration and authority boundaries.

### 30.4 Phase 4 — Backend Validation

Before mobile implementation:

1. Run TypeScript validation.
2. Run applicable unit tests.
3. Run integration tests.
4. Validate database migrations.
5. Validate API contracts.
6. Test progression transitions.
7. Test mastery gates.
8. Test authorized jumps.
9. Test adaptive reinforcement.
10. Test session recovery.
11. Test persistence.
12. Test monthly examination separation.
13. Verify no Stars/Awards duplication.

The backend must be demonstrably authoritative before the mobile AEM screen is modified.

### 30.5 Phase 5 — Mobile Integration

Only after backend validation should the mobile application be modified.

The mobile implementation must:

- Add AEM as the seventh Learning Module/interface.
- Preserve the six existing Learning Modules.
- Follow the established dashboard layout.
- Display backend-authoritative progression.
- Display the AEM progression chart.
- Provide mandatory Adaptive mode.
- Provide language controls.
- Provide study-cycle controls.
- Support topic requests.
- Display authorization and reinforcement states.
- Display session completion and latest progression.

The mobile application must not implement independent progression logic that conflicts with the backend.

### 30.6 Phase 6 — Final Verification and Delivery

Before committing the completed implementation:

- TypeScript must pass.
- Relevant tests must pass.
- Database state must be valid.
- API routes must be verified.
- Backend-to-mobile contracts must be verified.
- Existing Learning Modules must remain intact.
- AEM must be correctly wired.
- No duplicate learning engine must exist.
- No duplicate Stars/Awards infrastructure must exist.
- Documentation must remain synchronized with the implementation.

The final implementation must be committed to:

` sprint-31-error-recovery-20260810 `

The implementation and documentation should be delivered as a coherent change set so that the repository state clearly represents the approved AEM architecture and its backend-first implementation.
