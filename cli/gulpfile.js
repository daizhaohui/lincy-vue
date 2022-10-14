const gulp = require("gulp");
const ts = require("gulp-typescript");
const clean = require('gulp-clean');
const tsProject = ts.createProject("tsconfig.json");
const run = require('gulp-run-command').default; 

gulp.task("clean_dev",()=>{
    return gulp.src('__test__/app/cli', { read: false, allowEmpty: true }).pipe(clean('__test__/app/cli'));
});

gulp.task("copy_json_dev",()=>{
    return  gulp.src('src/config/package.json').pipe(gulp.dest('__test__/app/cli'));
 });

gulp.task("copy_templates_dev",()=>{
   return  gulp.src('src/templates/**/*.*').pipe(gulp.dest('__test__/app/cli/templates'));
});

gulp.task("compile_dev",()=>{
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("__test__/app/cli"));
});

gulp.task("development",gulp.series("clean_dev","copy_json_dev","copy_templates_dev","compile_dev"));


gulp.task("clean_prod",()=>{
    return  gulp.src('dist', { read: false, allowEmpty: true }).pipe(clean('dist'));
});

gulp.task("copy_json_prod",()=>{
    return  gulp.src('src/config/package.json').pipe(gulp.dest('dist'));
 });

gulp.task("copy_templates_prod",()=>{
   return  gulp.src('src/templates/**/*.*').pipe(gulp.dest('dist/templates'));
});

gulp.task("compile_prod",()=>{
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));
});

gulp.task("production",gulp.series("clean_prod","copy_json_prod","copy_templates_prod","compile_prod"));

gulp.task("pack_cli", run('npm pack',{cwd:'dist'}));
gulp.task("copy_pack",()=>{
    return gulp.src('dist/*.tgz').pipe(gulp.dest('../dist'));
});

gulp.task("pack",gulp.series("production","pack_cli","copy_pack"));