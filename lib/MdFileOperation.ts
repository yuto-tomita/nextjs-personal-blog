import fs from 'fs'
import matter from 'gray-matter'

type DirName = 'resume' | 'article'

/** 引数のディレクトリ名からディレクトリ配下のファイル名を取得する */
export function getMdFileFromDir (dirName: string) {
	return fs.readdirSync(`./${dirName}`)
}

/** 引数のファイル名から、引数のディレクトリ名配下のファイルを読み込む */
export function readFileFromFileName (fileName: string, dirName: DirName) {
	return fs.readFileSync(`./${dirName}/${fileName}`, 'utf8')
}

/** 読み込んだファイル名を扱いやすいデータ形式に変換する */
export function parseMdFile (mdFile: string) {
	return matter(mdFile)
}