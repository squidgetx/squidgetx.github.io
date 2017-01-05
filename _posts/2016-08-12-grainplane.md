---
layout: post
title: "GrainPlane"
date: 2016-08-12 23:12:42 -0500
categories: project
tags:
- code
- Max/MSP
- audio
- instrument
- interactive
---

I'm quite happy with how my [granular synthesis engine](/project/2016/01/01/granular4.html) turned out, but something was bothering me: it just wasn't very good for any kind of live performance. There are so many parameters - which is great for a studio context but I can't imagine trying to improvise or perform live with it. Even with a MIDI controller of some kind I would still only be able to reasonably change two parameters at a time.

  <p><img src='/images/grainplane.jpg'></p>

GrainPlane is my response to this problem: it's a physical interface built specifically for granular synthesis. It's more or less a mechanism for creating a one to one mapping of physical grain action in the real world (rice, beans, sand, etc.) to auditory grains. Dropping a single grain onto the surface of the instrument triggers a single audio grain to play back. Letting a stream flow onto the surface creates a more densely layered texture. I was able to get the latency down to a pretty impressive 5ms or so - it's relatively CPU heavy since all the calculations are being done at audio rate but I think it's worth it. 

<iframe src="https://player.vimeo.com/video/198137599" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<iframe src="https://player.vimeo.com/video/198137561" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

The way it works is relatively simple, and has been done before for other applications: a set of Piezo contact mics are attached to the back of the surface and this audio information is processed by the Max/MSP patch running on the computer. With the combination of audio information from multiple sources and Max's DSP engine, I can not only detect the impact of grains hitting the surface but I can also make some reasonable guesses at the grain's relative size (or speed at which it strikes the surface) as well as its approximate X and Y coordinate location on the surface.

The software interface allows you to map any of the controller features to synthesis features. Grain pitch, pan, sample source, and length are all quite fun to play with.

I got the opportunity to present this instrument at the [Audio Mostly](http://audiomostly.com/) conference in Sweden.

<p><img src='/images/audiomostly.jpg'></p>

Download paper from ACM:
<div class="acmdlitem" id="item2986419"><img src="http://dl.acm.org/images/oa.gif" width="25" height="25" border="0" alt="ACM DL Author-ize service" style="vertical-align:middle"/><a href="http://dl.acm.org/authorize?N27128" title="GrainPlane: Intuitive Tactile Interface for Granular Synthesis">GrainPlane: Intuitive Tactile Interface for Granular Synthesis</a><div style="margin-left:25px"><a href="http://dl.acm.org/author_page.cfm?id=99659085726" >Sylvan Zheng</a><br />AM '16 Proceedings of the Audio Mostly 2016, 2016</div></div>
<div class="acmdlstat" id ="stats2986419"><iframe src="http://dl.acm.org/authorizestats?N27128" width="100%" height="30" scrolling="no" frameborder="0">frames are not supported</iframe></div>

Or, download it [here](/docs/grainplane.pdf)
