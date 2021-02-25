---
layout: post
date: 2019-09-24
tags: itp code_of_music audio
title: Rhythm Platform
img: /images/platform.png
dlink: /sketches/rhythm_platform
category: digital
description: use platform physics to make drum sounds 
---

<a href="/amusements/bounce2/index.html"><img class="cover-sm" src="/images/platform.png" /></a>

# 1: Rhythm Interface Concept Sketches

Ethan Hein has written a series of fascinating articles on [music pedagogy](http://www.ethanhein.com/wp/my-nyu-masters-thesis/the-problem-why-are-so-many-young-people-alienated-by-music-class/) and [common rhythm interfaces found in software](http://www.ethanhein.com/wp/my-nyu-masters-thesis/visual-metaphors-for-music-in-software/). Ethan goes on to build Drumloop, a circular sequencer as the practice of some of the theory he discussed in earlier links. There is still more room for exploration in the domain of nontraditional rhythm interfaces.

Sequencers have a fundamental visual flaw - they make it extremely hard to visualize or conceptualize musical gesture. Each onset is given equal visual weight, for the most part, and spatial relation is most often used to articulate differences in pitch or instrumentation. Additionally, interacting with sequencer-like interfaces is not particularly engaging - you have to click a lot. Finally, sequencers tie the creator way too closely to the grid system. Polyrhythm, swing, and other microtimings are clunky even in professional grade audio software.

So, are there opportunities to use other visual metaphors to conceptualize, manipulate, or interact with rhythm?

![](/images/com_sketches.jpg)

1. Bouncing balls: The human mind is surprisingly agile when it comes to predicting trajectories of projectiles. An interface that manipulates regularly spawning balls which then bounce on drumpads positioned loosely in space could capture a rhythmic "gesture" in a different way than most traditional interfaces while still allowing for recognizable rhythm creation
2. Inscribed polygons could be a unique way of representing polyrhythm, and a good way to visualize where the different onsets exist relative to each other. This presents a few challenges from the interaction perspective however since it would be difficult to select the individual shapes.
3. Gears that affect each other spinning has been an idea explored in other interfaces. This allows flexibility in polymeter in addition to polyrhythm, but loses some advantage in being able to cleanly visualize interactions between rhythmic patterns.
4. A physical interface with evenly spaced pegs and a conductive rubber band could be a good, tactile way of blending geometric rigidity with some flexibility. Software point and click interfaces such as Groove Pizza or traditional sequencers lack a clean way to manipulate elements freely. Hands in physical space could easily lift, stretch, and reposition a rubber band across conductive pegs.

# 2: Rhythm Platform

[Rhythm Platform](/amusements/bounce2/index.html) is a realized interpretation of idea 1. from above using p5.js and tone.js.

<iframe src="https://player.vimeo.com/video/362321098" width="640" height="480" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
<p><a href="https://vimeo.com/362321098">Rhythm Platform - 4/3 Grooves</a> from <a href="https://vimeo.com/user59873575">Sylvan</a> on <a href="https://vimeo.com">Vimeo</a>.</p>
