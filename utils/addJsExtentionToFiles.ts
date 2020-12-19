
const FileHound = require('filehound')
const fs = require('fs')
const path = require('path')

console.log('=== addJsExtentionToFiles: start ===')

const dirname = path.join(__dirname, '../static')
const files = FileHound.create()
    .paths(dirname)
    .discard('node_modules')
    .ext('js')
    .find()

files.then((filePaths: any) => {
    filePaths.forEach((filepath: any) => {
        fs.readFile(filepath, 'utf8', (err: any, data: any) => {
            if (!data.match(/import .* from/g)) {
                return
            }
            const newData = data.replace(/(import .* from\s+['"])(.*)(?=['"])/g, '$1$2.js')
            if (err) throw err

            // console.log(`writing to ${filepath}`)
            fs.writeFile(filepath, newData, function (err: any) {
                if (err) {
                    throw err
                }
                // console.log('complete')
            })
        })
    })
})
console.log('addJsExtentionToFiles: complete')
