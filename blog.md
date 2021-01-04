---
layout: page
title: Writings
nav: true
permalink: /writings/
description: "research, essays, and creative writing"
---

<ul style='margin-top: -4px'>
  {% for post in site.posts %}
     {% if post.categories contains 'writing' %}
      <li>
         {% include post.html post=post %}
      </li>
     {% endif %}

{% endfor %}

</ul>
