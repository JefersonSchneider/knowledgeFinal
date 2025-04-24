import Vue from 'vue'

export const userKey = '__knowledge_user'
//export const baseApiUrl = 'http://localhost:4000'
export const baseApiUrl = process.env.VUE_APP_API_URL || 'http://knowledge-backend-env.eba-5khzgqpw.us-east-1.elasticbeanstalk.com'
export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }