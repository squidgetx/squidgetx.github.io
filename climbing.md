---
layout: page
title: climbing
nav: false
permalink: /climbing/
---

<ul>
  {% for post in site.posts %}
     <li>
         {% if post.tags contains 'climbing' %}
            {% include post.html post=post %}
         {% endif %}
     </li>

{% endfor %}

</ul>
