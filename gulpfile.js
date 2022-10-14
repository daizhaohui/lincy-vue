const gulp = require("gulp");
const run = require('gulp-run-command').default; 

gulp.task("pack_cli",run('npm run pack',{cwd:'cli'}));
gulp.task("pack_core",run('npm run pack',{cwd:'core'}));
gulp.task("pack",gulp.parallel("pack_cli","pack_core"));


/** npm install  */
gulp.task("install_", run('npm install'));
gulp.task("install_cli", run('npm install',{cwd:'cli'}));
gulp.task("install_core", run('npm install',{cwd:'core'}));
gulp.task("install",gulp.parallel("install_","install_cli","install_core"));