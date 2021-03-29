.PHONY: clean serve serve-drafts build ping-searchengines publish

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

publish:
	make clean
	make build

	# Rsync: (1) on server, create backup, (2) rsync files to server
	# PATH_DATE=`date +"%Y-%m-%d_%T"`
	# ssh nova "sudo cp -r /server/websites/www.metachris.com/htdocs /server/websites/www.metachris.com/htdocs-backup/$PATH_DATE"
	# rsync -v -a "$PWD" nova:/server/websites/www.metachris.com/htdocs

	rm -f public.zip
	zip -r public public
	scp public.zip nova:/tmp/
	ssh nova "sudo unzip /tmp/public.zip -d /server/websites/www.metachris.com/ && sudo mv /server/websites/www.metachris.com/htdocs /server/websites/www.metachris.com/htdocs-backup/`date +"%Y-%m-%d_%T"` && sudo mv /server/websites/www.metachris.com/public /server/websites/www.metachris.com/htdocs"
	rm -f public.zip
