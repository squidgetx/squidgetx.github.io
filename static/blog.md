---
layout: default-sm
title: not no
nav-title: blog
nav: true
permalink: /blog
description: "a blog about information science, culture, and new media"
---

<header class='post-header'>
   <h1 class='page_title'>{{ page.title | downcase }}</h1>
   <p class='page_description'>{{ page.description }}. <a href='/archive'>Archive</a>
</p>
</header>

{% assign posts = site.posts | where: "blog", true | slice: 0,3 %}
{% assign others = site.posts | where: "blog", true | slice: 3 %}

<div class='content'>

{% for post in posts %}
{% include post-stream.html post=post %}
{% endfor %}

<h1>More</h1>
<ul style='margin-top: -4px' class='post-list'>
  {% for post in others %}
     {% if post.categories contains 'project' or post.blog %}
      <li>
         {% include post-item.html post=post %}
      </li>
     {% endif %}

{% endfor %}

</ul>
</div>
