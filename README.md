For reading user input from stdin.

## USAGE

```javascript
var read = require("read")
read(options, callback)
```

The callback gets called with either the user input, or the default
specified, or an error, in the traditional `callback(error, result)`
node style.

## OPTIONS

Every option is optional.

* `prompt` What to write to stdout before reading input.
* `silent` Don't echo the output as the user types it.
* `num` Max number of chars to read from terminal.
* `timeout` Number of ms to wait for user input before giving up.
* `default` The default value if the user enters nothing.
* `stdin` Readable stream to get input data from. (default `process.stdin`)
* `stdout` Writeable stream to write prompts to. (default: `process.stdout`)

If silent is true, or num is set, and the input is a TTY,
then read will set raw mode, and read character by character.

At this time, backspace and arrow keys are not supported very well.
It's probably not too hard to add support for this, perhaps using node's
built-in readline module.

## CONTRIBUTING

Patches welcome.

## BUGS

In node 0.6.0 through 0.6.5, you must explicitly call
`process.stdin.destroy()` or `process.exit()` when you know that your
program is done reading, or else it will keep the event loop running
forever.

See: <https://github.com/joyent/node/issues/2257>
