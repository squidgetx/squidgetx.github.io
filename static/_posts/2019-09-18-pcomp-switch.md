---
layout: post
date: 2019-09-15
tags: itp physical_computing process
title: PComp - A Candle Driven LED
---

## Overview

The creative portion of this week's physical computing lab is to build a "creative switch" out of some kind of "everyday action" to control the turning on and off of an LED. I decided to see if it was possible to use a candle to open and close the LED circuit. An unlit candle and lighter (or match) is a strong signifier, to borrow from the interaction literature - people from all cultures are familiar with the act of lighting a candle. The lighting (and extinguishing) of a candle also is itself already a switch of sorts, one that transitions from darkness to a state of warmth and light.

## Process

For a more complex project I would use a light or heat sensor and microprocessor controls, but for this specific piece I wanted to stick to the spirit of the lab and find a way to use the candle to trigger the contact of two conductive plates. I played with the idea of trying to embed an electric lead inside the wax body of the candle, and eventually having the lead make contact with a conductive foil at the candle's base. However, despite the potential advantage of being able to encase the entire mechanism inside / underneath the candle, I was worried about the reliability of this method (combined with the fact that testing it would require many hours to wait for many candles to burn out).

After some further research I stumbled upon this [instructable](https://www.instructables.com/id/How-To-Convert-Fluorescent-starter-to-Thermal-Swit/) which I shamelessly copied for the primary operation of the switch. The key insight is that strips composed of two different metals (bimetallic strips) bend when heated, since the two metals expand at different rates but are welded together. Flourescent starters, cheap and easily available at the local hardware store can be disassembled with some careful knife-work to reveal a tiny bimetallic strip and conductive lead exposed. I then mounted this above the candle using a scrap arm assembly and tape.

![Close up of switch taped to arm](/images/switch-closeup.jpg)

The second primary challenge is that I wanted to invert the effect of the switch - the LED should turn on when the candle is out and turn off when the candle is lit. This way the viewer is presented with a choice between the "analog" and "digital" modes of lighting. The candle of course, even when lit, would eventually burn out so it is also possible to view the work as a comment on the mechanical inevitability of electric lighting, and by extension, electric modes of life.

I achieved this by adjusting the wiring such that when the switch is closed, it creates a path that with zero resistance in parallel with the LED, diverting all the current and turning the LED off. When the switch is open, the path is broken so current is forced to pass through the LED and turn it on. This is a somewhat inefficient method since it means that the circuit is consuming power even when the LED is off, but I didn't want to make the circuitry more complicated than it needed to be for this prototype.

![Switch diagram](/images/switch_diagram.png)

<iframe src="https://player.vimeo.com/video/360892201" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
## Drawbacks and Next Steps

Although the candle switch functions more or less as intended, this prototype comes with its fair share of drawbacks. The video shows one of these - that is that after the candle is blown out the bimetallic strip takes a few seconds to cool down enough disconnecting. Additionally, the strips seem to have an extremely limited lifespan. The first flourescent starter developed a blackened exterior after a few test runs with the candle and appears to have lost its conductivity. Finally, the presentation of the prototype leaves something to be desired. Housing the electric light within a lamp apparatus, or otherwise concealing the circuitry could add a lot to the aesthetic and communication of the concept.
