const fs = require('fs')

let filename = "file_to_delete.txt"

console.log(`Trying to delete file ${filename}`)
console.log(`Ensure that ${filename} is created before you test this`)

fs.unlink(filename, (err) => {
    if (err) {
        console.log(`Error while deleting ${filename}: ${JSON.stringify(err)}`)
    } else {
        console.log(`${filename} deleted successfully`)
    }
})
