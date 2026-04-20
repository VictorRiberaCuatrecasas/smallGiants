# AI Transparency Log

## Tools Used

- `ChatGPT` for voice dictation, general questions, and planning prompts
- `GitHub Copilot` for autocomplete
- `Codex` for planning, iteration, refactoring, and review

## How I Used AI

My general workflow across the tasks was:

1. Draft a planning prompt in ChatGPT.
2. Use Codex to turn that into a more concrete plan and refine it.
3. Execute multiple iterations from that plan.
4. Review the outputs and choose the strongest version as a base.
5. Make smaller manual changes to meet the minimum requirements and improve styling.
6. Refactor, clean up, and optimize the final version.

## Good AI Output

### Task 1

- The styling direction got fairly close to the reference I used: `https://muppetmeals.com/`
- After around three iterations, the result was roughly 90% of the way there
- Refactoring feedback was useful, especially around accessibility details such as ARIA improvements

### Task 2

- The styling had good touches in areas like gradients, shadows, and animation
- The initial filtering logic looked close to meeting the requirements at first glance
- AI also helped identify the need to improve URL/history handling

### Task 3

- AI was useful for explaining the Liquid documentation and the server/client split

### Task 4

- The initial field coverage was mostly on point
- AI also helped me switch from a JSON-style structure to a clearer `.md` table format

## Bad AI Output / Where I Had to Intervene

### Task 1

- Running the same plan more than once produced inconsistent results
- Some outputs used far too much JavaScript and CSS for a relatively small task
- One output was extremely long and not worth using as a base
- The loading skeleton needed extra tuning because its dimensions did not match the product card
- The card layout broke or wrapped awkwardly around `360px`
- Changing a swatch rerendered the whole card, which caused focus loss and unnecessary ARIA-live noise
- Input validation was generally not considered
- Price formatting was handled too rigidly and assumed USD
- One version removed the required strikethrough price styling even though that was explicitly part of the brief

### Task 2

- The product grid behaved unevenly, with cards ending up at different sizes in the same row
- The cards were built with CSS Grid where I would have preferred Flexbox for that layout
- One stock badge treatment looked visually off
- The staggered card animation was not implemented the way I wanted
- URL state updates were written, but browser back/forward navigation was not handled correctly at first

### Task 3

- The first output was almost entirely JavaScript and did not use enough Liquid, even though Liquid was clearly the point of the exercise
- The README became much too large before it was simplified
- One version used `cart.attributes` to bridge recently viewed handles into Liquid, which felt like a workaround rather than a clean solution

### Task 4

- The initial schema was too strict on required fields and had to be loosened to allow more editorial flexibility

## Honest Reflection

In a real project, I would still rely on AI for:

- first-pass planning
- exploring multiple implementation directions quickly
- catching obvious refactoring or accessibility improvements
- helping restructure documentation and explanations

I would rely less on AI for:

- final implementation decisions without review
- accessibility details that need careful judgment
- schema design where editor experience and long-term developer collaboration matter
- outputs that become too large, too rigid, or too disconnected from the intent of the task

The main value for me was speed during exploration and iteration. The main risk was that AI often produced something plausible but misaligned with the spirit of the assignment, so I still had to review, simplify, and correct some things manually.
