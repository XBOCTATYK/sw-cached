const fs = require('fs')
const path = require('path')

class CopyDirUtil {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    createDir(dirName) {
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName)
        }
    }

    readDir(dir, arr) {
        if (!dir) return

        do {
            const currentDir = dir.readSync()
            if (currentDir == null) break;
            if (currentDir.isDirectory()) {
                const dirName = path.resolve(dir.path, currentDir.name)
                const newDir = fs.opendirSync(dirName)
                this.createDir(dirName.replace(this.from, this.to))
                this.readDir(newDir, arr)
            } else {
                arr.push([path.resolve(dir.path, currentDir.name), currentDir])
            }

        } while (true)
    }
}

function copyDirRecursive(from, to) {
    const resFrom = path.resolve(from)
    const resTo = path.resolve(to)

    if (!fs.existsSync(to)) {
        fs.mkdirSync(to)
    }

    const curDir = fs.opendirSync(resFrom)
    const files = []
    const copyDirUtils = new CopyDirUtil(resFrom, resTo)
    copyDirUtils.readDir(curDir, files)

    files.forEach(([curPath, item]) => {
        fs.copyFileSync(curPath, `${curPath}`.replace(resFrom, resTo))
    })
}

module.exports = copyDirRecursive

copyDirRecursive('static', 'dist')



