import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

type DirName = 'resume' | 'articles' | 'teck-blog'

const MD_FILE_PATH = join(process.cwd(), '_posts')

/** 引数のディレクトリ名からディレクトリ配下のファイル名を取得する */
export function getMdFileFromDir (dirName: DirName) {
	return fs.readdirSync(`./${dirName}`)
}

export function getMdFileFromArticleDir (dirName: DirName) {
	return fs.readdirSync(`${MD_FILE_PATH}/${dirName}`)
}

/** 引数のファイル名から、引数のディレクトリ名配下のファイルを読み込む */
export function readFileFromFileName (fileName: string, dirName: DirName) {
	return fs.readFileSync(`${MD_FILE_PATH}/${dirName}/${fileName}`, 'utf8')
}

/** 読み込んだファイル名を扱いやすいデータ形式に変換する */
export function parseMdFile (mdFile: string) {
	return matter(mdFile)
}