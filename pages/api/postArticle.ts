import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@lib/SupabaseClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data, error } = await supabase
    .from('md_contents')
    .insert([{ md: req.body }])

  if (error) {
    res.status(400).end()
  } else {
    res.status(200).json({
      success: true
    })
  }
}
