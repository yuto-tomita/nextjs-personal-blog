import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@lib/SupabaseClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const values = JSON.parse(req.body)

  const { error } = await supabase.from('articles').insert([
    {
      title: values.title,
      description: values.body,
      contents: values.body,
      tag: values.tag,
      slug: values.slug,
      image: values.image
    }
  ])

  if (error) {
    res.status(400).json({ description: error })
    res.end()
  } else {
    res.status(200).json({
      success: true
    })
  }
}
