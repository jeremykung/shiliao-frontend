export const useUserStore = defineStore('userStore', {
    state: () => ({
        id: '',
        email: '',
    }),
    actions: {
        // async login(loginInfo: Object) {
        //     console.log('logging in as:', loginInfo)
        //     try {
        //         const response = await $fetch('/api/login', loginInfo)
        //         console.log('login data:', response)
        //     } catch (error) {
        //         console.log('user store login error:', error)
        //     }
        // },
        // async signup(signupInfo: Object) {
        //     console.log('signing up as:', signupInfo)
        //     const infos = await $fetch('/api/signup', signupInfo)
        //     console.log('signup data', infos)
        // },
        async setData(userData) {
            this.id = userData.id,
            this.email = userData.email
        },
        async fetch() {
            // check if already logged in
        }
    }
})