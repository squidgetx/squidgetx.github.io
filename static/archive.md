---
layout: page
title: Not No Archive
permalink: /archive
description: "all posts"
---

<ul style='margin-top: -4px' class='post-list'>
  {% for post in site.posts %}
     {% if post.blog %}
      <li>
         {% include post-item.html post=post %}
      </li>
     {% endif %}

{% endfor %}

</ul>

<p class="rss-subscribe"><a href="{{ "/feed.xml" | relative_url }}">RSS</a></p>

{% include signup.html %}
