![Appolo for Jekyll](https://raw.githubusercontent.com/nicnocquee/appolo/master/images/appolo/fb.png)

Appolo is a set of plugins and themes for [Jekyll](http://jekyllrb.com) to create a static portfolio website for app developers to showcase their work. Its minimalistic theme and playful animations make it perfect to display the amazing apps you have made. The responsive design looks perfect in desktop or mobile. It also comes with a set of plugins to remove the hassle of formatting your apps' pages.

Made by a developer. For developers.
--

There are so many single page landing page for showcasing a single app. But I need a theme to showcase multiple apps and I couldn't find it. And since I've been using Github with Jekyll and Octopress to blog, I figured it'd be nice to have a Jekyll theme for apps showcase. This theme is based on a [Zoom Slider demo](http://tympanus.net/codrops/2015/07/06/zoom-slider/) in [Codrops](http://tympanus.net/codrops). Appolo also comes with custom [Liquid](https://github.com/Shopify/liquid/wiki) tags to help writing an app's page easier. Check out my [apps' website](http://www.delightfuldev.com) to see it in action.

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
external_url | OPTIONAL. If you want to open external URL when user clicks on the app, set this variable.

Writing a new app page
--

Appolo comes with some custom [Liquid](https://github.com/Shopify/liquid/wiki) tags to make it easy writing an app page.

Tag | Description
------------- | -------------
`{% section_title Section Title Here %}` | Use this tag to render a section title.
<code>{% img alignment &#124; relative_path_to_image &#124; alt %}</code> | Use `img` tag to render an image with an assigned `alignment`. You can use one of the four alignments: `center`, `right`, `left`, or `fill-width`.
`{% textalign center %}` | Use `textalign` block to set the paragraph alignment.
`{% youtube youtube_id %}` | Use `youtube` followed by the id of the video to show a responsive YouTube frame.
`{% features %}` | Use `features` block to list the features of your apps.
<code>{% download type &#124; url %}</code> | Use `download` tag to render a button to download your app. Available options for `type` are `app_store`, `play_store`, `direct`, and `coming_soon`.

App's Images
--

When adding a new app, there are some images you need to prepare. You need to put these images in `images/app_name` folder.

Image Name | Size | Description
------------- | ------------- | -------------
preview.png | 321 x 193 px | This preview image is used on the landing page. It is positioned inside the device you chose for the app.
icon.png | 512 x 512 px | Icon of the app.
fb.png | 1200 x 630 px | The image for Facebook Open Graph.

Known Issue
--

- If you got `"Your site is having problems building: The tag img in _posts/2015-12-20-deep.markdown/#excerpt is not a recognized Liquid tag"`, check out the workaround [here](https://github.com/nicnocquee/appolo/issues/4#issuecomment-170936958).
- If you're using Appolo for a Github Project Page, set the `baseurl` in `_config.yml` to `/<project_name>/`. So if you're project's URL is `http(s)://<username>.github.io/<projectname>`, the `baseurl` should be `/<projectname>/`. Check out the [Appolo-demo repository](https://github.com/nicnocquee/Appolo-demo) and its corresponding [page](http://www.nicnocquee.com/Appolo-demo/).

Credits
--

- Original theme by [Codrops](http://tympanus.net/codrops).
- [Dynamic.js](http://dynamicsjs.com/) by Michaël Villar.
- [Modernizr](http://modernizr.com/) by the Modernizr Team.
- [Animate.css](https://github.com/daneden/animate.css) by Daniel Eden.
- [Hammer.js](https://github.com/hammerjs/hammer.js) by Eight Media Team.

Images
--

- [Flat Apple Devices](http://drbl.in/jsoj) by Peter Finlan.
- [Apple Watch](http://drbl.in/mNVE) by Vincent Le Moign.
- [Website Mockup "Space Exploration"](http://drbl.in/oMJD) by Ante Matijaca.
- [Free To-Do App UI](http://www.invisionapp.com/do/sketchappsources) by InVision.
- [Pex: Free Website PSD](http://blazrobar.com/2015/free-psd-website-templates/pex-a-free-website-home-page-photoshop-psd/) by Blaz.
- [Perspective App Screen Mockup](http://graphicburger.com/perspective-app-screens-mock-up/) by GraphicBurger.

Icons
--

- [Feather Icons](https://gumroad.com/l/feather) by Cole Bemis.
- Icon font created with [IcoMoon](https://icomoon.io) and [Fontello](http://fontello.com).


LICENSE
--
MIT
