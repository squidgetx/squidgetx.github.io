---
layout: page
title: Writings
nav: true
permalink: /writings/
description: "research, essays, and creative writing"
---

<ul>
  {% for post in site.posts %}
     <li>
         {% if post.categories contains 'writing' %}
            {% include post.html post=post %}
         {% endif %}
     </li>

{% endfor %}

</ul>
