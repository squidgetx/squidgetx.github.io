---
layout: post
date: 2020-01-04
tags:
  - tech+politics
  - interactive
img: /images/inherent.png
title: Inherent Tradeoffs
permalink: /inherent_tradeoffs/
categories:
  - project
description: "an interactive essay on the tradeoffs between differing definitions of algorithmic fairness"
---

<h1>
      1. Classification
</h1>
<p>
  When a recruiter considers a stack of resumes, s/he sorts each application into two piles - perhaps labeled "interview" and "reject".
  When a bank manager considers a series of loan applications, s/he labels each application "approve" or "reject".
  Classification, the general process of sorting cases into piles, forms the backbone of social, financial, and medical systems that
  have massive impact on people's lives.
</p>

<div id='sketch0' class='int'></div>

<p>
  As we enter an age where data is frequently compared to powerhouse commodities like oil or gold,
  many common classification tasks are being performed by complex computer systems instead of individuals.
  Some examples include:
</p>
<ol>
  <li>
    <a href='https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing'>
      Criminal sentencing systems are being used to label defendants as likely or unlikely to commit future crimes
    </a>
  </li>
  <li>
    <a href='https://news.cornell.edu/stories/2019/11/are-hiring-algorithms-fair-theyre-too-opaque-tell-study-finds'>
      Hiring systems are screening job applications
    </a>
  </li>
  <li>
    <a href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4348437/'>
      Medical systems give cancer prognoses
    </a>
  </li>
</ol>

<p>
  As these systems grow larger and more influential,
  it has become a special point of interest to ensure not only a high level of overall performance but also fairness along gender, race, and other protected class lines.
</p>
<h1>
  2. What is Fair Classification?
</h1>

<p>
  How can we tell if a classification algorithm is unfair?
</p>
<h3>
  2.1. Balanced Accuracy (Positive Prediction Rate)
</h3>
<p>
  Perhaps even a highly accurate cancer-prognosis system is mistakenly giving more aggressive prognoses to elderly patients than to young ones,
  or a hiring system is offering more interviews to unqualified men than to women.
  In these cases the system's accuracy is significantly different for one group than another, and a hiring manager or doctor using one of these systems
  might subsequently begin interpreting its recommendations differently depending on the group membership of the person under consideration.

</p>
<div id='sketch1' class='int'></div>
<p class='subtitle'>
  Note: One trivial way of balancing accuracy is to exactly interview all the qualified candidates and none of the unqualified ones (or vice versa).
  Since these algorithms will never be so perfect, most discussions of fairness ignore these "degenerate" cases.
</p>
<h3>
  2.2. Balanced Negative And Positive Prediction Rates
</h3>

<p>
  You may have noticed that our measure of accuracy captures how often the algorithm decides to interview a qualified candidate,
  but ignores the times when someone who deserves an interview is rejected.

If qualified men and women are interviewed at the same rate but many qualified women are rejected (more than the number of rejected, qualified men)
then that system would still be unfair. After all, if you were a qualified woman it means you would then have a lower chance than an equally qualified man
of getting an interview!

</p>
<p>
  In order for an algorithm to be fair it must balance both the mistakes it makes in its positive labels (interviews) as well as its negative labels (rejections).
  You may find it difficult to perfectly balance both in these small-scale examples, but see how close you can get.
</p>
<div id='sketch2' class='int'></div>
<p class='subtitle'>
    Note how difficult it can be to construct a good test condition for these labels. What does it mean for a candidate to be qualified, and how do you measure it?
    If you reject someone's loan application, how do you evaluate whether or not they would have been able to pay it back?
</p>
<h3>
  2.3. Balanced Error Rates
</h3>
<p>
  So, as long as classification systems make labeling mistakes for the different groups at roughly the same rate,
  there is nothing to worry about, right?

But another notion of fairness starts to emerge if we consider labeling mistakes within classes instead of class mistakes within labels.

</p>
<p>
  The terminology quickly becomes confusing, so let us return to a concrete example.
  Suppose a criminal recidivism system mistakenly labels blacks as high-risk more often than whites;
  say 10% of blacks who never go on to commit another crime are labeled as high risk whereas only 5% of whites who never commit another crime receive that same high risk label.
  This system is unfair in a distinctly different way; it punishes more blacks with an undeserved high-risk rating which could lead to harsher sentencing among other potential consequences.
</p>
<p class='subtitle'>
  Our earlier definition of fairness was concerned with ensuring the predictive power of the system was balanced in the two groups.
  In the criminal recidivism example, this means making sure that the "high risk" label is as accurate for whites as it is for blacks (and correspondingly, that the "low risk" label is accurate for both groups as well).
</p>
<div id='sketch3' class='int'></div>
<h1>Inherent Tradeoffs</h1>
  <p>
    Unfortunately, it is actually impossible to satisfy both of the main definitions of fairness we have considered so far without a perfect algorithm (or identical groups)-
    it is possible to balance the label mistakes within classes, the class mistakes within labels, but not both at once.
  </p>
  <p>
    See for yourself below:
  </p>
  <div id='sketch4' class='int'></div>
<p>
</p>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
<script src="/lib/inherent_tradeoffs.js"></script>
