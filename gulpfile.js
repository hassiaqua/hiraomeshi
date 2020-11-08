/*
=====================================
使用するプラグイン（モジュールのロード）
=====================================
*/
var gulp = require('gulp'),
		plumber = require('gulp-plumber'), //エラーが原因でタスクが強制停止することを防止する
		ejs = require("gulp-ejs"),
		sass = require('gulp-sass'),
		rename = require('gulp-rename'),
		autoprefixer = require('gulp-autoprefixer'),
		browserSync = require('browser-sync'),
		jsmin = require('gulp-uglify'),
		mmq = require('gulp-merge-media-queries'), //mqをまとめる
		notify = require('gulp-notify'), //エラーの通知を出す
		imagemin = require('gulp-imagemin'),
		imageminJpg = require('imagemin-mozjpeg'),
		imageminPng = require('imagemin-pngquant'),
		imageminSvg = require('gulp-svgmin'),
		changed = require('gulp-changed');

/*
=====================================
各ファイルのフォルダの指定
=====================================
*/
//Folder to develop -> 開発フォルダ
var develop = "develop/";
//Folder to public -> 公開フォルダ
var public = "html/";
//Folder to theme -> WPテーマフォルダ（★のついてる行のコメントアウトを外す）
// var theme = "wp/wp-content/themes/xxxxx/";
//config
var config = {
	"path" : {
		"sassCompile" : develop+"sass/**/*.scss", //sassCompileはsassファイルがある場所。
		"sassModule" : develop+"sass/**/_*.scss",
		"afterCompileSass" : public+"css/", //afterCompileSass
		"ejsDir" : develop+"ejs/**/*.ejs", //コンパイルしたいejsファイルがある場所。
		"templateDir": develop+"ejs/templates/_*.ejs", //templateDirはテンプレートejsファイルがある場所。
		"afterCompileEjs": public, //コンパイルしたhtmlファイルが 吐き出される場所（gulpfile.jsからの相対パスで記述）を示す。
		"devJs": develop+"js/",
		"pubJs": public+"js/",
		"devImage": develop+"img/*.+(jpg|jpeg|png|gif|svg)",
		"pubImage": public+"img/",
	}
}

/*
=====================================
glupの実行 - 通常のHTML開発
=====================================
*/

gulp.task('default',function(){
	//監視
	gulp.watch([config.path.ejsDir, config.path.templateDir], EJS);
	gulp.watch([config.path.sassCompile], SASS);
	gulp.watch([config.path.devJs], JS);
	gulp.watch([public+'**/*.html',config.path.devJs], RELOAD);
	gulp.watch([config.path.devImage], IMAGEMIN);

	//サーバー起動
	browserSync({
		server:{
			baseDir: "./"+public//ルートとなるディレクトリ
			//proxy: 'localhost:8888/wordpress'
		}
	});

	//ejsファイルのコンパイル
	function EJS() {
		return gulp
		.src([config.path.ejsDir,'!'+config.path.templateDir])
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')//エラーがあればデスクトップに通知
		}))
		.pipe(ejs())
		.pipe(rename({ extname: '.html' }))
		.pipe(gulp.dest(config.path.afterCompileEjs));
	}

	//sassファイルのコンパイルとプレフィックスの付与
	function SASS() {
		return gulp
		.src([config.path.sassCompile,'!'+config.path.sassModule])
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')//エラーがあればデスクトップに通知
		}))
		.pipe(sass({outputStyle: 'expanded', indentType: 'tab'}))
		.pipe(autoprefixer({browsers: ['last 3 versions','ie >=11','android >=4.3'],grid: true}))//プレフィックスを付与
		.pipe(gulp.dest(config.path.afterCompileSass))//一度コンパイルしてから
		.pipe(mmq({ log: true }))
		.pipe(gulp.dest(config.path.afterCompileSass))//整形したcssを再度吐きだし
		// .pipe(gulp.dest(theme+"css/")) //★CSSをWPthemeにも複製
		.pipe(browserSync.stream());//変更したファイル部分だけをブラウザ更新
	}

	//jsファイルの移動と圧縮
	function JS() {
		return gulp
		.src(config.path.devJs+"*.js")
		// .pipe(jsmin()) // JS圧縮
		.pipe(gulp.dest(config.path.pubJs));
	}

	//画像の移動と圧縮
	function IMAGEMIN() {
		return gulp
		.src( config.path.devImage )
		.pipe(changed( config.path.pubImage ))
		.pipe(imagemin([
			imageminPng({ 
				quality: [ 0.65, 0.8 ], speed: 1 
			}),
			imageminJpg({ 
				quality: 80
			}),
			imagemin.gifsicle({
				interlaced: false
			}),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			}),
		]))
		.pipe(gulp.dest( config.path.pubImage ))
		.pipe(browserSync.stream());
	};

	//ブラウザの自動リロード
	function RELOAD(done){
		browserSync.reload();
		done();
	}

});
