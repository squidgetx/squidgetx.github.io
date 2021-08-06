---
layout: post
date: 2019-11-21
tags: itp code_of_music physical_computing chordal_distance
title: Chordal Distance - Interaction Analysis
collaborators:
- Young-Min Choi
---

*Chordal Distance* is the working name of the interactive composition / performance tool I am building with Youngmin Choi for this semester's Code of Music and Physical Computing final project. This post attempts to use some of the ideas from Bill Verplank's [interaction design sketchbook](http://www.billverplank.com/IxDSketchBook.pdf) to analyze/refine the concept thus far.

# IDEA
The project has two main ideas that could be viewed as separate components. The first perspective is that of an interactive composition - a musical experience facilitated by the audience's own physical interaction. The second perspective is that the project is a performance tool / instrument, and the composition is merely a demonstration of the tool's capabilities. Of course, in reality the final product will be a mix of both - we will design the physical interface and its mappings with both use-cases in mind. Ideally it will be a tool suitable for use on stage as well as in an installation or demonstration setting.

# ERROR
The motivation for the idea comes from perceived shortcomings in both modern musical interfaces and interactive musical experiences. If we go back to the *dimensions of musical interaction* metaphor we see there are seven axes that a musical interface might exist on:

- Role of Sound:
- Required Expertise:
- Musical Control:
- Degrees of Freedom:
- Feedback Modalities:
- Inter-cators:
- Distribution in Space:

I want to primarily focus on Musical Control, Degrees of Freedom, Feedback Modalities, since we are primarily concerned with *expressive sound*, equired expertise is almost always *correlated with musical control/degrees of freedom,* and distribution in space is typically stereo or single point origin for typical devices. I also will redefine degrees of freedom *as it relates* to each component of musical control available, and redefine musical control to be a fixed set of categories including pitch, articulation, and timbre. Looking at some common realtime interfaces/instruments we can see that the overall space is incredibly poorly explored.

- Violin: note/articulation level control, high degree of freedom. High level of haptic feedback.
- MIDI keyboard: note/articulation level control, moderate degree of freedom. Moderate level of haptic feedback, varying by specific brand
- Google Music Lab Experiments: note level control (no articulation usually). Low degree of freedom. Visual feedback
- GroovePizza: note level control (no articulation). Low degree of freedom, Visual Feedback
- Tonnetz: note/chord level control (no articulation). Moderate degree of freedom
- Music Video: song level control, incredibly low degree of freedom (on/off)
- DJ software: song level control, moderate degree of freedom

The question for me motivating this experiment is whether we can create an interface whose musical control abstraction level in between note level and song level and simultaneously allows for a high level of freedom.

# METAPHOR
The primary metaphor is tension - the core of a musical story (or any story, for that matter) is tension and release, balance and imbalance, stability and instability. This metaphor will be realized physically with string/ropes that the user can control the tension of with their body.

# SCENARIO / MODEL
The main scenario as described in IDEA is either a performance or installation space.

The model is that two participants/performers will be connected physically - each holding a handle connected by a rope or string. They will be able to physcally manipulate the level and character of the tension between them by pulling against each other, and thus indirectly manipulate the musical tension being articulated thorugh speakers and computer sound system placed in the performance/installation space

# TASK
1. Setup
2. Explore
3. Pull!

# DISPLAY
The display needs some refinement, though we have narrowed the options somewhat. We know that for the installation setting we want to articulate the space in which the experimentation will take place, to encourage the participants to stand at the appropriate distance to create tension.

Current working models for display are:
1. Instrument simply positioned on a table in front of the demarcated space
2. Each handle suspended in the air

# CONTROL
See Scenario/Model
