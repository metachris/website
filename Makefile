.PHONY: clean serve serve-drafts build ping-searchengines

clean: ## remove build artifacts
	rm -rf resources/_gen/ public/

serve: ## serve (no drafts)
	hugo server --verbose

serve-drafts: ## serve (with drafts)
	hugo server --buildDrafts

build: ## build blog (prod)
	hugo --minify

ping-searchengines:
	curl -s http://www.google.com/webmasters/sitemaps/ping?sitemap=https://www.metachris.com/sitemap.xml -o /dev/null
	curl -s http://www.bing.com/webmaster/ping.aspx?siteMap=https://www.metachris.com/sitemap.xml -o /dev/null
