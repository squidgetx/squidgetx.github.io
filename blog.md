---
layout: page
title: writing
nav: false
permalink: /writing
description: "research, essays, and explorations"
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
