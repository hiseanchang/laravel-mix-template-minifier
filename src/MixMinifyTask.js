const Task = require('laravel-mix/src/tasks/Task');
const File = require('laravel-mix/src/File');

const notifier = require('node-notifier');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const minify = require('html-minifier').minify;

class MixMinifyTask extends Task {

  run() {
    let {src, output, options, files} = this.data;

    this.src = src;
    this.output = output;
    this.options = options;
    this.templates = files;

    this.compile();
  }

  compile() {
    try {
      this.templates.forEach((template, index) => this.minifyTemplate(template, index));

      this.onSuccess();
    } catch (e) {
      this.onFail(e.name + ': ' + e.message);
    }

    return this;
  }

  minifyTemplate(src, index) {
    let file = new File(src);
    let output = new File(path.join(this.output, file.nameWithoutExtension() + '.php'));

    try {
      let html = minify(file.read(), this.options);

      if (!fs.existsSync(output.base())) {
        mkdirp.sync(output.base());
      }

      fs.writeFileSync(output.path(), html);
    } catch (e) {
      throw e;
    }
  }

  onFail(output) {
    console.log("\n");
    console.log('Minify Compilation Failed!');
    console.log();
    console.log(output);

    // if (Mix.isUsing('notifications')) {
    //   notifier.notify({
    //     title: 'Laravel Mix',
    //     subtitle: 'Minify Compilation Failed',
    //     message: output
    //   });
    // }
  }

  onSuccess(output) {
    // if (Config.notifications.onSuccess) {
    //   notifier.notify({
    //     title: 'Laravel Mix',
    //     message: 'Minify Compilation Successful'
    //   });
    // }
  }

}

module.exports = MixMinifyTask;
