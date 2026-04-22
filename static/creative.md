---
layout: page
nav: true
title: works
permalink: /works
description: "<a href='/tag/research'>research</a> | <a href='/tag/art'>art</a>"
---

<ul style='margin-top: -4px' class='post-list'>
  {% for post in site.posts %}
     {% if post.categories contains 'project' %}
      <li>
         {% include post-item.html post=post %}
      </li>
     {% endif %}

{% endfor %}

</ul>

<p class="rss-subscribe"><a href="{{ "/feed.xml" | relative_url }}">RSS</a></p>
