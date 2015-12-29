module Jekyll
  class DownloadTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      t = text.split("|")
      type = t[0]
      if type.strip.downcase == "app_store"
          @img = "/images/app_store.png"
      elsif type.strip.downcase == "play_store"
          @img = "/images/playstore.png"
      elsif type.strip.downcase == "direct"
          @text = t[2]
      elsif type.strip.downcase == "coming_soon"
          @img = "/images/app_store_coming_soon.png"
      end
      @url = (t.length > 1) ? t[1] : ""
    end

    def render(context)
        if @url.length > 0
            if @text
                rendered = "<p style=\"text-align: center\"><a href=\""+@url+"\" class=\"centerbutton\">"+@text+"</a></p>"
            else
                rendered = "<a href=\""+@url+"\"><img class=\"content__item-img-center\" src=\""+@img+"\"></a>"
            end
        else
            rendered = "<img class=\"content__item-img-center\" src=\""+@img+"\">"
        end
        return rendered
    end
  end
end

Liquid::Template.register_tag('download', Jekyll::DownloadTag)
