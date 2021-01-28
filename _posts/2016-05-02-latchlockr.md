---
layout: post
title: "LatchLocker: Investigating Latched vs Unlatched Lock Managers in Database Systems"
date: 2016-05-02 15:34:12 -0500
img: /images/latchlockr.png
categories: project
tags:
  - code
  - cs
  - research
  - databases
  - C++
collaborators:
  - David Hatch
  - Minh Tri Pham
  - Sachith Gullapalli
  - Daniel Abadi
  - Jose Faleiro
description: "are latch free concurrency systems actually better than traditional latched systems?"
---

As multi-core systems become increasingly more common and affordable, the focus within the database management system community on scalable, highly concurrent systems is growing rapidly. Many popular database systems exhibit a throughput collapse as load and concurrency increase, even with low amounts of logical contention. Many attribute this performance hit to latch contention within the lock manager, and champion the use and implementation of a latch-free lock manager in place of the traditionally latched architecture.

However, we are doubtful that a latch free solution is both practical and necessary. Many of the studied latched systems in these comparisons suffer from poor design, exposing the system to cache coherency problems in addition to latch contention issues. There is no reason why a well-designed latch based lock manager should suffer from the same issues.

We design and implement a lock manager with fine-grained latching, reducing latch contention and cache line bouncing issues. We also implement a latch free lock manager as described by Jung et. al, as well as the latched lock manager described in their experiments. We show that under all practical scenarios, the performance of the latched lock manager exceeds or matches that of the latch-free lock manager.

<p><a href='/docs/latchlockr.pdf'>View the full paper</a></p>
[Github](https://github.com/squidgetx/latch-locker)
