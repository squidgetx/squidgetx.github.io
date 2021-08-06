---
layout: post
date: 2019-10-09
tags: itp code_of_music
title: Rearranging "Frownland" - Concept
---

# Analysis

"Frownland" has been a particular obsession of mine over the last few weeks. It's a piece that makes no sense, yet makes perfect sense. In dissecting the melody, I had the good fortune to come across this video by composer Samuel Andreyev breaking down the track. His ear is much better than mine.

<iframe width="560" height="315" src="https://www.youtube.com/embed/-FhhB9teHqU?start=1070" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The crazy thing about the first few seconds of *Frownland* is (or is not) that the melodies are particularly strange. The melodies are in fact quite diatonic - the first guitar and bass together play a pattern of
```
A---G-------A-G-A-G-E-E-
```
with accompaniment of C and D underneath. Meanwhile, the second guitar plays its own melodic phrase using largely the same notes (and adding in an F). This collection of pitches (C, D, F, G, A) all comes from C major, and could be interpreted as spelling C6/9, G9/C, or other jazzy variations. The difficulty in listening to this piece comes from the fact that the second guitar is playing in a completely different metric scheme from the first guitar. But one thing the two melodies do have in common is that they both follow the same higher level theme of call and response.

# Designing an Interface

So what kind of interface could be useful to play with what we have discovered here? Ableton Live, my usual tool of choice for sketching musical ideas, is difficult to work with where polymeter is concerned.


Ideally we would want multiple ways of expressing and contrasting high level melodic ideas against each other to explore the various combinations and how they mesh together (successfully, or not).

The user should be able to control:
- Pitch collection (for traditional Frownland, they might specify C major, or simply (C-D-F-G-A)?)
- Melody shape 1
- Melody shape 2


To develop this idea further we need to pin down what we mean by shape. In the initial analysis I called both melodies "call and response" patterns.

> "imagine the piece as a series of disconnected events"

So perhaps the user can choose different representations of melodic components, and "arrange" them together into a series of calls and responses. It would be nice to work visually, but outside the step sequencer. This gets at an attempt to translate visual shapes or strokes into melody, which has been attempted by many artists in the past (including Google's creative lab piece [Kandinksy](https://musiclab.chromeexperiments.com/Kandinsky/)).

One approach could be to simply overlay the strokes onto a sequencer layout hidden from the user. This is probably the most straightforward way of doing it, although some more interesting computer vision techniques could be usable here to make something more nuanced.
