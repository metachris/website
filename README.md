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