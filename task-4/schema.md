# Task 4 - Storyblok Schema Design

## Component: `hero_section`

| Field name | Type | Required | Validation / constraints | Why this structure |
| --- | --- | --- | --- | --- |
| `internal_label` | Text | No | Max 60 chars | Editor-facing label to identify the block in Storyblok without affecting the frontend. |
| `eyebrow` | Text | No | Max 40 chars | Useful for short context like campaign or page type without forcing it on every page. |
| `headline` | Text | No | Max 90 chars; recommended unless the hero is intentionally CTA-only or media-led | Keeps the component flexible for pages that do not need a headline while still encouraging strong primary messaging in the common case. |
| `supporting_text` | Textarea | No | Max 280 chars | Allows a concise supporting paragraph without turning the hero into a text-heavy section, but does not force text onto visually led hero variants. |
| `primary_cta_label` | Text | No | Max 30 chars; required if `primary_cta_url` is set | CTA text stays separate so editors do not need to edit link objects directly in the UI. Conditional pairing prevents incomplete buttons. |
| `primary_cta_url` | Link | No | Must be internal or valid external URL; required if `primary_cta_label` is set | Keeps CTA destination structured and reusable while enforcing a complete primary CTA. |
| `secondary_cta_label` | Text | No | Max 30 chars; required if `secondary_cta_url` is set | Supports optional secondary action without forcing a second button. Conditional pairing prevents half-filled controls. |
| `secondary_cta_url` | Link | No | Must be internal or valid external URL; required if `secondary_cta_label` is set | Same reason as primary CTA. |
| `background_media_type` | Single-option / enum | Yes | Allowed values: `image`, `video` | Keeps one hero component while supporting both media types cleanly. |
| `background_image` | Asset | Conditionally required | Image only, recommended minimum 1600px wide | Covers the static-image version and also acts as a fallback/poster for video if needed. |
| `background_video_file` | Asset | Conditionally required | MP4/WebM only | Keeps uploaded video structured and easier for developers to validate than a mixed file-or-text field. |
| `background_video_url` | Text | Conditionally required | Must be a valid approved hosted URL; use only when not uploading a file | Allows hosted video sources without combining two different input types in one field. |
| `background_is_decorative` | Boolean | No | Default `true` | Gives editors a simpler accessibility decision: is the background purely visual or does it carry meaning? |
| `background_alt_text` | Text | Conditionally required | Max 120 chars; required when `background_is_decorative` is `false` and an image is used | Supports accessible image usage when the background is not purely decorative. |
| `overlay_color` | Color picker | No | Default `#000000` | Gives a controlled way to tune contrast for different hero media while keeping the default simple and implementation-friendly. |
| `overlay_strength` | Number | No | Integer 0-80 | Small presentation control to protect text contrast without exposing too many design settings. |
| `content_alignment` | Single-option / enum | No | Allowed values: `left`, `center`, `right` | Provides controlled layout flexibility while still limiting alignment to tested design variants. |
| `theme_variant` | Single-option / enum | No | Allowed values: `light-text`, `dark-text` | Helps developers map to approved style variants without making editors manage raw colors. |

## Component: `social_proof_section`

| Field name | Type | Required | Validation / constraints | Why this structure |
| --- | --- | --- | --- | --- |
| `internal_label` | Text | No | Max 60 chars | Same editor convenience as the hero component. |
| `section_heading` | Text | No | Max 70 chars | Allows the section to work with or without a visible heading, which is useful when the surrounding page context already introduces the proof content. |
| `intro_text` | Textarea | No | Max 180 chars | Optional setup copy above the logos/testimonials. |
| `logos` | Blocks list of `logo_item` | Yes | Min 2, max 12 items | The brief explicitly calls for logos in this section, so the schema should enforce that the section is not empty. |
| `testimonials` | Blocks list of `testimonial_item` | Yes | Min 1, max 8 items | The testimonial carousel is core to the section, so it should not be optional. |
| `autoplay_seconds` | Number | No | Integer 3-10 | Optional editorial control with a safe range if the frontend supports autoplay. |
| `show_logos_first` | Boolean | No | Default `true` | Small layout preference without exposing full layout-building complexity. |

## Nested component: `logo_item`

| Field name | Type | Required | Validation / constraints | Why this structure |
| --- | --- | --- | --- | --- |
| `name` | Text | Yes | Max 50 chars | Helpful for editor clarity and accessibility. |
| `logo_image` | Asset | Yes | SVG, PNG, or WebP only | Restricts the asset formats to common logo-safe types. |
| `logo_alt_text` | Text | No | Max 120 chars; defaults to `name` if left blank | Keeps the schema accessible without forcing editors to repeat themselves for straightforward logo names. |
| `website_url` | Link | No | Must be internal or valid external URL | Useful if the logos are clickable partner/client links. |

## Nested component: `testimonial_item`

| Field name | Type | Required | Validation / constraints | Why this structure |
| --- | --- | --- | --- | --- |
| `quote` | Textarea | Yes | Max 280 chars | Prevents long quotes from breaking the carousel layout. |
| `author_name` | Text | Yes | Max 60 chars | Core attribution field. |
| `author_role` | Text | No | Max 80 chars | Lets editors add role/company in a single practical field. |
| `author_company` | Text | No | Max 80 chars | Useful when the project wants separate styling or analytics later. |
| `author_avatar` | Asset | No | Image only | Optional enhancement without making every testimonial harder to fill out. |

## Why I would handle video and image in one Hero component

I would keep one `hero_section` component and add a `background_media_type` field that controls which background input is used. That keeps the editor mental model simple because they are still editing one concept, "the page hero", instead of choosing between two nearly identical components. It also reduces duplicated validation rules, duplicated frontend mappings, and future maintenance when shared hero content fields change.

## How I would explain "Block" vs "Component" to a non-technical editor

A component is the blueprint: it defines which fields exist and what kind of content belongs there. A block is one actual piece of content created from that blueprint. For example, `testimonial_item` is the component definition, while one specific customer quote that you add into the homepage is a block instance of that component.

## Notes on modeling decisions

- Even though the content will be managed by a non-technical editor, I still prefer keeping field and component names technically consistent because that makes collaboration with developers clearer and reduces ambiguity during implementation, QA, and future maintenance.
- I made headline-style fields flexible so the same component can support text-led, CTA-only, or media-first variants without forcing editors into a single content pattern.
- Repeatable content is modeled as nested blocks because logos and testimonials are editor-managed collections.
- Validation focuses on preventing broken layouts and mismatched assets rather than enforcing design through too many fields.
