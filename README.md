# generator-patternlab

> A [Yeoman](http://yeoman.io) generator for [Pattern Lab](http://patternlab.io/), a static site generator based on Brad Frost's ["Atomic Design"](http://bradfrostweb.com/blog/post/atomic-web-design/) methodologies.
> Scaffolds out a new Pattern Lab site, along with a few other optional workflow bells and whistles (Compass, Sass, Bower, Grunt) and front-end dependencies (jQuery, Modernizr, etc.).

## Getting Started

- Install Yeoman `npm install -g yo` (one-time install).
- Clone this repo to anywhere you'd like, navigate to it, and type `npm link` (note: we'll eventually make this an installable node package once the kinks are worked out).
- From the terminal, navigate to your site's directory (hint: creating a UI directory from root works pretty well).
- Type `yo patternlab`, answer a few questions about your project.
- Type `grunt` to generate your first Pattern Lab build, then `grunt watch` to start the watcher.
- Bask in the glory of your fully scaffolded site. 

## Development Plans
- The generator works but is pretty basic at this point.
- The PL repo is currently being pulled with Bower. I want to replace it with the native Yeoman this.remote/remote.directory methods, which will allow us to parse Yeoman variables directly in the patterns.
- WordPress/Magento scaffolds don't work yet.
- Bower packages are downloaded based on Yeoman prompts, but aren't automatically referenced in the patterns (see #2).
- Better Grunt and Sass config options (grunt-modernizr, sass-globbing, etc.).
- Add .gitignore and .sublime-project templates

## Changelog
- 0.1.0
  - First commit. Functional but needs work.