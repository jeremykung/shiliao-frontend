import { createClient } from '@supabase/supabase-js';
const config = useRuntimeConfig()
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        console.log('request body:', body)
        const { data, error } = await supabase
            .from('food')
            .insert(body)
        console.log('supabase result data:', data)
        if (error) {
            console.log('supabase error:', error)
            return error
        }
        return data
        // const { data, error } = await supabase.from('food').select()
        // if (error) {
        //     console.log('supabase error:', error)
        // }
        // const allFoods = data
        // console.log('returning supabase data:', allFoods)
        // return allFoods
    } catch (error) {
        console.log('error')
    }
})