import webpack from 'webpack';
import path    from 'path';
import del     from 'del';
import fs      from 'fs';
import yargs   from 'yargs';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyPlugin        from 'copy-webpack-plugin';
import NgAnnotatePlugin  from 'ng-annotate-webpack-plugin';
import WriteFilePlugin   from 'write-file-webpack-plugin';

let args = yargs.argv;
let options = {
  env:   args.e || 'dev',
  watch: !!args.w
};

let localHelper = {
  isProd(){
    return options.env === 'prod';
  }
};

let paths = {
  root:   path.resolve(__dirname, '../'),
  src:    path.resolve(__dirname, '../src/'),
  vendor: path.resolve(__dirname, '../node_modules'),
  dist:   path.resolve(__dirname, '../dist'),
  config: path.resolve(__dirname, '../config'),
};

// remove previous build
del(paths.dist, { force:true });

let baseConfig = {
  watch: options.watch,
  cache: true,
  devServer: {
    host: 'localhost',
    port: 3000,
    contentBase: paths.dist,
    publicPath: '/',
    outputPath: paths.dist,
    colors: true,
    displayErrorDetails: true,
    /* for HMR only */
    hot: true,
    inline: true,
    historyApiFallback: true
  }
};

let baseEntryConfig = {
  context: paths.src
};

let loaders = {
  babel:  {
    test:    /\.js$/,
    exclude: /node_modules/,
    loader:  'babel'
  },
  json: {
    test:    /\.json/,
    exclude: /node_modules/,
    loader:  'json'
  },
  html: {
    test:    /\.html$/,
    exclude: /node_modules/,
    loader:  'raw'
  },
  sass: {
    test:    /\.scss$/,
    exclude: /node_modules/,
    loader:  localHelper.isProd() ? ExtractTextPlugin.extract('style', `css!sass!resolve-url`) : 'style!css!sass' /* for HMR */
  },
  fonts: [
    {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts&name=font.[hash].[ext]'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts&name=font.[hash].[ext]'
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts&name=font.[hash].[ext]'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts&name=font.[hash].[ext]'
    }
  ],
  images: {
    dev:
    [{
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=image.[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }, { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader?limit=100000' }
    ],
    // Using pngquant
    prod: {
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=image.[hash].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    }
  },
};

let plugins = {

  html: (entryPath) => {
    return new HtmlWebpackPlugin({
      path:     path.join(paths.dist, entryPath),
      inject:   'body',
      template: path.join(paths.src, 'index.html'),
      filename: 'index.html',
      chunks:   ['vendors', 'app']
    })
  },

  css: () => {
    return new ExtractTextPlugin('style.[chunkhash].css', {
      allChunks: true
    });
  },

  commonChunks: () => {
    return new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.[hash].js',
      minChunks: (module, count) => {
        return module.resource && module.resource.indexOf('node_modules') !== -1 && count >= 1;
      }
    });
  },

  copy: (from, to) => {
    return new CopyPlugin([{
      from: from,
      to:   to
    }])
  },

  ngAnnotate: () => {
    return new NgAnnotatePlugin();
  },

  hotReplacement: () => {
    return new webpack.HotModuleReplacementPlugin();
  },

  writeBundleToDisk: () => {
    return new WriteFilePlugin();
  },

  sourceMap: (path) => {
    return new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      append: `\n//# sourceMappingURL=${path}[url]`
    })
  }

};

let resolve = {
  modulesDirectories: [ 'node_modules' ]
};

let entryPoints = {
  entry: {
    app:       [
      './app.js'
    ],
    devServer: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:3000/'
    ]
  },
  module: {
    loaders: [
      loaders.babel,
      loaders.html,
      loaders.json,
      loaders.sass,
      loaders.fonts,
      localHelper.isProd() ? loaders.images.prod : loaders.images.dev
    ],
  },
  resolve: resolve,
  output: {
    path:       path.join(paths.dist, '/'),
    publicPath: '/',
    filename:   '[name].[chunkhash].js'
  },
  plugins: [
    plugins.html('/'),
    plugins.commonChunks(),
    plugins.copy('./assets', './assets'),
    plugins.ngAnnotate(),
    plugins.hotReplacement(),
    plugins.writeBundleToDisk()
  ]
};

if (localHelper.isProd()) {
  entryPoints.plugins.push(plugins.css());
}

entryPoints.plugins.push(plugins.sourceMap(entryPoints.output.publicPath));

// generate config.json file
generateConfig();

// add apps as entry points to webpack output
export default Object.assign(entryPoints, baseEntryConfig, baseConfig);

///////////////////////////////////

function generateConfig() {
    // loading base config
    let baseConfig = JSON.parse(
        fs.readFileSync(path.join(paths.config, 'config.base.json'), 'utf8')
    );

    // loading env specific config
    let envConfig = JSON.parse(
        fs.readFileSync(path.join(paths.config, `config.${options.env || 'dev'}.json`), 'utf8')
    );

    // merge configs & create config.json file
    return fs.writeFileSync(
        path.join(paths.root, 'config.json'),
        JSON.stringify(Object.assign(baseConfig, envConfig), null, '\t')
    );
};