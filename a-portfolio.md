---
layout: page
title: Work
permalink: /Portfolio/
nav: true
---

  <ul class="post-list">
    {% for post in site.posts %}
      {% if post.categories contains 'project' %}
      <li>
        {% include project.html project=post %}
      </li>
      {% endif %}
    {% endfor %}
  </ul>

  <p class="rss-subscribe"><a href="{{ "/feed.xml" | relative_url }}">RSS</a></p>
