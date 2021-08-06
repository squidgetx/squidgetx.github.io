---
layout: post
date: 2019-10-21
tags: itp physical_computing
title: Physical Computing - Missing Persons
collaborators:
- Jason Xu
---

![overview](/images/pcomp/mp_overview.jpg)

*Missing Persons* is an interactive installation for a haunted house environment. Participants light candles at the base of a tombstone shrine to summon the spirits lurking within.

<iframe src="https://player.vimeo.com/video/368840569" width="640" height="480" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
<p><a href="https://vimeo.com/368840569">Missing Persons - Demo 1</a> from <a href="https://vimeo.com/user59873575">Sylvan</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

# Overview

The main input to the system is the light from each of the three candles. Each candle has a photoresistor mounted behind it, embedded within the concrete tombstone. An Arduino Nano processes the input from these sensors and passes the data over a serial connection to a computer which renders visuals and audio using p5.js and p5.serialcontrol (a node.js application to handle the receiving of serial data).

Each candle, when lit, summons a ghost figure which appears visually and with an accompanied soundtrack. The ghost figure flickers both visually and sonically along with the flicker of its candle. The more candles are lit, the more they flicker thanks to a hidden fan that blows faster the more light the photoresistors perceive.

When all the candles are blown out after being lit one of the ghosts may rush toward the viewer, screaming.

# Fabrication

The main body of the tombstone is constructed using concrete paving blocks, scrap wood, and two part epoxy. The Chinese inscription is painted by hand with India Ink. Masonry drill bits and a hammer drill were essential to provide a place to embed the photoresistors. A 12V CPU fan is mounted above the candles in order to provide a way to digitally control the stability of the candle flames.

![overview](/images/pcomp/mp_drilling.jpg)

![overview](/images/pcomp/mp_closeup.jpg)

![overview](/images/pcomp/mp_fan.jpg)

# Circuitry

The circuit is relatively straightforward - each of the three photoresistors is connected to the Arduino's 3.3V power supply. Each is also connected to an analog pin, with a 10K resistor providing a path to ground. A TIP-120 transistor is used to control the fan speed with one of the Arduino's PWM pins. I found [this website](https://arduino-for-beginners.blogspot.com/2011/04/controlling-12v-fan-speed-with-pwm.html) quite helpful in figuring out the correct transistor and wiring scheme to use for the fan.

![overview](/images/pcomp/mp_circuit.jpg)

# Soundtrack

Each ghost has a unique audio accompaniment, which is modulated in volume and playback rate along with the flicker of the candle. Each accompaniment is composed of two parts - one a distorted, child's voice sample reversed, and the other an ambient pad playing in a whole tone scale for maximum creepiness.

Voice 1:
<audio controls>
  <source src="https://raw.githubusercontent.com/squidgetx/missing_persons_halloween/master/Vox1.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

Pad 1:
<audio controls>
  <source src="https://raw.githubusercontent.com/squidgetx/missing_persons_halloween/master/Pad%20Steps%201.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

Voice 2:
<audio controls>
  <source src="https://raw.githubusercontent.com/squidgetx/missing_persons_halloween/master/Vox2.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

Pad 2:
<audio controls>
  <source src="https://raw.githubusercontent.com/squidgetx/missing_persons_halloween/master/Pad%20Steps%202.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

Voice 3:
<audio controls>
  <source src="https://raw.githubusercontent.com/squidgetx/missing_persons_halloween/master/Vox3.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

Pad 3:
<audio controls>
  <source src="https://raw.githubusercontent.com/squidgetx/missing_persons_halloween/master/Bell.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

# Code

You can find the code [here](https://github.com/squidgetx/missing_persons_halloween/blob/master/script2.js).

# Reflections & Next Steps

While this project's initial form is a Halloween-themed installation piece, I think there is a lot more potential in the concept outside the domain of a haunted house-style visualization that has yet to be developed.

There are two thematic directions that could be promising - one would be turning this piece into a critical object reflecting on the disappearance of journalists and activists in China, Hong Kong, and Taiwan. Another could be a more abstract experience meditating on themes of impermanence and spirituality. I think both directions would benefit from a reworking of the system - either primarily working with sound, or some other kind of physical response. While the screen/projection based visual was effective to create ghosts for this project, the rendered visuals distract from the tombstone shrine itself as well as break immersion somewhat.

From an interaction perspective I also think that there is potential for a more fully formed arc. I'm not exactly sure what it might look like, but I did receive a lot of good feedback from our presentation. First, people are less surprised once the second candle is lit and a ghost appears. People are even less surprised when the third candle is lit and a third ghost appears. The depth of interaction is somewhat shallow - I'm not sure that I necessarily want people to be so surprised at each candle lighting that any thematic thread is lost. But some form of arc in the interaction seems like it could be a good step forward. Perhaps when more than one ghost is on screen they interact with each other in some way.
