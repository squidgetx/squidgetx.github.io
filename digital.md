---
layout: page
title: internet projects 
nav: false
permalink: /digital/
---

<ul>
  {% for post in site.posts %}
     <li>
         {% if post.categories contains 'digital' %}
            {% include post.html post=post %}
         {% endif %}
     </li>

{% endfor %}

</ul>

<p>for more sketches see the <a href='/fun'>fun</a> page!</p>