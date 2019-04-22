/**
 Borra la carpeta build donde se mueve la app para la ejecución.
 */

import { cleanDir } from "./lib/fs";

/**
 * Cleans up the output (build) directory.
 */
function clean() {
  return Promise.all([
    cleanDir("build/*", {
      nosort: true,
      dot: true,
      ignore: ["build/.git"]
    })
  ]);
}

export default clean;
