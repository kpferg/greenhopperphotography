var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var del = require('del');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
		.pipe(sass())
		.pipe(gulp.dest("src/css"))
		.pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.slim.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
		.pipe(gulp.dest("src/js"))
		.pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

	browserSync.init({
		server: "./src"
	});

	gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series('sass'));
	gulp.watch("src/*.html").on('change', browserSync.reload);
}));

// Remove existing dist build
gulp.task('clean', function(){
	return del(['dist']);
});

gulp.task('dist', function(){
	return gulp.src(['src/*', '!src/scss'])
		.pipe(gulp.dest("dist"));
});

gulp.task("build", gulp.series("clean", "sass", "js", "dist"));

gulp.task("default", gulp.series("clean", "sass", "js"));
