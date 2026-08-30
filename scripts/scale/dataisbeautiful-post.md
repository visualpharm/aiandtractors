# Reddit post package

## Title

[OC] Reported body fat vs BMI for 2 owners of the same smart scale, 41 readings

## Body

The animation follows my 37 GE CS10H readings over 3 months. Then it adds 4 readings from another owner of the same model. Finally, the body stays fixed while I change only my profile height from 1.86 m to 1.80 m.

Full data and method: https://aiandtractors.com/ge-cs10h-body-fat-formula/

## Source and tools comment

Source: 37 readings from my Fit Profile export, plus 4 values digitized from u/WorldTallestEngineer’s replication chart using the same GE CS10H. I calculated BMI from my measured weight and 1.86 m profile height. The reviewer reported a 2.032 m height.

Combined fit: body fat % = 1.4329 × BMI − 15.733. R² = 0.99994. Mean error = 0.04 percentage points. Worst error = 0.13 points.

The animated body is illustrative. Every plotted dot is data.

Tools: JavaScript, SVG, Sharp, and FFmpeg.

Peer chart: https://www.reddit.com/r/dataisugly/comments/1w18i27/comment/p6jikqv/
