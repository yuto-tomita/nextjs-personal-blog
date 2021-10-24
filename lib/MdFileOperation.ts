import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

type DirName = 'resume' | 'articles' | '_posts'

const PATH_NAME = join(process.cwd(), '_posts')

/** 引数のディレクトリ名からディレクトリ配下のファイル名を取得する */
export function getMdFileFromDir (dirName: DirName) {
	return fs.readdirSync(`./${dirName}`)
}

export function getMdFileFromArticleDir () {
	return fs.readdirSync(PATH_NAME)
}

/** 引数のファイル名から、引数のディレクトリ名配下のファイルを読み込む */
export function readFileFromFileName (fileName: string, dirName: DirName) {
	return fs.readFileSync(`./${dirName}/${fileName}`, 'utf8')
}

/** 読み込んだファイル名を扱いやすいデータ形式に変換する */
export function parseMdFile (mdFile: string) {
	return matter(mdFile)
}