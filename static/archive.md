---
layout: page
title: blog
nav: true
permalink: /blog
description: "creative engineering projects, thoughts, and explorations"
---

<ul style='margin-top: -4px' class='post-list'>
  {% for post in site.posts %}
     {% if post.categories contains 'project' %}
      <li>
         {% include post.html post=post %}
      </li>
     {% endif %}

{% endfor %}

</ul>

<p class="rss-subscribe"><a href="{{ "/feed.xml" | relative_url }}">RSS</a></p>
