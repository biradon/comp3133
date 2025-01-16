const fs = require('fs')


let filename = "input_file.txt"
// // Async read the entire contest of a file
// console.log(`Trying to read the file async`)
// fs.readFile(filename, (err, data) => {
//     if (err) {
//         console.log(`Error while reading ${filename}: ${JSON.stringify(err)}`)
//     } else {
//         if (data) {
//             console.log(`Data from ${filename}: \n${data}`)
//         }
//         else
//         {
//             console.log(`No data received from ${filename}`)
//         }
//     }
// })

// console.log(`Completed reading file ${filename}`)

// Sync read operation

// console.log(`Trying to read ${filename} sync`)

// let fileData = fs.readFileSync(filename)
// console.log(`file data: ${fileData}`)
// console.log(`Completed reading file ${filename} sync`)


// use readfile within sync function
// const readFileData = async() => {
//     try {
//         const data = await fs.promises.readFile(filename)
//         console.log(`data from file: ${data}`)
//     } catch (error) {
//         console.log(`Error while reading file: ${JSON.stringify(error)}`)
//     }
// }

// readFileData()

