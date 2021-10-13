import fs from 'fs'
import matter from 'gray-matter'

export function getMdFileFromDir () {
	return fs.readdirSync('./Articles')
}

export function readFileFromFileName (fileName: string) {
	return fs.readFileSync(`./Articles/${fileName}`, 'utf8')
}

export function parseMdFile (mdFile: string) {
	return matter(mdFile)
}