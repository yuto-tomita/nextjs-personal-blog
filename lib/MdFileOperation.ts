import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

type DirName = 'resume' | 'teck-blog'

const MD_FILE_PATH = join(process.cwd(), '_posts')

/** 引数のディレクトリ名からディレクトリ配下のファイル名を取得する */
export function getMdFileFromDir(dirName: DirName) {
  return fs.readdirSync(`${MD_FILE_PATH}/${dirName}`)
}

/** 引数のファイル名から、引数のディレクトリ名配下のファイルを読み込む */
export function readFileFromFileName(fileName: string, dirName: DirName) {
  return fs.readFileSync(`${MD_FILE_PATH}/${dirName}/${fileName}`, 'utf8')
}

/** 読み込んだファイル名を扱いやすいデータ形式に変換する */
export function parseMdFile(mdFile: string) {
  return matter(mdFile)
}

function getPathAndCreateDate(dirName: DirName) {
  return getMdFileFromDir(dirName).map((val) => {
    const mdFile = readFileFromFileName(val, dirName)
    const getParseMdFile = parseMdFile(mdFile)

    return {
      path: `${process.env.SITE_URL}${dirName}/${val.replace('.md', '')}`,
      lastmod: getParseMdFile.data.created_at
    }
  })
}

/** mdファイルが格納されているディレクトリからpath名を取得する */
export function getAllPostsPath() {
  return {
    posts: [
      ...getPathAndCreateDate('resume'),
      ...getPathAndCreateDate('teck-blog')
    ]
  }
}
