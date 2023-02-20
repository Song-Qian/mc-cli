/*
 * @Author: SongQian
 * @LastEditors: @skysong
 * @Date: 2022/11/28 21:40
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 生产编译处理配置
 */

const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = function(skinExtract) {
    
    const JS_Loader = {
        test: /\.(js(x?)|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: { node: "current" }
          }
        }
    }
    
    const TS_Loader = {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: process.env.SSR === "Vue" ? [{ 
            loader: 'babel-loader',
            options: {
              targets: { node: "current" }
            }
          },
          { loader: 'ts-loader' }
        ] : {
            loader: 'ts-loader'
        }
    }
    
    const SASS_Loader = {
      test: /\.(sa|sc)ss$/,
      use : [
        skinExtract.loader,
        {
          loader: 'css-loader',
          options: {
            url : true,
            import : true,
            esModule: true,
            modules: {
              mode: 'icss',
              namedExport: false,
              exportGlobals: true,
              exportLocalsConvention: "camelCaseOnly",
            }
          }
        },
        { loader: 'sass-loader', options: { implementation: require('sass') }}
      ]
    }

    const URL_Loader = {
        test: /\.(png|jpg|gif)$/,
        type: "asset",
        generator : {
          filename: 'assets/images/[name].[ext]'
        }
    }
  
    const SVG_Loader = {
        test: /\.(svg)$/,
        type: "asset",
        generator : {
          dataUrl: content => {
            return svgToMiniDataURI(content.toString());
          }
        }
    }
  
    const FILE_Loader = {
        test: /\.(eot|ttf|otf|woff|woff2)$/,
        type: "asset/resource",
        generator : {
          filename: 'assets/css/font/[name].[ext]'
        }
    }

    const loaders = [];
    if (process.env.LD_LIBRARY_PATH) {
      loaders.push({
        test: /(magic-cube)(\.prod)?\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: 'oracledbCLib = requireBinary(binaryLocations[i])',
          replace: "oracledbCLib = __non_webpack_require__(process.env.LD_LIBRARY_PATH + '/' + nodbUtil.BINARY_FILE)"
        }
      }, {
        test: /\.node$/i,
        use: "node-loader"
      })
    }
    
    return [
      JS_Loader,
      TS_Loader,
      SASS_Loader,
      URL_Loader,
      SVG_Loader,
      FILE_Loader,
      ...loaders
    ]

}