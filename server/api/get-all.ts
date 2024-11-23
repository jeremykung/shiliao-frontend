import { createClient } from '@supabase/supabase-js';
const config = useRuntimeConfig()
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)

export default defineEventHandler(async (event) => {
    try {
        const { data, error } = await supabase.from('food').select()
        if (error) {
            console.log('supabase error:', error)
        }
        const allFoods = data
        console.log('returning supabase data:', allFoods)
        return allFoods
    } catch (error) {
        console.log('error')
    }
})