# laravel-mix-template-minifier
This package allows you to minify template files.

## Install

``` bash
$ npm install --save-dev laravel-mix-template-minifier
```

## Usage

``` js
// webpack.mix.js

let mix = require('laravel-mix');

mix.minTemplate = require('laravel-mix-template-minifier')

if (mix.inProduction()) {
  mix.minTemplate('storage/framework/views/*.php', 'storage/framework/views/')
}

// ...
```

## Official Documentations

- Documentation for Mix can be found on the [Laravel website](http://laravel.com/docs/mix).
- Documentation for HTMLMinifier can be found on the [HTMLMinifier website](https://github.com/kangax/html-minifier).


## Thanks

- [html-minifier](https://github.com/kangax/html-minifier)

## License

MIT @ [SEANCHANG](https://github.com/hiseanchang/)
