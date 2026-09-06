import { createClient } from '@supabase/supabase-js'

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) }
  }

  try {
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY
    )

    const payload = JSON.parse(event.body)

    const { data, error } = await supabase
      .from('trade_bulk_pos')
      .insert([payload])
      .select()

    if (error) throw error

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}
