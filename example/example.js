var read = require("../lib/read.js")

read({prompt: "Username: ", default: "test-user" }, function (er, user) {
  read({prompt: "Password: ", default: "test-pass", silent: true }, function (er, pass) {
    read({prompt: "Enter 4 characters: ", num: 4 }, function (er, four) {
      console.error(user + ":" + pass + " " + JSON.stringify(four))
      console.error("If the program doesn't end right now,\n"
                   +"then you may be experiencing this bug:\n"
                   +"https://github.com/joyent/node/issues/2257")
    })
  })
})
