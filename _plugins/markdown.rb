module Jekyll
  class MarkdownTag < Liquid::Block

    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
        text = super
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
        output = converter.convert(text)
        return output
    end
  end
end

Liquid::Template.register_tag('markdown', Jekyll::MarkdownTag)
