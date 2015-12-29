module Jekyll
  class TableTag < Liquid::Block

    def initialize(tag_name, alignment, tokens)
      super
    end

    def render(context)
        text = super
        rendered = "<table>"
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)

        for line in text.split("\n")
            if line.length > 0
                rendered += "<tr>"
                i = 0
                for col in line.split(">>")
                    output = converter.convert(col.strip)
                    output.gsub! "<p>", ""
                    output.gsub! "</p>", ""
                    rendered += "<td"

                    if i == 0
                        rendered += " class=\"colored\">"
                    else
                        rendered += ">"
                    end

                    rendered += output
                    rendered += "</td>"
                    i += 1
                end
                rendered += "</tr>"
            end
        end

        rendered += "</table>"
        return rendered
    end
  end
end

Liquid::Template.register_tag('table', Jekyll::TableTag)
