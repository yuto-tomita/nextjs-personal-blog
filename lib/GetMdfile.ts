import fs from 'fs'

export function getMdFileFromDir (): string[] {
	return fs.readdirSync('./Articles')
}

export function parseMdFile (mdFileName: string[]) {
	console.log(mdFileName)
	console.log(fs.readFileSync(`./Articles/${mdFileName[0]}`, 'utf8'))
}