---
layout: post
date: 2021-03-06
tags: audio deriving_harmony interactive
title: Deriving Harmony 1 - Frequency Ratios
permalink: /derivingharmony/1
img: /images/alex.png
description: "part 1 of an interactive series on music theory"
---


> Music theory connects concrete, mathematical relationships to the abstract, subjective experience of music. Of course, you could also say that the math is abstract and the music is concrete! But that's all part of the fun.

> This is an interactive essay series that attempts to explore music theory like math - from the ground up, and with as few "*because some old European guy decided so*"'s as possible. Therefore, this series should provide an illuminating perspective for those with some formal music training and educational introduction for those without.

# part 1

*"What is a note and how do notes fit together?"*

# what is a note?

Imagine a guitar string being plucked. The string vibrates back and forth. These vibrations are transferred to the body of the guitar, then to the air and into our ears.

<div id='s0_guitar'></div>

> Click and drag the string to pluck it! You can also change the length of the string by dragging the capo on the left.

What makes a note sound high or low? Guitar players use their fingers and frets to change the length of the strings, playing lower notes with longer strings. Longer strings vibrate more slowly, while shorter strings vibrate quickly (Thicker strings also vibrate more slowly than thin strings). It's the *speed of vibration* that defines what note, or pitch we hear. 

All instruments (and all sounds) create vibration, whether it's through the vibration of strings, speaker drivers, or drum heads. Whether notes are plucked, bowed, sung, or synthesized, if they vibrate at the same speed we think of them as being the same note, even though the texture, or timbre of the sounds may be different.

How fast are we talking? Sound moves fast; the lowest notes of a piano vibrate back and forth about twenty-nine times per second. The highest notes vibrate over *four thousand* times per second. Musicians and physicists talk about these numbers using the unit "Hertz", or "Hz" for short; a pitch that vibrates 440 times per second has a frequency of 440Hz. 

# frequency ratios

Okay, so if a note is just a frequency, then there are thousands (well actually, an infinite number) of possible notes: 200Hz, 201Hz, 4569.1Hz, and so on. How come there are only eighty-eight keys on a piano, and how did they decide what frequencies to put there? Why do some notes, or frequencies sound good together, and others sound bad together? 

Intuition for how extremely fast frequencies work together is difficult for me to wrap my head around, so instead I like to slow it down until we have a vibration that I can hear as rhythm.

## pendulums and rhythm

Take a look at these two pendulums: one swings twice as fast as the other. Click the "Enable Audio" button to hear the rhythm they play together.

<div id='s1_pendulum'></div>

This pair of pendulums stays in sync, lining up with each other precisely every time the slower one completes its oscillation. Notice that it doesn't actually matter how fast the first pendulum moves: as long as the second moves twice as fast the rhythm of their movements remains the same.

Now take a look at a second example. Here, the second pendulum swings a bit more slowly, at 1.37 times per second. (I got this number from a random number generator). Compared to the first example, what do you notice? This pair of pendulums is more unpredictable-- it's difficult to discern any recognizable pattern in their movement, or when they will both line up with each other again.

<div id='s2_pendulum'></div>

Now in the third example, the second pendulum swings 1.5 times per second. It lines up with its partner a bit less consistently than the 1Hz vs 2Hz example, but it's certainly more stable than the last example. Every two back-and-forths of the first pendulum, the second goes back-and-forth three times.

<div id='s3_pendulum'></div>

You can set different values for the second pendulum's frequency. Are there any others that seem to create more stable swinging patterns?

## sound

Let's speed these up to audible levels. Instead of a pair of pendulums, we'll use a pair of frequency generators. First we'll set the two frequencies in a 2:1 ratio; 200Hz vs 400Hz. 

*Sound widget 1*

How would you describe the relationship between these two pitches? They certainly sound like they belong together. In some sense, they almost sound like the same note, one just being a higher-pitched sibling to the other. Musicians call notes with a 2:1 frequency ratio *octaves*, and often name them accordingly. Remember A4 = 440Hz? Well, A5 = 880Hz, and A3 = 220Hz.

Now listen to this pair of notes; the first the same as before at 200Hz, and the second at 268Hz. The ratio of these two notes is the same as the two chaotic pendulums from the second example above (1.34:1).

*Sound widget 2*

Musicians often call notes with complex ratios *dissonant*. Typically, dissonant pairs sound harsh, or unpleasant. Of course, harshness and unpleasantness is subjective. What do you think?

Finally we'll set the second at 300Hz, mimicking the stable-but-not-completely-synchronized movement of the third pendulum example (with a frequency ratio of 3:2).

*Sound widget 3*

This pair of notes *sounds* like the pendulum example *looks*: pleasant, stable, but also dynamic and interesting. Musicians call note pairs with this frequency ratio a *perfect fifth*.

Most "simple" ratios (2/3, 5/4, 5/6, and so on) sound stable similarly to how their corresponding pendulums look stable, and are often named in classical music theory traditions. These ratios form the building blocks of most musical systems. More "complex ratios" sound more dissonant, and tend to be used more sparingly.

# conclusion

There's an intimate link between the stability of a rhythm pair and the consonance of a pitch pair - it's all about the underlying ratio of frequencies. How incredible is that? The intuitive concepts of "simplicity" and "stability," translated into small-number ratios, bear out perceivable, physical relationships that undergird the entirety of most musical cultures.

In the next part of this series, we'll explore the limitations of this conceptualization (sneak peek: the ratio 321/320 seems like it should sound really dissonant, but instead it just sounds like 320, with a bit of fuzz), and take a look at how the dominant note system in Western music utilizes (and fails to utilize!) these ratios. 

## additional resources

[Polyrhythms are Polypitch - Adam Neely (video)](https://www.youtube.com/watch?v=-tRAkWaeepg)

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.12/Tone.js"></script>
<script src="/lib/util.js"></script>
<script src="/lib/deriving_harmony_1.js"></script>