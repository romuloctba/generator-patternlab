# generator-patternlab

> A [Yeoman](http://yeoman.io) generator for [Pattern Lab](http://patternlab.io/), a static site generator based on Brad Frost's [Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design/) methodologies.
> Scaffolds out a new Pattern Lab site, along with a few other optional workflow bells and whistles (Compass, Sass, Bower, Grunt) and front-end dependencies (jQuery, Modernizr, etc.).

## Getting Started

- Install Yeoman `npm install -g yo` (one-time global install).
- Install this generator with `npm install -g generator-patternlab` (one-time global install).
- From the terminal, navigate to your site's directory (hint: creating a separate UI directory in the project root works pretty well).
- Type `yo patternlab`, answer a few questions about your project, and wait.
- When it's done, type `grunt` to generate your first Pattern Lab build, then `grunt watch` to start the watcher.
- Bask in the glory of your fully scaffolded site. 

## Development Plans
- The generator works but is pretty basic at this point.
- Patterns need to be updated to include preferences set in Yeoman prompts.
- Add .gitignore and .sublime-project templates

## Changelog
- 0.2.6
  - Bug fixes for Modernizr, current year added, cleanup corresponding to template changes.

- 0.2.5
  - Cleaned up jQuery and Modernizr options. Both now install via Bower, and conditionally load into Grunt and PL templates based on Yo variables.

- 0.2.3
  - Lots of changes. Starter JS files are scaffolded, templates are using a few Yo variables, and all Grunt tasks are working. The patterns still need a lot of cleanup, but the basic generator works well now.

- 0.2.0
  - Cloning Pattern Lab now handled natively by Yeoman, instead of Bower.  

- 0.1.0
  - First commit. Functional but needs work.