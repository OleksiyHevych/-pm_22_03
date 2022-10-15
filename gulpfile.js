import gulp from "gulp";
import deleteAsync from "del";
import imagemin from "gulp-imagemin";
import browsersync from "browser-sync";
import * as nodePath from "path";
const rootFolder=nodePath.basename(nodePath.resolve());
const buildFolder=`./public`;
const srcFolder=`./src`;
const path={
    build:{
        indexhtml:`${buildFolder}/`,
        html:`${buildFolder}/html/`,
        js:`${buildFolder}/js/`,
        css:`${buildFolder}/css/`,
        fonts:`${buildFolder}/fonts/`,
        img:`${buildFolder}/img/`,
        sass:`${buildFolder}/sass/`,
        files:`${srcFolder}/`
    },
    src:{
        indexhtml:`${srcFolder}/*.html`,
        html:`${buildFolder}/html/*.*`,
        js:`${srcFolder}/js/*.js`,
        css:`${srcFolder}/css/*.css`,
        fonts:`${srcFolder}/fonts/*.*`,
        img:`${srcFolder}/img/*.*`,
        sass:`${srcFolder}/sass/*.sass`,
        files:`${srcFolder}/**/*.*`
    },
    watch:{
        indexhtml:`${srcFolder}/*.html`,
        html:`${buildFolder}/html/*.*`,
        js:`${srcFolder}/js/*.js`,
        css:`${srcFolder}/css/*.css`,
        fonts:`${srcFolder}/fonts/*.*`,
        img:`${srcFolder}/img/*.*`,
        sass:`${srcFolder}/sass/*.sass`
    },
    clean:buildFolder,
    buildFolder:buildFolder,
    srcFolder:srcFolder,
    rootFolder:rootFolder,
    ftp:``
}
global.app={
    path:path,
    gulp:gulp
}

const indexhtml = () => {
    return app.gulp.src(path.src.indexhtml)
        .pipe(app.gulp.dest(path.build.indexhtml))
    browsersync().reload();
}

const html = () => {
    return app.gulp.src(path.src.html)
        .pipe(app.gulp.dest(path.build.html))
}

const img = () => {
    return app.gulp.src(path.src.img)
        .pipe (imagemin ({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(app.gulp.dest(path.build.img))
};
const css = () => {
    return app.gulp.src(path.src.css)
        .pipe(app.gulp.dest(path.build.css))
}
const js = () => {
    return app.gulp.src(path.src.js)
        .pipe(app.gulp.dest(path.build.js))
};

const fonts = () => {
    return app.gulp.src(path.src.fonts)
        .pipe(app.gulp.dest(path.build.fonts))
}

function watcher () {
    gulp.watch(path.watch.html,html)
    gulp.watch(path.watch.js,js)
}
const reset = () => {
    return deleteAsync(app.path.clean);
}
const server = () => {
    browsersync.init({
        server:{
            baseDir:`./public/`
        },
        notify:false,
        port:2999
    })
}

gulp.task ( "default", );
const mainTask=gulp.parallel(watcher,server)
const dev=gulp.series(reset,indexhtml,html,js, img,css,fonts,mainTask)
gulp.task('default',dev)