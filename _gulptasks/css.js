import {
	src,
	dest
} from "gulp";
import sass from "gulp-sass";
import less from "gulp-less";
import cssnano from "cssnano";
import rename from "gulp-rename";
import concat from "gulp-concat";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import sourcemap from "gulp-sourcemaps";
import cssSort from "css-declaration-sorter";
import {
	readFileSync
} from "graceful-fs";



export const cssTask = () => {

	const glob = JSON.parse(readFileSync("gulp.json"));
	const cssTaskOption = {};

	cssTaskOption["sass"] = {
		path: [
			"src/components/_core/**.sass",
			"src/components/_global/**.sass",
			"src/components/**/**.sass"
		],
		concatName: "main.sass",
		generator: sass(),
	};
	cssTaskOption["scss"] = {
		path: [
			"src/components/_core/**.scss",
			"src/components/_global/**.scss",
			"src/components/**/**.scss"
		],
		concatName: "main.scss",
		generator: sass(),
	};
	cssTaskOption["less"] = {
		path: [
			"src/components/_core/**.less",
			"src/components/_global/**.less",
			"src/components/**/**.less"
		],
		concatName: "main.less",
		generator: less(),
	};

	const cssGenerator = glob.config["css-generator"];

	return src(cssTaskOption[cssGenerator].path)
		.pipe(sourcemap.init())
		.pipe(concat(cssTaskOption[cssGenerator].concatName))
		.pipe(cssTaskOption[cssGenerator].generator)
		.pipe(postcss([
			autoprefixer({
				browsers: ["last 4 version", "IE 9"],
				cascade: false
			}),
			cssnano(),
			cssSort({
				order: "concentric-css",
			})
		]))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(sourcemap.write("."))
		.pipe(dest("dist/css"))
};

module.exports = cssTask;