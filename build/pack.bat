start cmd /k "webpack --config global/_webpack.config.core-global.js"
start cmd /k "webpack --config global/_webpack.config.addon-global.js"
start cmd /k "webpack --config global/_webpack.config.core-global-min.js"
start cmd /k "webpack --config global/_webpack.config.addon-global-min.js"

start cmd /k "webpack --config umd/_webpack.config.core-umd.js"
start cmd /k "webpack --config umd/_webpack.config.addon-umd.js"
start cmd /k "webpack --config umd/_webpack.config.core-umd-min.js"
start cmd /k "webpack --config umd/_webpack.config.addon-umd-min.js"

start cmd /k "webpack --config esm/_webpack.config.core-esm.js"
start cmd /k "webpack --config esm/_webpack.config.core-esm-min.js"