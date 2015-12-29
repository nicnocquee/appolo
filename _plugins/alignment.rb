module Jekyll
  class TextAlignmentTag < Liquid::Block

    def initialize(tag_name, alignment, tokens)
      super
      if alignment.strip.downcase == "center"
          @alignmentClass = "content__item-center"
      elsif alignment.strip.downcase == "right"
         @alignmentClass = "content__item-right"
      elsif alignment.strip.downcase == "left"
         @alignmentClass = "content__item-left"
      else
         @alignmentClass = "content__item-justify"
      end
    end

    def render(context)
        text = super
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
        output = converter.convert(text)
        output.gsub! "<p>", ""
        output.gsub! "</p>", ""
        rendered = "<p class=\""+@alignmentClass+"\">"+output+"</p>"
        return rendered
    end
  end
end

Liquid::Template.register_tag('textalign', Jekyll::TextAlignmentTag)
