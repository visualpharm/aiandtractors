# GE CS10H: Ivan's visual requirements

Reconciled against Ivan's actual messages on 2026-09-04. User corrections are authoritative; agent critiques are not requirements.

## Current deliverable

Ivan approved the restored still and requested video on 2026-09-04: "make the reference dots more visible", "let's not do this guy orange", and "a video where it highlights different sections of the graph and different body shapes". Render with `node scripts/scale/generate-dataisbeautiful-animation.mjs --approved-animation`.

Keep the approved composition. Increase point size and outline contrast. Recolor the existing peer silhouette charcoal through a rendering filter, preserving its outline. Use four stationary three-second highlights: lean, middle, heavy, reviewer. The reviewer and second full parallel line enter in the fourth state. Preserve all three Ivan images at full opacity throughout.

## Asked versus implemented

- "It was a nice parallel graph": two complete, solid parallel lines across the same axes. Both mathematical reference lines use slope 1.5.
- "3 pictures of myself": approved three photoreal images of Ivan, lean to heavy, barefoot, white shirt and dark trousers.
- "Don't make semi-transparent": all three images fully opaque.
- "Make the same silhouette for both person and the clothing": only the reviewer is a large anonymous clothed silhouette; reuse the approved asset.
- "The same stripe for the segment of the graph and the highlighted person": one flat neutral stripe continues from the peer's graph segment behind the silhouette. No white image rectangle.
- "It shouldn't be gliding": stationary highlight for the still, discrete changes in any later animation.
- "All tiny data points": 37 Ivan points and 4 peer points at actual CSV coordinates. Coincident points overlap. No jitter, concentric rings, or dispersion clouds.
- "Title must be from the first post": `My $120 smart scale reports “measured” body fat as 1.5 × BMI − 17.5`.
- "GE and an emoji of the clown of the same size": approved assets at matching dimensions.
- "Quoted the word measured": y-axis `“Measured” body fat (%)`; x-axis `Measured BMI`.
- "Radically decrease the amount of text": title, axes, requested methodology URL. Remove exact body weights, reviewer measurements, slope-offset annotations, and added slogans.
- "URL, label it methodology and full data set": `Methodology and full data set · aiandtractors.com/scale`. Ivan requested a short redirect on 2026-09-04; `/scale` redirects to the full article and leaves `/scale/` media assets accessible.

## Later animation

Begin with Ivan's three fixed images and the single teal line. Change the shared highlight between populated segments and corresponding figures. Introduce the reviewer and second full parallel line afterwards. Researching Reddit comments did not authorize replacing the title with anecdote slides. The requested still was shown and video creation is now explicitly authorized.

## Analytical implementation

Complete lines are mathematical references; observed points retain their raw coordinates. The peer reference uses slope 1.5 and intercept -18.45, not an unconstrained slope estimate. Keep this implementation detail in the methodology, not added image text.

## Review rule

Final publication correction: match the reviewer's full line and active dots to the silhouette's charcoal (#333b42), and constrain the top of his neutral highlight stripe to his observed BMI range, connecting it to the same figure band. Preserve everything else. The authorized upload is cs10h-parallel-animation-v7.mp4. Reuse the original r/dataisugly body and title, adding only the required [OC] title tag and source/tools comment.

Check geometry, supplied assets, order, opacity, coordinates, and wording against the requests above. Do not silently redesign an approved choice to satisfy reviewer preferences.
