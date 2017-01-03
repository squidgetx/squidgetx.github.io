---
layout: post
title: Parallel Preprocessing for Deterministic Multiversion Concurrency Control
tags: code databases cs research C++
category: project
collaborators: 
- Daniel Abadi
- Jose Faleiro
---

In database world, multiversion concurrency control simply means that the database keeps track of multiple copies (or versions) of a database record. The main advantage here is that in theory, both a reader and a writer can access the same record at the same time, given the system does the proper bookkeeping in order to make sure they each see the right version. This is supposed to lead to improved performance under high concurrency conditions.

Unfortunately, in practice (especially in main-memory and high core count systems) this isn't the case; the costs of this bookkeeping usually is enough to make single version systems much faster. To compensate, most multiversion systems relax their standards of serializability (using something called snapshot isolation). This means that given a set of data transactions the database system might reach a state that would be impossible if it had run each transaction in a serial order, or one after another. A lot of the time this is good enough, but there are still times that full serializability is preferred.

Jose Faleiro and Daniel Abadi released the [Bohm paper](http://www.jmfaleiro.com/pubs/multiversion-vldb2015.pdf) last year, introducing a multiversion system that is supposedly both highly performant and completely serializable. The main trick is that the part of the system that decides which version needs to be processed and the part of the system that does the actual data processing are separated into different layers completely. Letting each one work independently of the other means that there needs to be much less bookkeeping and coordination between workers, leading to an ultimately much faster system.

However, the project is still far from complete. This post is about my small contribution to the system, an introduction of a third layer that preprocesses each transaction before it is sent to the scheduling layer in order to remove potential scalability problems and further improve performance.

Each scheduling thread is responsible only for a certain part of the database - this is part of the reason that the Bohm system is so fast - once the threads start working they don't need to worry that they're touching a part of the database that another thread is. The problem is though that each thread still needs to look at the whole transaction and figure out which parts of that transaction the thread needs to care about. Since all the threads are doing this at the same time, all this work is effectively being duplicated across all workers which can be a big waste of resources. The preprocessing layer is thus responsible for distributing the proper subset of transaction items to a modified scheduling layer, thus parallelizing this work and improving performance!

The final implementation uses a linked list of indexes on the transaction and the transaction item levels to ensure that each scheduling thread never needs to examine things that don't fall under its domain. The preprocessor threads also distribute work among themselves in a round-robin fashion, allowing for substantial parallelism between them.

You can read the formal writeup for more technical details [here](/docs/multiversion.pdf), and you can look at the code directly [here](https://github.com/squidgetx/multiversioning).

Many thanks to my senior advisors Prof. Abadi and Jose Faleiro for guiding me through this project!


