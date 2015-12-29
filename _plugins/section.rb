module Jekyll
  class SectionTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
        "<h3 id=\"section_title\">"+@text.strip+"</h3>"
    end
  end
end

Liquid::Template.register_tag('section_title', Jekyll::SectionTag)
