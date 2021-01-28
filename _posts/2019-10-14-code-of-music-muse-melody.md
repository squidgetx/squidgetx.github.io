---
layout: post
date: 2019-10-14
tags: itp code_of_music audio
category: project
img: /images/muse.png
title: Muse
description: "generating music From text"
---

# Introduction

[Muse](/webmedia/muse/index.html) is a prototype of a text-to-music web application based on Tone.js, RiTa.js, and ML5.js. It attempts to use various features of user-provided input text to generate melodies and a basic harmonic accompaniment. It works best with inputs that resemble short pieces of poetry.

The full code can be found [here](https://github.com/squidgetx/squidgetx.github.io/blob/master/webmedia/muse/script.js)

<iframe src="https://player.vimeo.com/video/366646170" width="640" height="480" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
<p><a href="https://vimeo.com/366646170">Muse: Generating Music From Text</a> from <a href="https://vimeo.com/user59873575">Sylvan</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

# Goals

I wanted to start incorporating more advanced statistical and machine learning concepts into my sound practice, and I thought that NLP would be a particularly rich domain to start with, as language encodes complexity that probably eclipses that of conventional musical arrangements. Lanuage, and particularly poetry however, has a rich tradition of conversational back and forth, which I noted in [this brief Frownland analysis](/2019/10/09/code-of-music-melody.html).

# Inputs and Outputs

## Pitch Set

To begin with, each word in the input is given a word2vec vector representation. Next, the centroid is taken by averaging all non-article or symbol vectors. The medioid is found by taking the vector with the closest cosine proximity to the centroid. Cosine proximities with the medioid are assigned to all words. Finally, the resulting set of cosine proximities is converted to a pitch set by defining the pentatonic scale as "close tones", the remaining major scale notes as "medium tones", and the remaining 12 tones as "far tones" and then mapping the vector set onto that definition.

The main objective in using this approach is that I wanted to preserve the 'consonant' and 'dissonant' properties of text in the resulting melody. Words that don't "go together" should produce strange sounding melodies, while words that we are used to seeing with each other should produce relatively boring, familiar melodic tropes.

## Assigning Pitches

A pitch skeleton is constructed using all nouns and verbs in the input text. Each word is assigned a pitch again according to its cosine proximity to the medioid. This time the similarity is used to determine the consonance of the pitch within the given pitch set: highly similar tones are assigned pitches closer to the typical major or minor triad, while further out tones might receive the seventh, second, sixth, or fourth scale degrees.

## Assigning Rhythms

The parts of speech and syllable are used to generate rhythms in a relatively naive way. Conjunctions and articles are given short shrift, punctuation marks pauses, and longer words are given longer durations.

## Assigning Harmonies

The harmony engine just tries to find a relevant chord at each noun that matches as many of the pitches until the next noun as possible. The chord space follows a relatively basic T/TS => PD/D => D => T/TS shape, which really helps set some of the stranger melodies in a functional harmonic context.

# Reflections

Thanks to a good amount of time spent tweaking the specific rhythm rules and harmony rules, the output is relatively interesting and preserves some of the meter of common poem and sentence structures quite well. Although it was fun learning how to use word2vec and manipulate tfjs tensors, I am skeptical that this approach is the best in terms of preserving the somewhat subjective properties of text consonance or dissonance. A markov chain or other predictive structure might be the best structure here, as it would be able to preserve the "order" at which surprising pitches arise.
