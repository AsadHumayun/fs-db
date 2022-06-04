declare module 'fs-db0' {
/**
 * Create a new filesystem database class.
 * Comes with get, set, remove and entries functions.
 * @example new Database("./db/");
 */
  class Database {
    #private;
    /**
     * Instantiates the filesystem database with the path specified
     * @param {string} path Directory in which the database shuold be instantiated
     * @constructor
     * @example new Database("./data/");
     */  
    constructor(path: string);

    /**
     * The path to the database
     * @type {string}
     */
    path: string;

  /**
   * Gets the value of a key from the database with optional data type to return it as.
   * @param {string} key Name of key to get from database
   * @param {?object} opts Options
   * @param {?string} [opts.precisePath] Additional precision for the path of the file added on top of the path specified
   * @param {?string} [opts.dataType] Options as to what data type this value should be returned as. This value defaults to `"string"`
   * @param {?string} [opts.encoding] Encoding to get the value in. This value is parsed directly into fs itself. Defaults to `"utf8"`
   * @param {?string} [opts.flag] Flag which is to be used when reading the contents of the file. This value defaults to `"r"`
   * @returns {?any} value
   */
    get(key: string, opts?: {
        precisePath?: string | null;
        dataType?: string | null;
        encoding?: string | null;
        flag?: string | null;
    } | null): any | null;

  /**
   * Sets a value by creating a txt file in the directory specified, and under the key given with contents of the value parsed
   * @param {string} key Name of the value which is to be set
   * @param {string} value Value of KEY - contents of the txt file
   * @param {?object} opts Options of which this must be set under
   * @param {?string} [options.precisePath] Any subfolder in the current path which this is meant to be set in
   * @returns {void} void
  */
    set(key: string, value: string, opts?: {
        precisePath?: string | null;
    } | null): void;

  /**
   * Removes a value from your filesystem database, hence deleting the txt file
   * @param {string} key Name of they key to remove
   * @param {?object} opts Options to remove the file with
   * @param {?string} [opts.precisePath] Any subfolder in the current database path which this is meant to be set in
   * @returns {void} void
   */
    remove(key: string, opts?: {
        precisePath?: string | null;
    } | null): void;

  /**
   * Removes **all** database values from the specified directory.
   * @param {?string} precisePath path of which to wipe (eg /users/id/100/balance would become ./db/users/id/100/balance)
   * @returns {void} void
   */
    removeAll(precisePath?: string | null): void;

    /**
   * Gets all the entries saved into said <dir> path. Returns a 2 dimensional array. Ignores subfolders in said directory. It mimics the `Object.entries()` method.
   * @param {?string} dir Directory of which to get key/value pairs. If this is not specified, then it will default to Database.path
   * @param {?string} encoding Encoding type to decode the Buffer (sent directly into `Buffer.toString`)
   * @returns {string[][]} entries
   */
    entries(dir?: string | null, encoding?: string | null): string[][];
  }
}