const _ = require('lodash');
const glob = require('glob');
const path = require('path');

const MixMinifyTask = require('./MixMinifyTask');

var minTemplate = function (src, output, pluginOptions = {}) {
  let options = _.merge({
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    processConditionalComments: true,
    removeAttributeQuotes: false,
    removeComments: true,
    removeTagWhitespace: false,
    trimCustomFragments: true
  }, pluginOptions);

  let files = glob.sync(path.join(src));

  let task = new MixMinifyTask({ src, output, options, files });

  Mix.addTask(task);

  return this;
}

module.exports = minTemplate;
