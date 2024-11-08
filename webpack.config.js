module.exports = {
entry: "./src/binder.js",
output:{
path:  __dirname + "/build"
,filename:  	"binder.js",
},
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
 mode: "development",
 // mode: "production",

  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    open: true,
	port:8081,
	host: '0.0.0.0'
	,static: {
        directory: "build",
	}
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
				 "presets": [
					[
					  "@babel/preset-env", {
						"targets": {
						  "node": "current"
						}
					  }
					]
				  ]
				  ,"plugins": [
					"@babel/plugin-proposal-class-properties"
				  ]
            },
          },
        ],
      },
    ],
  },
  // ES5(n)向けの指定
  target: ["web", "es5"],
};
