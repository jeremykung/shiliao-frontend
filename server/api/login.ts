import { createClient } from '@supabase/supabase-js';
const config = useRuntimeConfig()
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        console.log('request body:', body)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: body.email,
            password: body.password,
        })
        console.log('supabase result data:', data)
        if (error) {
            console.log('supabase error:', error)
            return { data: error }
        }
        return { status: 200, statusText: "User Logged In", data: data }
    } catch (error) {
        console.log('error logging in:', error)
        return { status: 400, statusText: "Error", error: error }
    }
})

