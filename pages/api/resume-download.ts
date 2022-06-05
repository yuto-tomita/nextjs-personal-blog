import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { join } from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filePath = join(process.cwd(), '_posts')
  const fileContent = fs.readFileSync(`${filePath}/Resume.md`, 'utf-8')
  const splitNewLine = fileContent.toString()

  res.status(200).json({
    resume: splitNewLine,
  })
}
