---
layout: project
title: "Thoroughfare"
date: 2017-06-09 13:40:21 -0500
img: /images/thoroughfare.png
categories:
  - project
  - feature
tags:
  - audio
  - Max/MSP
  - instrument
  - kinect
  - granular
permalink: /thoroughfare
description: "an interactive sound sculpture about transit and motion"
---

<p class='lg content-width'>Thoroughfare is a participatory sound installation designed to explore our relationship to roads, hallways, thruways, and other spaces of transit. 
</p>
<p class='content-width'>The installation, set in a sparse, indoor hallway, features sounds of the street, of New Haven cars, buses, bikers, and walkers. These sounds are triggered and manipulated by the movement of audience members through the installation space.
</p>

<iframe src="https://player.vimeo.com/video/226073417" width="640" height="480" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<br />
<iframe src="https://player.vimeo.com/video/226073462" width="640" height="480" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<p class='content-width'>
The position of the participant in the space is closely linked to the position of the recorded sound which is heard. At a normal walking pace, the rev of engines and squealing of brakes proceeds at a relatively normal speed. Several participants going at a brisk walk might trigger a cascade of rapid fire sounds. Perhaps the most engaging mode of interaction involves slowing considerably, even stopping, as the sound of the car radio or bike spokes stretch out into novel, unrecognizable textures.
</p>
<p class='content-width'>
Images from the camera are filtered and fed into Jitter's OpenCV library to detect blobs. Blob tracking is then implemented using custom Max Java objects, which output each blob's depth position to a custom granular synthesizer which uses the value as a position origin to sample audio from a set of seven pre-recorded samples.
</p>
