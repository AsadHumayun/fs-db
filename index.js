const fs = require("fs");

/**
 * Create a new filesystem database class.
 * Comes with get, set, remove and entries functions.
 * @example new Database("./db/");
 */
class Database {
  /**
   * Instantiates the filesystem database with the path specified
   * @param {string} path Directory in which the database shuold be instantiated
   * @constructor
   * @example new Database("./data/");
   */
  constructor(path) {
    if (!fs.existsSync(path)) {
      throw new Error(`[fs-db0 => NONEXISTANT_PATH_ERROR]: Path '${path}' does not exist`)
    }
    else {
      if (!path.endsWith('/')) {
        this.path = path + '/'; 
      }
      else {
        this.path = path;
      };
    };
  };
  /**
   * Determines the path of the database entry.
   * @param {string} p path of file
   * @returns {string} Database directory
   * @private
   * @method
   */
  #getFilePath(p) {
    if (!p) return this.path;
    if (p.startsWith('/')) p = p.slice(1, p.length);
    return this.path + p;
  };
  /**
   * This is used to ensure that no properties of a function are null or undefined, this is used to ensure that errors are not produced elsewhere due to a variable being undefined/null.
   * @param {object} opts Supplied options object
   * @param {string} func Name of function to format opts for
   * @returns {object} formatted object ready for injection to class methods
   * @private
   * @method
   */
  #fornatOptions(opts = {}, func) {
    if (func == "g") {
      //"g", get function
      if (!opts.precisePath) opts.precisePath = "";
      if (!opts.dataType) opts.dataType = "str";
      if (!opts.encoding) opts.encoding = "utf8";
      if (!opts.flag) opts.flag = "r";
      return opts;
    }
    return opts;
  };
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
   get(key, opts = { precisePath: "", dataType: "string", encoding: "utf8", flag: "r" }) {
    if (key.startsWith('/')) key = key.replace('/', '');
    opts = this.#fornatOptions(opts, "g");
    let path = this.#getFilePath(opts.precisePath + "/" + key);
    if (!fs.existsSync(path)) return null;
    let types = [ [ "bigint", BigInt ], [ "number", Number ], [ "date", Date ], [ "str", String ], [ "json", JSON.parse ] ];
    let value = fs.readFileSync(path, { encoding: opts.encoding, flag: opts.flag }) || null;
    let type = types.findIndex((f) => opts.dataType.toLowerCase().startsWith(f[0])) || 3;
    return value ? types[type][1](value) : null;
  };
  /**
   * Sets a value by creating a txt file in the directory specified, and under the key given with contents of the value parsed
   * @param {string} key Name of the value which is to be set
   * @param {string} value Value of KEY - contents of the txt file
   * @param {?object} options Options of which this must be set under
   * @param {?string} [options.precisePath] Any subfolder in the current path which this is meant to be set in
   * @returns {void} void
  */
  set(key, value, opts = { precisePath: "" }) {
    if (typeof value !== "string") throw new TypeError(`[FS-DB]: [set] "value" must be of type string. Received ${typeof value}`);
    if (!opts.precisePath) opts.precisePath = "";
    let path = this.#getFilePath(opts.precisePath);
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    fs.writeFileSync(path + '/' + key, value);
    return;
  };
  /**
   * Removes a value from your filesystem database, hence deleting the txt file
   * @param {string} key Name of they key to remove
   * @param {?object} opts Options to remove the file with
   * @param {?string} [opts.precisePath] Any subfolder in the current database path which this is meant to be set in
   * @returns {void} void
   */
  remove(key, opts = { precisePath: "" }) {
    if (!opts.precisePath) opts.precisePath = "";
    let path = this.#getFilePath(opts.precisePath + '/' + key);
    if (!fs.existsSync(path)) return;
    try {
      fs.unlinkSync(path);
    }
    catch (error) {
      throw new Error(`[FS-DB]: [remove] ${error}`);
    };
    return;
  };
  /**
   * Removes **all** database values from the specified directory.
   * @param {?string} precisePath path of which to wipe (eg /users/id/100/balance would become ./db/users/id/100/balance)
   * @returns {void} void
   */
  removeAll(precisePath) {
    precisePath = this.#getFilePath(precisePath ? "/" + precisePath : precisePath);
    Object.values(fs.readdirSync(precisePath)).forEach((file) => fs.unlinkSync(`${precisePath}${file}`));
    return;
  };
  /**
   * Gets all the entries saved into said <dir> path. Returns a 2 dimensional array. Ignores subfolders in said directory. It mimics the `Object.entries()` method.
   * @param {?string} dir Directory of which to get key/value pairs. If this is not specified, then it will default to Database.path
   * @param {?string} encoding Encoding type to decode the Buffer (sent directly into `Buffer.toString`)
   * @returns {Array<K<string>, V<string>} entries
   */
   entries(dir, encoding = "ascii") {
    dir = this.#getFilePath(dir ? "/" + dir : dir);
    let data = [];
    Object.values(fs.readdirSync(dir)).forEach((file) => {
      let bfr = Buffer.from(fs.readFileSync(`${dir}${file}`)).toString(encoding);
      data.push([file, bfr]);
		});
    return data;
  };
};

module.exports = Database;