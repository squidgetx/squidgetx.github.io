---
layout: page
title: Blog
nav: true
permalink: /Blog/
---

<ul>
  {% for post in site.posts %}
     <li>
        {% include post.html post=post %}
     </li>

  {% endfor %}
</ul>
