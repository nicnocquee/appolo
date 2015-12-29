module Jekyll
  class FootnoteTag < Liquid::Block

    def initialize(tag_name, alignment, tokens)
      super
    end

    def render(context)
        text = super
        rendered = "<div class=\"footnote\">"
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
        output = converter.convert(text)
        rendered += output
        rendered += "</div>"
        return rendered
    end
  end
end

Liquid::Template.register_tag('footnote', Jekyll::FootnoteTag)
