//Dependencies
const Request = require("request")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log("node index.js <amount(200 each)> <output>")
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid amount.")
    process.exit()
}

if(isNaN(Self_Args[0])){
    console.log("amount is not an int.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid output.")
    process.exit()
}

var accounts = ""
var generate_index = 0

generate()
function generate(){
    if(generate_index == Self_Args[0]){
        Fs.writeFileSync(Self_Args[1], accounts, "utf8")
        console.log("Done generating and the generated accounts has been saved.")
        process.exit()
    }

    Request("https://combolist.org/generate", function(err, res, body){
        const emailsandpasswords = Array.from(body.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+:[a-zA-Z0-9._-]+/g))
        
        for( i in emailsandpasswords ){
            if(!accounts.length){
                accounts = emailsandpasswords[i]
            }else{
                accounts += `\n${emailsandpasswords[i]}`
            }
        }

        generate_index++
        generate()
    })
}
