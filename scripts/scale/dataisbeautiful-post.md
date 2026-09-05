# Reddit post package

## Title

[OC] My $120 smart scale reports “measured” body fat as 1.5 × BMI − 17.5

## Body

40 readings over 3 months. The body-fat curve is the weight curve rescaled, including with socks on. Full data and method: https://aiandtractors.com/scale

## Source and tools comment

Source: 37 readings from my Fit Profile export, plus 4 values digitized from u/WorldTallestEngineer’s replication chart using the same GE CS10H. I calculated BMI from my measured weight and 1.86 m profile height. The reviewer reported a 2.032 m height.

My readings fit body fat % = 1.50 × BMI − 17.50 to the scale's 0.1-point display precision. Against a fixed 1.50 slope, the other owner’s readings fit body fat % = 1.50 × BMI − 18.45, with a mean error of 0.025 percentage point and a worst error of 0.05 point.

My 3 barefoot figures are stylized body-composition stages, not bodies scaled to exact kilograms. The anonymous figure represents the other owner. Every plotted dot keeps its CSV coordinate; repeated readings overlap.

Tools: JavaScript, SVG, Sharp, and FFmpeg. The body illustrations are AI-generated; the plotted data are from the readings above.

Peer chart: https://www.reddit.com/r/dataisugly/comments/1w18i27/comment/p6jikqv/

Discussion evidence:

- Socks returned every metric: https://www.reddit.com/r/dataisugly/comments/1w18i27/comment/p6mxkmp/
- Clothes, headphones, and phone still returned the full readout: https://www.reddit.com/r/dataisugly/comments/1w18i27/comment/p6osvdc/
- A failed measurement should fail rather than guess: https://www.reddit.com/r/dataisugly/comments/1w18i27/comment/p6k7u8g/
