---
layout: post
date: 2019-10-09
tags: itp code_of_music
title: Code of Music - Melody Interface Analysis
---

# Kandinsky
[Kandinksy](https://musiclab.chromeexperiments.com/Kandinsky/) is a piece from the Google Creative Lab that attempts to transform paint strokes into music.

The user has a few basic controls - primarily using the mouse to paint on the canvas. Color palette selection is also provided.

Although visually the experience is quite engaging, the depth of interaction is relatively shallow.

The color palette selection is directly correlated with sound (instrument) palette, and there is no apparent rationale for the associations (eg, purple doesn't seem necessarily associated with marimba tones and green/blue isn't intuitively associated with guitar tones). The color palette could have been used to control the pitch collections, which do have intuitive associations built in - warm colors (red/yellow) for major modes, and cool colors (blue/green) for minor ones.

The character of the stroke is also only roughly correlated with the sound output. It seems that only the average height of each stroke, the x-position on screen, and whether or not the stroke forms a basic shape (circle or triangle) is used. The actual shape of the stroke itself, if it isn't a circle or triangle, is completely ignored which is a bit of a disappointment. In Know-Feel-Do terms, some parts of the "doing" don't directly correspond to "feeling" and thus confuse "knowing".

Now I'll just wait for Google to hire me...

# Ableton Live

Ableton Live's piano roll sequencer is pretty much the opposite of Kandinksy in a lot of ways. The know-feel-do loop is quite tight, with every input leading to a rapid and understandable output. However, there are still imperfections in the depth of interaction. The amount of information processing and mental model maintenance that the user has to keep in order to use the interface is quite high. The representation of notes is very low level, and only experienced users will be able to make changes to the interface "knowing" exactly what output to expect.

Aesthetically, it's not nearly as interesting and it also allows for a lot of simply bad melodic choices to be made. But that's the cost for a tool with such wide expressive range.
