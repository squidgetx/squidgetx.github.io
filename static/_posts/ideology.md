---
layout: post
date: 2023-04-24
title: "On classifying within-outlet ideology"
description: ""
tags: writing research-log
blog: true
img:
---

I've been spending the last week or so diving into the literature on automated classification of political text ideology. Tweets, congress speeches, news articles, editorials, etc - there's a growing literature on using machine learning algorithms and text-as-data techniques to label these types of documents as liberal/conservative or left/right leaning (and sometimes centrist).

My application is to understand whether NYT op-eds become less conservative after the Tom Cotton fiasco and subsequent resigning of opinion editor James Bennett. I honestly thought it would be pretty low hanging fruit to make a first cut at this analysis. Surely someone would be able to offer a pre-trained classifier, or at least a healthy corpus of labeled political text, and we could get to work cranking this one out (and quickly move on to the thornier problem if figuring out if this incident - or subscriber revenue models writ large - _cause_ editorial polarization. But I digress.) It turns out this is actually a way more complicated question than I initially anticipated.

Many authors use congressional texts as the training set to build a supervised learning classifier (Gentzkow and Shapiro, 2019). The classification task is technically predicting whether or not a given piece of text is more likely to have been spoken by a congressional Republican or Democrat. There some distinct advantages to this approach, namely that all the congressional record is digitized and generally accessible, automatically labeled (since you just associated the party of each congressperson to each document), and covering a wide range of political and social issues. Out-of-sample performance on a test-set of speeches using a linear support vector machine model performs very well - F1 scores over 0.8.

However, running this classifier on a sample of NYT op-eds yields horrendous results - almost every op ed is classified as Republican. Some naive domain transfer techniques may help here - the next step would be either using Platt scaling to extract class probabilities with SVM, or using LASSO and a basic logistic regression to obtain continuous 0-1 ideology estimates which I could then calibrate with a small labeled set of NYT op-eds.

Taking a step back though, I'm a little skeptical that this approach actually will work to identify the kind of variation I'm looking for. This approach has been used fairly successfully to categorize the slant of entire outlets or journalists' bodies of work, but I'm less confident that it can be used to identify within-outlet variation. In particular, it's not obvious to me that "conservative" NYT op-eds generally resemble congressional Republican speeches.

[Authors] assess the performance of a similar classifier trained on the congressional record in correctly distinguishing Salon (a liberal outlet) to TownHall articles and note that performance degrades significantly compared to within-domain performance (ie, on the test set of congressional speeches). Even more tellingly, including Salon/Townhall articles in the training set makes the classifier perform worse on the congressional speech task, implying that the Salon/Townhall distinction and the Republican/Democrat congress speech distinction are fundamentally different concepts from a bag-of-words point of view.

Reading the most obviously conservative NYT op-eds reveals a lot. [This Bret Stephens piece](https://www.nytimes.com/2017/04/28/opinion/climate-of-complete-certainty.html?smid=tw-nytopinion&smtyp=cur) threw Twitter into an uproar, claiming that he outright denies climate change. Actually read the article and it's nothing like what you might imagine a GOP congressperson talking about - Stephens waffles on about the Clinton campaign, the dangers of trusting in data and analytics, before making a comparison to climate change but not without hedging a fair bit on what he's actually saying. It's an editorial making a conservative point but framed and written for a heavily liberal-leaning audience. It's not necessarily a surprise to me that an SVM trained on congressional texts doesn't actually notice something like this.

These concerns might be overblown - after all the Tom Cotton op ed is probably way more likely to register as similar to Republican speech.

My next steps:

1. Get a universe of op-ed texts that all have to do with political and social issues
2. Get the congressional record text from the 115th session, clean it, and label it
3. Train LASSO logistic regression and evaluate the performance on a test set
4. If that doesn't work, look into fancier models (eg, roberta)
5. Also potentially look into the Twitter article dataset collected by Conway as a training set
