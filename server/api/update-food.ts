import { createClient } from '@supabase/supabase-js';
const config = useRuntimeConfig()
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        console.log('request body:', body)
        const { error } = await supabase
            .from('food')
            .update(body)
            .eq('id', body.id)
        if (error) {
            console.log('supabase error:', error)
            return error
        }
        return { status: 202, statusText: "Update Successful" }
    } catch (error) {
        console.log('error')
    }
})