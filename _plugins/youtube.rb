module Jekyll
  class YoutubeTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
        "<div class=\"video-container\"><iframe width=\"80%\" max-width=\"640px\" height=\"315\" src=\"https://www.youtube.com/embed/"+@text+"\" frameborder=\"0\" allowfullscreen></iframe></div>"
    end
  end
end

Liquid::Template.register_tag('youtube', Jekyll::YoutubeTag)
