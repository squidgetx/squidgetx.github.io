---
layout: page
title: Writing
nav: true
permalink: /writing/
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
