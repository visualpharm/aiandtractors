# GE CS10H Reddit video requirements

> SUPERSEDED on 2026-09-04 by `ge-scale-user-corrections.md`. This older file mixed agent preferences with user requirements, including the short dashed line, concentric rings, and anecdote slides. It must not guide further visual changes.

## Outcome

Create a portrait animation for r/dataisbeautiful that makes one claim at a time: the GE CS10H output follows the same 1.5 x BMI rule through Ivan's recorded range, survives implausible measurement conditions, and appears again for a second owner with a small intercept shift.

The reader should realize that the device presents a formula as a measurement, so they should inspect the methodology and data rather than trust the body-composition readout.

## Approved visual contract

- Keep the exact r/dataisugly title: `My $120 smart scale reports “measured” body fat as 1.5 × BMI − 17.5`.
- Keep the GE mark and clown emoji the same visual size.
- Label the y-axis `“Measured” body fat (%)` and the x-axis `Measured BMI`.
- Keep one continuous teal formula line. Never split it.
- Plot all 37 valid body-fat readings as small dots. The export has 40 rows; 3 rows have no body-fat value.
- Keep the 3 photoreal images of Ivan, ordered lean to heavy, in a white T-shirt and dark trousers, barefoot. They are qualitative body-composition stages, not bodies scaled to exact kilograms, so do not put exact weight labels beneath them.
- Keep all 3 Ivans fully opaque. Do not fade inactive bodies.
- Change emphasis discretely between populated line segments. No moving spotlight, cone, beam, or gliding highlight.
- Introduce the anonymous second owner only after Ivan's sequence. Use the dressed silhouette already approved; do not invent age, face, or gender.
- Encode only the second owner's reported facts: 6 ft 8 in, approximately 166 kg, 4 digitized readings.
- Draw the second-owner line as a dashed, constrained 1.5-slope reference over the peer's observed BMI range. Its intercept is 0.95 percentage point lower. Do not imply that 4 digitized points independently estimate an exact 1.5 slope.
- Keep the footer exactly: `Methodology and full data set · aiandtractors.com/ge-cs10h-body-fat-formula`.
- Preserve the approved v4 opening composition and graph geometry.

## New evidence beats

Show only one short sentence at a time. Do not display Reddit screenshots, usernames, scores, citations, or fine print inside the video.

1. `Socks on. Every metric returned.`
   - Ivan: "I was expecting it to show the weight only, but voila, it measured it all."
   - Source: https://www.reddit.com/r/dataisugly/comments/1w18i27/comment/p6mxkmp/
2. `Clothes, headphones, phone. Still “measured.”`
   - Ivan: "I did it many times, weighing being dressed, with my headphones, phone, etc."
   - Source: https://www.reddit.com/r/dataisugly/comments/1w18i27/comment/p6osvdc/
3. `Bad contact should fail, not guess.`
   - Community critique: "What you'd expect in that case is a failure to measure anything ... Not simply guess based on the weight."
   - Source: https://www.reddit.com/r/dataisugly/comments/1w18i27/comment/p6k7u8g/
4. `1.5 slope reference · 0.95 lower`
   - Replication source: https://www.reddit.com/r/dataisugly/comments/1w18i27/comment/p6jikqv/

The socks and clothing observations are real-world use, not controlled trials. The Reddit proposal that the scale reuses a stored impedance value is a hypothesis and must not be presented as established fact.

## Animation order

1. Start on the approved opening image.
2. Jump the teal segment highlight between Ivan's 3 recorded weight bands while all 3 images remain fixed and opaque.
3. Show the socks and clothed-with-gadgets observations one at a time without assigning them to specific rows.
4. Show the community's concise standard: a failed measurement should fail rather than guess.
5. Reveal the second owner and the orange reference line only afterward, then hold on that comparison.

## Chart contract

- Analytical question: does the reported body-fat percentage vary independently of BMI across 2 owners and messy real-world measurement conditions?
- Takeaway: 37 Ivan readings closely follow one 1.5 x BMI line; 4 digitized peer readings lie within 0.05 percentage point of a constrained parallel reference shifted 0.95 point.
- Family and variant: relationship scatter with 2 direct-labeled regression lines and discrete segment emphasis.
- Data grain: one scale reading per point; 37 Ivan observations plus 4 peer observations.
- Palette: teal for Ivan, orange for the peer, charcoal and gray for structure. Use line style, open versus filled dots, and direct labels so color is not the only distinction.
- Surface: 1080 x 1350 MP4 and GIF for Reddit, with a static poster and QA frames.

## QA gate

- One focal change per beat.
- No caption or label smaller than the existing 18 px tick labels; evidence sentences are at least 28 px.
- No extra legend, source line, subtitle, card, glow, gradient, or decorative panel.
- Every plotted coordinate comes from the checked CSVs. Coincident readings use concentric rings around the same coordinate. Condition anecdotes never masquerade as tagged datapoints.
- Inspect opening, each condition beat, reviewer reveal, and final frame before publishing.
