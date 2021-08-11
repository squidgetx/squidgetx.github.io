---
layout: page
nav: true
title: projects
permalink: /projects
description: "engineering projects in varying states of polish"
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
