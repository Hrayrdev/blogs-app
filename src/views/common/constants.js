import {useStore} from "vuex";

export const API_URL = 'https://app-h5-mu.vercel.app'
// export const COMMAND= {
export const command= {
    posts:'posts',
    blogs:'blogs',
    create:'create',
    delete:'delete',
    get:'get',
    update:'update',
}
export function clearText(postRef) {
    if ('title' in postRef) {
        postRef.title = ''
        postRef.shortDescription = ''
        postRef.content = ''
    } else {
        postRef.name =''
        postRef.description =''
    }

}
export const fieldsLength = [
    { name:'', min:3, max:15 },
    { description:'', min:3, max:300 },
    { websiteUrl:'', min:3, max:100 },
    { title:'', min:3, max:15 },
    { shortDescription:'', min:3, max:100 },
    { content:'', min:3, max:1000   },
    { blogId:'', min:0, max:Infinity   },

]

