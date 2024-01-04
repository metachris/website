https://www.metachris.com/

Dependencies:

* [Hugo](https://gohugo.io/) (v0.72.0)
* [hugo-coder theme](https://github.com/luizdepra/hugo-coder) (v1.0-105-g4369ed7)
* [hugo-easy-gallery](https://github.com/liwenyip/hugo-easy-gallery/) ([examples](https://www.liwen.id.au/heg/))

Internal pages:

* Example 404 page: http://localhost:1313/404.html

## Getting started

```
docker run -p 1313:1313 --rm -it -w /mnt -v $(pwd):/mnt jakejarvis/hugo-extended:0.82.0 serve --bind 0.0.0.0 --buildDrafts
```


# Writing & Publishing Tips

## For each post

* Add a header image (1200x630px or 1024x540)
* Possible to add a diagram?
* Possible to make code run interactively? eg. with jsfiddle.net
* Reach out to someone?

Image resources

- https://pixabay.com
- http://www.europeana.eu/portal/en
- https://unsplash.com/
- Fontawesome icons: https://fontawesome.com/icons?d=gallery&m=free


## Before publishing

Check Post

* Typos
* Keywords
* Tags
* Title (Google search for inspiration and related keywords)
* OG meta tags in HTML

Check Social Infos

* [Twitter Card Validator](https://cards-dev.twitter.com/validator)
* [Facebook Debugger](https://developers.facebook.com/tools/debug/)
* https://search.google.com/structured-data/testing-tool