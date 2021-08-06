---
layout: post
date: 2021-03-06
tags: audio deriving_harmony interactive
title: Rhythm Is Harmony
permalink: /derivingharmony/1
img: /images/alex.png
description: "part 1 of an interactive series on music theory"
published: false
---

> Music theory connects concrete, mathematical relationships to the abstract, subjective experience of music. Of course, you could also say that the math is abstract and the music is concrete! But that's all part of the fun.

> This is an interactive essay series that attempts to explore music theory like math - from the ground up, and with as few "_because some old European guy decided so_"'s as possible.

# what is a note, anyway?

Pluck this string and watch it vibrate back and forth. Notice that how long it takes for the string to swing back and forth stays the same, even as the note fades away. Shortening the string makes the string vibrate more quickly, producing a higher pitched sound.

<div id='s0_guitar'></div>

> Click and drag the string to pluck it, and change the length of the string by moving the capo on the left.

A note (or pitch) is a _vibration with a consistent frequency_.

All instruments (and all sounds) create vibration (specifically, vibration of air pressure). Whether it's strings, tubes of air, or speaker drivers, the speed, or frequency of vibration determines what pitch, or note we hear. Different instruments might have different textures or timbres - but as long as they produce vibrations at the same speed we think of them as being the same note, even though the texture, or timbre of the sounds may be different.

How fast are we talking? Sound moves fast; the lowest notes of a piano vibrate back and forth about twenty-nine times per second. The highest notes vibrate over _four thousand_ times per second. Musicians and physicists talk about these numbers using the unit "Hertz", or "Hz" for short; a pitch that vibrates 440 times per second has a frequency of 440Hz.

# frequency ratios

Okay, so if a note is just a frequency, then there are thousands (well actually, an infinite number) of possible notes: 200Hz, 201Hz, 4569.1Hz, and so on. How do musicians pick among these infinite pitches to create the sounds we hear in music?

Intuition for how extremely fast frequencies relate to each other is difficult to reason about. Instead, we can start by exploring frequencies that are slow enough to see and hear.

## pendulums and rhythm

Take a look at these two pendulums: one swings twice as fast as the other. Click the "Enable Audio" button to hear the rhythm they play, each making a sound as it crosses the dotted line.

<div id='s1_pendulum'></div>
> Use the slider to change the overall speed

This pair of pendulums stays in sync, lining up with each other precisely every time the slower one crosses the dotted line. Notice that it doesn't actually matter how fast the first pendulum moves: as long as the second moves twice as fast the rhythm of their movements remains the same.

Now take a look at a second example. Here, the second pendulum swings a bit slower: precisely three times, for every two times the first one swings. Compared to the first example, what do you notice?

<div id='s3_pendulum'></div>

This pair of pendulums is more interesting visually and rhythmically than the first, but overall it's also simple. The rhythm and swing of each pendulum repeats regularly, in a pleasant, easy to grasp pattern.

Now a third example. The second pendulum swings 1.37 times faster than the first. (I got this number from a random number generator). This pair is almost completely unpredictable-- it's difficult to discern any recognizable pattern in their movement, or when they will both line up with each other again.

<div id='s2_pendulum'></div>

## sound

<div id='s4_pendulum'></div>

How would you describe the relationship between these two pitches? They certainly sound like they belong together. In some sense, they almost sound like the same note, one just being a higher-pitched sibling to the other. Musicians call notes with a 2:1 frequency ratio _octaves_, and often name them accordingly. Remember A4 = 440Hz? Well, A5 = 880Hz, and A3 = 220Hz.

Now listen to this pair of notes; the first the same as before at 200Hz, and the second at 268Hz. The ratio of these two notes is the same as the two chaotic pendulums from the second example above (1.34:1).

_Sound widget 2_

Musicians often call notes with complex ratios _dissonant_. Typically, dissonant pairs sound harsh, or unpleasant. Of course, harshness and unpleasantness is subjective. What do you think?

Finally we'll set the second at 300Hz, mimicking the stable-but-not-completely-synchronized movement of the third pendulum example (with a frequency ratio of 3:2).

_Sound widget 3_

This pair of notes _sounds_ like the pendulum example _looks_: pleasant, stable, but also dynamic and interesting. Musicians call note pairs with this frequency ratio a _perfect fifth_.

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
