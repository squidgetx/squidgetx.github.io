---
layout: page
title: archive
nav: true
permalink: /archive/
description: "all projects"
---

<ul style='margin-top: -4px'>
  {% for post in site.posts %}
     {% if post.categories contains 'project' %}
      <li>
         {% include post.html post=post nopreview=true %}
      </li>
     {% endif %}

{% endfor %}

</ul>
