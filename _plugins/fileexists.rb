module Jekyll
    class FileExistsTag < Liquid::Tag

        def initialize(tag_name, path, tokens)
            super
            @path = path
        end

        def render(context)
            # ref https://gist.github.com/vanto/1455726
            # pipe param through liquid to make additional replacements possible
            url = Liquid::Template.parse(@path).render context

            # check if file exists (returns true or false)
            "#{File.exist?(url.strip!)}"
        end
    end
end

Liquid::Template.register_tag('file_exists', Jekyll::FileExistsTag)
