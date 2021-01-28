---
layout: post
date: 2020-11-01
tags: itp audiovis audio
title: MetaAudio System 1
img: /images/metaaudio.png
categories:
  - project
description: "a musical composition that generates itself"
---

<iframe src="https://player.vimeo.com/video/505501240" width="640" height="405" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

Audio-powered computational systems listen to sound, and change parameters in real time according to input audio. <a href='/tag/audiovis'>Audio visualizations</a> are great examples: in this <a href="https://vimeo.com/461617887">_Saber_</a> visualization, the audio volume influences how large each colored bar appears, as well as how much it rotates once it does appear.

![](/images/metaaudio/soundin.png)

It's also possible to create computational systems that generate audio. In <a href='/project/2016/12/20/universe.html'>_As Space Expanded, the Universe Cooled_</a> the motion of planets according to Newton's gravitational laws are translated to pitches and reverb effects. In <a href='/sketches/bounce/bounce.html'>_Bounce_</a>, the collision of balls with the ground trigger different notes. Most game sound effects could be thought of as simple audio-generating systems.

![](/images/metaaudio/soundout.png)

_MetaAudio System 1_ combines these two types of systems to create something that listens to itself to generate sound. It is a composition that generates itself, a computational system that is affected by audio input but generates audio output, creating a real-time musical dialogue.

![](/images/metaaudio/metasystem.png)

A point mass, represented by a black sphere, travels through space. The speed and angle of its travel dictate the pitch and various audio filter effects of a software instrument. The output audio of this software instrument is monitored, and its real-time frequency spectrum deforms the gravitational field of space. For instance, as lower frequencies take hold, the gravitational density of the upper-left region of space increases. The point mass is drawn toward that gravitational density; as it changes direction and accelerates, the note being played changes too. As the notes change the gravitational fields also change, again changing the direction and acceleration of the point mass, and so on and on in an endless celestial dance.

![](/images/metaaudio/software.png)

This project was created with Ableton Live, Max/MSP, node.js, meyda.js, Loopback Audio, and p5.js. View the code on github <a href='https://github.com/squidgetx/MetaAudio-System-1'>here</a>.
