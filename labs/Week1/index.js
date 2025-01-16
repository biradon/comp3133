console.log("Week 1 - Buffer Example")

// Create a Buffer from String data
let buf1 = Buffer.from("Hello")

// console.log(buf1.toJSON())
// console.log(`buf1: ${buf1}`)


// for (let i = 0; i < buf1.length; i++) {
//     console.log(buf1[i])
// }

// console.log(`Buffer in String format: ${buf1.toString()}`)
// console.log(`Buffer in JSON format: ${JSON.stringify(buf1.toJSON())}`)
// console.log(`Buffer in Hex format: ${buf1.toString('hex')}`)
// console.log(`Buffer in UTF-8 format: ${buf1.toString('utf-8')}`)
// console.log(`Buffer in UTF-16le format: ${buf1.toString('utf-16le')}`)


// buf1 = Buffer.from("😡💀🙋‍♂️")

// console.log(`Buffer in String format: ${buf1.toString()}`)
// console.log(`Buffer in JSON format: ${JSON.stringify(buf1.toJSON())}`)
// console.log(`Buffer in Hex format: ${buf1.toString('hex')}`)
// console.log(`Buffer in UTF-8 format: ${buf1.toString('utf-8')}`)
// console.log(`Buffer in UTF-16le format: ${buf1.toString('utf-16le')}`)

let buf2 = Buffer.alloc(10)
console.log(buf2)
console.log(`buf2: ${buf2}`)

buf2.write("A", 0)
// buf2[0] = 'A'
buf2.write("👋", 4)
// buf2[4] = '👋'
buf2.write("🧘", 5)
// buf2[9] = '#'

console.log(buf2)
console.log(`buf2: ${buf2}`)

let buf3 = Buffer.concat([buf1, buf2])

console.log(`buf3: ${buf3}`)

console.log(`========================`)

buf2.copy(buf3)
console.log(`buf2: ${buf2}`)

buf2 = Buffer.from("ABC")
buf3 = Buffer.from("ABC")

output = Buffer.compare(buf2, buf3)
console.log(output)