![Appolo for Jekyll](https://raw.githubusercontent.com/nicnocquee/appolo/master/images/appolo/fb.png)

Appolo is a set of plugins and themes for [Jekyll](http://jekyllrb.com) to create a static portfolio website for app developers to showcase their work. Its minimalistic theme and playful animations make it perfect to display the amazing apps you have made. The responsive design looks perfect in desktop or mobile. It also comes with a set of plugins to remove the hassle of formatting your apps' pages.

Made by a developer. For developers.
--

There are so many single page landing page for showcasing a single app. But I need a theme to showcase multiple apps and I couldn't find it. And since I've been using Github with Jekyll and Octopress to blog, I figured it'd be nice to have a Jekyll them for apps showcase. This theme is based on a [Zoom Slider demo](http://tympanus.net/codrops/2015/07/06/zoom-slider/) in [Codrops](http://tympanus.net/codrops). Appolo also comes with custom [Liquid](https://github.com/Shopify/liquid/wiki) tags to help writing an app's page easier.

Quick start
--

1. Clone this repo.
2. Install Jekyll if you haven't. `gem install jekyll`
3. Go to repo's directory and run `jekyll serve` from Terminal.
4. Open `http://localhost:4000` in browser.

Adding a new app
--

To add a new app, simply create a markdown file in `_posts` directory or just duplicate sample the markdown file in `_posts/2015-12-26-appolo.markdown`. Set the variables in the YAML Front Matter block with your app's parameters.

Key | Description
------------- | -------------
layout | Always use `post`.
title | `title` appears on the top of the app's page.
subtitle | `subtitle` appears after the `title` in the app's page.
description | Used in the head's meta.
date | Published date.
categories | Not used currently.
permalink | NEEDED. This sets the app's URL to baseurl/permalink.  
device | Type of device to use for this app in the landing page. Available options: imac, macbook, iphone, ipad, and apple-watch.
name | Name of the app that is shown on the landing page.
tagline | Shown under `name` on the landing page.

Writing a new app page
--

Appolo comes with some custom [Liquid](https://github.com/Shopify/liquid/wiki) tags to make it easy writing an app page.

Tag | Description
------------- | -------------
`{% section_title Section Title Here %}` | Use this tag to render a section title.
`{% img alignment \| relative_path_to_image \| alt %}` | Use `img` tag to render an image with an assigned `alignment`. You can use one of the four alignments: `center`, `right`, `left`, or `fill-width`.
`{% textalign center %}` | Use `textalign` block to set the paragraph alignment.
`{% youtube youtube_id %}` | Use `youtube` followed by the id of the video to show a responsive YouTube frame.
`{% features %}` | Use `features` block to list the features of your apps.
`{% download type \| url %}` | Use `download` tag to render a button to download your app. Available options for `type` are `app_store`, `play_store`, `direct`, and `coming_soon`.

App's Images
--

When adding a new app, there are some images you need to prepare. You need to put these images in `images/app_name` folder.

Image Name | Size | Description
------------- | ------------- | -------------
preview.png | 321 x 193 px | This preview image is used on the landing page. It is positioned inside the device you chose for the app.
icon.png | 512 x 512 px | Icon of the app.
fb.png | 1200 x 630 px | The image for Facebook Open Graph.
