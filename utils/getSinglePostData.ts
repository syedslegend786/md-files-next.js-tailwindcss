import matter from 'gray-matter'
import fs from 'fs'
export const getSinglePostData = (slug: string | string[]) => {
    const folder = "posts/"
    const file = slug
    const path = `${folder}${file}.md`
    const content = fs.readFileSync(path, 'utf-8')
    return matter(content).content;
}