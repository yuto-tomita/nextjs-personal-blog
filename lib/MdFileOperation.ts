import fs from 'fs'
import matter from 'gray-matter'

export function getMdFileFromDir () {
	return fs.readdirSync('./articles')
}

export function readFileFromFileName (fileName: string) {
	return fs.readFileSync(`./articles/${fileName}`, 'utf8')
}

export function parseMdFile (mdFile: string) {
	return matter(mdFile)
}