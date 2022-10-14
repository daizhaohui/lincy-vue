const gulp = require("gulp");
const ts = require("gulp-typescript");
const clean = require('gulp-clean');
const GulpClient = require("gulp");
const tsProject = ts.createProject("tsconfig.json",{declaration:true});
const run = require('gulp-run-command').default; 

gulp.task("clean",()=>{
    return  gulp.src('dist', { read: false, allowEmpty: true }).pipe(clean('dist'));
});

gulp.task("copy",()=>{
    return  gulp.src('src/config/package.json').pipe(gulp.dest('dist'));
});

gulp.task("copy_typings",()=>{
    return  gulp.src('src/**/*.d.ts').pipe(gulp.dest('dist/'));
});

gulp.task("copy_types",()=>{
    return  gulp.src('src/types/*.ts').pipe(gulp.dest('dist/types'));
});

gulp.task("clean_types",()=>{
    return  gulp.src('dist/types/*.js', { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task("compile",()=>{
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("./dist"));
});

gulp.task("pack_core",run('npm pack',{cwd:'dist'}));

gulp.task("copy_pack",()=>{
    return gulp.src('dist/*.tgz').pipe(gulp.dest('../dist'));
});

gulp.task("default",gulp.series("clean","copy","copy_typings","copy_types","compile","clean_types"));
gulp.task("pack",gulp.series("clean","copy","copy_typings","copy_types","compile","pack_core","copy_pack","clean_types"));
