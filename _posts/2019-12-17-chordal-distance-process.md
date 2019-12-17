---
layout: post
date: 2019-12-17
tags: itp code_of_music physical_computing chordal_distance audio
title: Chordal Distance - Process
collaborators:
- Young-Min Choi
---

This page serves as the primary process documentation for *CHORDAL DISTANCE*. See [this page](/2019/11/21/chordal-distance.html) for the main project page.

All code for this project can be found [here](https://github.com/squidgetx/chordal_distance)

# 1. Concept / Ideation

We were initially interested in this idea of combining collaborative, metaphorical friction with music initially articulated [here](/2019/10/29/pcomp-final-ideation.html#1-collaborative-musical-instrument). However, we struggled at first to settle on a physical metaphor that captured this idea elegantly.

Our initial list of ideas included a table you had to push down on, a set of large boxes that needed to be pushed around a space, a rusty turn-crank music box, and a ceiling-to-floor string installation whose strings would be tugged or pulled on by the participants. However after some initial prototyping we realized that many vertically oriented string installations look very much like a harp; a preexisting strong musical concept that people would inevitably be familiar with, a familiarity which lead to confusion in early testing.

We were particularly interested in the simple two player interaction of tug of war, but couldn't come up with a elegant physical metaphor that allowed more than two players to participate. We decided after a few days of unsuccessful sketching to keep the project minimal and restrict it to two players.

# 2. Initial Prototype

We decided to start with two handles attached by rope. I quickly built a rough pair of handles which we could use for testing.

![Image of rough handles](/images/picture_of_handle)

In our first official playtesting session we confirmed that people really did enjoy the pairwise tension-modulating interaction. We also observed that many people liked to move the handles very quickly in many directions, something that we hadn't considered. Movement outside of the tension in the connecting band would be something that we logged as something to pay attention to.

Our initial test used a 50kg load cell as we wanted to be sure that our piece could sustain the high level of force that we were hoping people would want to place on it. However, after calibrating the load cell and doing a stress test we found that 10-11kg was already near the maximum amount of force that the two of us could exert on each other. We figured that we would be able to use a much more compact 20kg load cell for our final piece.

# 3. Enclosure Design

We wanted an enclosure that served several functions at once - it needed to contain at most a 20kg load cell, an HX711 board, an Arduino Nano microcontroller, a 1200mAh LiPo battery, a battery charging port, and a power switch for the whole system. The enclosure also needed to provide a secure mounting point for the string between the two handles as well as overall be sturdy enough to withstand relatively abusive handling. The enclosure also needed to provide a comfortable gripping point. Finally, we also wanted the enclosure to be aesthetically pleasing!

We struggled to come up with a design for an enclosure with an attached handle that didn't recall pre-existing-but-irrelevant shapes such as telephones, door handles, bananas, or dog leashes. The crude but confident lines of our prototype felt like a package deal - if we slimmed down or refined the shape of the prototype it would immediately bear a stronger resemblance to *some* designed product-with-handle. We wanted a shape that was elegant, that was comfortable to use and suggested pulling in its own shape. We began to explore the possibility of merging the handle and enclosure together - what if the handle itself *was* the enclosure?

After many hours of carefully measuring our electronic components and laying out the possibilities in Rhino we felt confident that we would be able to fit all the components inside of a shell that was still comfortable to hold in hand. Youngmin additionally designed a clever attachment mechanism for the handle - to avoid having to unscrew the enclosure each time we needed to access the insides the lid slides onto the body with a simple friction-fit.

We bought a cheap piece of 2x3 red softwood stud to start our second prototype. Aidan Lincoln incredibly generously helped us learn how to use the CNC shopbot to carve out our exact design in the wood.

![image of cnc'd wood]()

# 4. Bluetooth / Software Architecture

I used @abandonware's fork of Noble [link](https://www.npmjs.com/package/@abandonware/noble) to manage the bluetooth connections. One incredibly time consuming bug is that the bluetooth connection drops out intermittently. We eventually managed to mitigate this by removing all delays from the Arduino controller.

The Node.JS server receives bluetooth messages before forwarding them through an OSC socket to Max/MSP. Max then performs the relevant processing of the raw sensor data and passes MIDI messages to Ableton Live, which ultimately synthesizes the sounds.

# 5. Sound Design / Composition

We used a mix of string samples, analog patches, and physical modelling synthesis patches for this iteration of sound. We chose these sounds primarily to match the wood-and-rubber aesthetic of the sculpture.

# 6. Installation

We wanted our installation to reinforce the sonic, visual, and interaction aesthetics of the piece. The interaction (feeling ebbs and flows in tension), along with the sound (dense layers of organic sounds) is subtle and detailed. While we considered simply presenting the pair of handles on a table, creating a suspended installation helped to frame the piece as a more delicate, intentional artwork as opposed to a purely expressive instrument.

We built simple wooden boxes which each contain a pair of retractable dog leashes. The lower box contains a brick for weight and rubber feet for additional friction.
