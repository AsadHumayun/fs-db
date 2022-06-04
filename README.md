# fs-db
> Using your very own filesystem as a database: a little project of mine

This package allows for the use of your very own filesystem as a fully mutable database. The main concept behind this project is for speed, and the ability for data to be able to be read and interpreted by humans. 

### **How it Works**
This little project works by setting a text file with the name as its key, and its contents then become its value. For exmaple, by calling `Database.set("abc", 123)`, a new file called `abc` will be created, and it will have contents of `"123"` (without quotes).

**New:** `typings/index.d.ts`: this package now supports typescript type declarations!

# **__Documentation__**
**Assumption:**
All code snippets assume the following:
```js
const Fsdb = require("fs-db0");
const db = new Fsdb("./data/");
```

## class Database

### **constructor(path: string)** -> `Database`
   * Instantiates the Database.
   * @param {`string`} `path` Directory in which the database shuold be instantiated

@example
```js
const Fsdb = require("fs-db0");
const db = new Fsdb("./data/");
```

### **Method get(key: string, options: ?object)** -> `?any`
   * Gets the value of a key from the database with optional data type to return it as.
   * @param {`string`} `key` Name of key to get from database
   * @param {`?object`} `opts` Options 
   * @param {`?string`} `[opts.precisePath]` Additional precision for the path of the file added on top of the path specified
   * @param {`?string`} `[opts.dataType]` Options as to what data type this value should be returned as. This value defaults to `"string"`
   * @param {`?string`} `[opts.encoding]` Encoding to get the value in. This value is parsed directly into fs itself. Defaults to `"utf8"`
   * @param {`?string`} `[opts.flag]` Flag which is to be used when reading the contents of the file. This value defaults to `"r"`
   * @returns {`?any`} `value`

@example
```js
db.get("bal", { dataType: "number" });    // 1234
db.get("bal", { dataType: "string" });    // "1234"
db.get("non-existent-value");             // null
```

### **Method set(key: string, value: string, options: ?object)** -> `void`
   * Sets a value by creating a txt file in the directory specified, and under the key given with contents of the value parsed
   * @param {`string`} `key` Name of the value which is to be set
   * @param {`string`} `value` Value of KEY - contents of the txt file
   * @param {`?object`} `options` Options of which this must be set under
   * @param {`?string`} `[options.precisePath]` Any subfolder in the current path which this is meant to be set in
   * @returns {`void`} `void`

```js
db.set("bal", "999");
db.get("bal");        // "999"
```

### **Method remove(key: string, options: ?object)** -> `void`
   * Removes a value from your filesystem database, hence deleting the txt file
   * @param {`string`} `key` Name of they key to remove
   * @param {`?object`} `opts` Options to remove the file with
   * @param {`?string`} `[opts.precisePath]` Any subfolder in the current database path which this is meant to be set in
   * @returns {`void`} `void`

```js
db.remove("bal");
db.get("bal")       // null
```

### **Method removeAll(precisePath?: string)** -> `void`
   * Removes **all** database values from the specified directory.
   * @param {`?string`} `precisePath` path of which to wipe (eg /users/id/100/balance would become ./db/users/id/100/balance)
   * @returns {`void`} `void`

```js
db.removeAll("users/balances");   // wipes only `{database.path}/users/balances`, if exists
db.removeAll();                   // wipes entire db
```

### **Method entries(dir: ?string)** -> `Array<KEY<string>, VALUE<string>>`
   * Gets all the entries saved into said `<dir>` path. Returns a 2 dimensional array. Ignores subfolders in said directory. It mimics the `Object.entries()` method.
   * @param {`?string`} `dir` Directory of which to get key/value pairs. If this is not specified, then it will default to `Database.path`
   * @param {`?string`} `encoding` Encoding type to decode the Buffer (sent directly into `Buffer.toString`). Default is `"ascii"`
   * @returns {`Array<K<string>, V<string>`} `entries`

```js
db.set("bal", "999");
db.set("id", "1");

db.entries();       // [ ["bal", "999"], ["id", "1"] ]
```

## Author

**fs-db0** © [Asad](https://github.com/AsadHumayun).  
Authored and maintained by Asad.

> GitHub [@AsadHumayun](https://github.com/AsadHumayun)