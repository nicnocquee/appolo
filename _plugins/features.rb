module Jekyll
  class FeaturesTag < Liquid::Block

    def initialize(tag_name, alignment, tokens)
      super
    end

    def render(context)
        text = super
        rendered = "<ul class=\"meeru_features\">"
        features = text.split("\n")
        for feat in features
            f = feat.strip
            if f.length > 0
                rendered += "<li>"+f+"</li>"
            end
        end
        rendered += "</ul>"
        return rendered
    end
  end
end

Liquid::Template.register_tag('features', Jekyll::FeaturesTag)
