---
layout: post
date: 2023-02-09
title: "Randomized Experiments Can't Always Detect Equilibrium Effects"
description: "Internal vs. external validity round 1"
tags: writing  causality
blog: true
img:
---

# 1. RCTs, Causal Inference, and Internal and External Validity

## (you can skip this section if you know any of the above words)

RCT (randomized controlled trials) are considered the gold standard in social science for determining causal effects - that is whether some intervention or treatment caused a change or outcome Y. The idea is pretty basic. You randomly split your participants into two groups, give one of them treatment, measure outcomes and argue that the average difference[^1] between the groups represents a causal effect, since there's absolutely no reason to expect that the groups are different from each other in any meaningful way (because they were assigned randomly).

Tech companies have taken this idea and run with it. Facebook is famous for running thousands of experiments on its users simultaneously all the time. Maybe 1% of users are seeing more posts from friends in their news feed compared to everyone else. After two weeks, the team running the experiment will look at some metrics like time spent scrolling News Feed, or number of likes or comments written. If people who see more posts from friends spend more time on Facebook, they'll roll out the change to everyone. This is roughly how Facebook, and many other companies, "optimize" their product: someone dreams up a change, engineers build it, it gets tested for a bit, and then if the metrics look good it gets shipped.

Curiously, in the social sciences many academics would say that a "single experiment is not enough to determine policy," which is precisely what tech companies use RCTs for (and increasingly NGOs and governments when evaluating policy programs![^2]). The concerns from academics usually boil down to something called "external vs internal validity." Internal validity refers to the idea that the effect of the treatment is accurately estimated _for the people in your experiment._ Most RCTs have near-perfect internal validity. External validity, on the other hand, refers to the idea that the _results of the experiment generalize to a larger population_.

There are a bunch of reasons why external validity might be dubious in an RCT. For example, if you only did your experiment on young women, one might be suspicious that the effects generalize to older men. In this post, I want to focus on a specific kind of external validity violation, which is actually a risk for many experiments.

# 2. Equilibrium Effects

## a risk for interpreting the results of any experiment to inform policy

The Heisenberg effect (which roughly says that one cannot know both the position and momentum of a particle at a given time) is popularly confused with the observer effect, which says that the act of measuring [the position or momentum of a particle] will actually mess with the position or momentum of that particle, since there's no way to measure something without actually interacting with it.

In a similar way, it's often impossible to know the equilibrium effect of rolling out a treatment to a large audience based on a randomized experiment involving a smaller sub-audience. This is because for most people in the actual world, the status quo hasn't changed, even if it's different for people participating in the experiment.

Call your treatment Z. By construction, everyone in your experiment lives in a world where not-Z is the norm. Your experiment randomly gives Z for half the actors in your experiment. But importantly, you can only measure the effect of "having Z when most people have not-Z." This is a different effect of "having Z when everyone else also has Z," which would be the case if you were to "roll out" the policy globally.[^3]

In medicine, this kind of effect doesn't really matter. Someone's reaction to a specific type of surgery doesn't really change if a bunch of other people suddenly get access to that same type of surgery. But in social science, where we study behavior of people, this kind of effect _can matter a lot_[^4]. This is because people in the world react to policy changes around them.

Maybe an experiment shows that increasing the amount of video in News Feed improves time spent on Facebook. Let's say that it's because most of the videos posted to Facebook are actually pretty good and interesting videos, and people like good, interesting content. You roll out the change to 100% of users. Media companies and influencers realize that if they post a video, it's going to get boosted in feed. Suddenly, tons of content is being produced in video form. A lot of it is actually kind of terrible - it would be better as a news article or a photo. User welfare is actually worse than before, and people start using Facebook less because they're sick of all the crappy video content.

One way to think about it is that by rolling out the change, you change the "game" (in the game theoretic sense) of the environment, and that the natural equilibrium actions of the actors within your environment will also change. When you run a randomized experiment, it's really hard to structure it such that the "policy environment" equilibirum shifts at the same time, because by definition you're not actually changing the policy environment for everyone.

[^1]: Technical note: other estimators for the causal effect exist but for clarity and simplicity I'll only discuss difference-in-means here
[^2]: Citation needed. Maybe a good topic for a follow-up post!
[^3]: Careful readers will note that the Heisenberg effect is not really the most commesurate analogy. I am open to suggestions for other names. "Policy Environment Equilibrium Effect" doesn't really have the same ring to it.
[^4]: Antibiotic performance is a pretty good counter-example from medicine. The experiment tells you that antibiotics are great, when the status quo is not-very-much antibiotics. But if everyone gets antibiotics, then we breed super-bacteria that are resistant to antibiotics. This result is completely unpredicted by the randomized experiment.
