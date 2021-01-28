---
layout: page
title: portfolio
permalink: /portfolio
nav: false
description: "selected creative and engineering projects"
---

<ul class="post-list">
  {% for post in site.posts %}
    {% if post.categories contains 'feature' %}
        <li>
          {% include project.html project=post %}
        </li>
    {% endif %}
  {% endfor %}
</ul>
