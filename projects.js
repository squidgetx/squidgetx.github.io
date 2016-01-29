(function() {
  var app = angular.module('projects', ["ngSanitize"]);
  app.controller("ProjectsController", ["$scope", "$sce", function($scope, $sce) {
    project_data.forEach(function(index) {
      this.description = $sce.trustAsHtml(this.description);
    });
    $scope.contents = project_data;
    $scope.tags = {design: true,
                      coding: true};
    $scope.toggle = function(tag) {
      $scope.tags[tag] = !$scope.tags[tag];
      $scope.contents.forEach(function(e, i, a) {
        var show = false;
        e.tags.forEach(function(t_e, t_i, t_a) {
          if ($scope.tags[t_e]) {
            show = true;
          }
        });
        e.hidden = !show;
      });
      console.log($scope.tags);
    }
      
  }]);
  app.directive("projectTitle", function() {
    return {
      restrict: 'E',
      template: "<p><a class='title' href='{{ project.link }}'> {{ project.title }} </a></p>"
    };
  });
  app.directive("projectCover", function() {
    return {
      restrict: 'E',
      template: "<a href='{{ project.link }}'><img src='{{ project.cover }}' /></a>"
    };
  });

  var project_data = [
  { title: "Yale Climbing Team Website,",
    link: "https://yct.herokuapp.com",
    cover: "yct.png",
    tags: ["coding", "design"],
    description: "<p>a webapp made for YCT but easily adaptable to any organization. Almost all the frontend was custom built from scratch except for a single JS library used to truncate text. The webapp uses Ruby on Rails to manage user accounts, who can make posts on a blog-like structure, create events and manage signups, post pictures of said events, and provide information for prospective members.</p><p>The application is protected with CAS authentication although most of it is viewable without the need to log on. The post engine features full kramdown-flavored Markdown support.</p><p>You can check out the github repository <a href='https://github.com/squidgetx/yct'>here</a></p>"
    },
  { title: "Reservations",
    link: "https://github.com/YaleSTC/reservations",
    cover: "reservations.png",
    tags: ["coding"],
    description: "<p>Reservations is a large, open source media equipment management application built on Ruby on Rails. It's about three or four years old; I spent summer of 2013-2014 working on this project.  The application is in use by several departments on campus, with some instances handling over 5,000 users. The application is also beginning to be used by other universities and libraries across the country.</p><p>Over that summer I became the #1 contributer by number of commits to the project and helped lead many charges to drastically improve the application. I rewrote the loan validation system which had been completely broken previously, severely optimized the loading time of the application by cutting out several N+1 query issues, and successfully upgraded the application to Rails 4.</p>"
  },
  { title: "[TI-83+/84+] Ash: Phoenix",
    link: "http://www.omnimaga.org/ash-phoenix/",
    cover: "pscreen7.gif",
    tags: ["coding", "design"],
    description: "<img src='pscreen4.gif'> <p>Ah, my first love, the graphing calculator. Ash:Phoenix was my most ambitious project by far, and I'm sad to report that it is yet to be finished. However, it is really representative of my highest achievement with the calculator to date...</p>  <p>Ash:Phoenix is a fully immersive role playing game (like Final Fantasy or Pokemon) for the TI-83+/84+ line of graphing calculators. The engine uses 4 level grayscale and renders 12x12 tiles on the overworld map. The overworld itself was split into a grid of 64x64 tile chunks, each with 255 different tiles available. The overworld also supported incremental loading, which meant that you would be able to transition between the 64x64 chunks seamlessly, making in effect the whole overworld absolutely gigantic. This was facilitated by the use of some custom assembly scripts to make the scrolling actions as fast as possible. But the map data was kept at a manageable level thanks to a basic RLE compression scheme. Special warp tiles provided a way to quickly move around the map, or created the illusion of going inside buildings and forests.</p>  <p>The NPC scripting interpreter was almost a language all on its own, able to set bits in the player save file to indicate quests completed, flags set, etc. NPCs could give the player items, send them into fixed battles, and more.</p>  <p>The battle engine was relatively sophisticated, with six different combat 'types', similar to Pokemon. The battle system actually resembled Pokemon quite a lot, mostly because I got really into playing competitive Pokemon around this time. Items boosted certain player stats, and players could learn different skills or moves that were possibly complemented by their player type. Moreover, as the game progressed, other characters of different types and dispositions could join the player's party and be available for use in battle.</p>  <img src='ap.png' />  <p>To aid in generating the massive amount of content that would go into this game, I created a content management tool using Java to draw the tiles, make the maps, items, and NPC scripts. The application generated text files that could be assembled using a z80 assembler into binary data and transmitted to the calculator.</p>"
  },
  { title: "Other Calculator Projects (Highlights)",
    link: "http://www.ticalc.org/archives/files/authors/104/10456.html",
    tags: ["coding", "design"],
    description: "<p>This is a selection of some of my other calculator projects. For a more complete listing you can check out my <a href='http://www.ticalc.org/archives/files/authors/104/10456.html'>ticalc.org</a> profile</a>  <p><a href='http://www.ticalc.org/archives/files/fileinfo/449/44960.html'>Embers:Phoenix</a></p>  <img src='embers.gif'>  <p>Embers was a prequel to the Ash:Phoenix series, focusing on a shorter storyline and an action RPG feel. A really hacky AI was developed in order to get enemies to navigate obstacles to get to the player.</p>  <p><a href='http://www.ticalc.org/archives/files/fileinfo/440/44085.html'>Stick Ninja</a></p>  <img src='stick.gif'>  <p>Stick Ninja is a fun little platformer featuring some sort-of sophisticated physics (momentum!).</p>  <p><a href='http://www.ticalc.org/archives/files/fileinfo/431/43160.html'>Cuberunner</a></p>  <img src='cube.gif'>  <p>Cuberunner is a port of the iphone game of the same name. Probably because of this it's my most popular game by far, with around 18,000 downloads on ticalc.org</p>"
  }

  ];
  
}) ();

