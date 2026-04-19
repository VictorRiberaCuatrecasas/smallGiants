using

- chatGPT for voice dictation and general questions
- copilot for autocompletion
- Codex for Planing / Agents

done:
plan for every task:
1- prompt engineering for planing task with chatGPT
2- plan with Codex and finetune
3- execute 3 iterations of plan
4- scan and pick an iteration as base point
5- minor touches to meet minimum requirements and styling
6- refactor / cleaning / optimization


good:
-task 1 :

- task-1 styling is quite accurate with reference used https://muppetmeals.com/
- task-1 about 90% right with 3 iterations
- task-1 good insights on refactor and improvements, specially regarding all1 aria

task-2
- good styling with nice touches on gradients shadow and animation
- initial logic seems to meet all requirements at first glance
- identified url history improvement

task-3


task-4

bad:

task-1:

- inconsistent results executing same plan for task 1, excesive js and css. One output had 1.6lines of code, didnt even bother looking at it. prompt for planing was specific about keeping it short and simple
- loading skeleton of task 1 took some fine tuning to fix the dimentions. loading skeleton didnt match card dimensions
- task-1 card broke/wrapped weirdly at 360px~
- task-1 changing swatch re renders all the card making it lose focus track / also added aria live which will trigger on re render and its just noise
- In general, input validation is not considered. This is intentionally ignored as it could be easily handled with ts or another validation approach.
- handles pricing in a very rigid way and asumes usd currency. not ideal but ignored since it serves the demo purpose
- removed strike-through styles in prices when it knew it was a requirment

task-2
- weird grid behaviour for product cards, instead of taking equal space per product card, it has fluid columns which causes diferent sizes of cards on same res
- product cards made with grid, i prefer flexbox. my bad for not prompting it
- weird stock badge with massive bg circle
- failed to add card appearing animatition 1 by 1 instead of by bulk. leaving it for the end since im not sure how to do it with vanilla js and css
- URL state was being rewritten but not navigable with browser back/forward.

task-3


task-4

TODO: prettify with ia
