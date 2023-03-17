import { IPostContent } from "@/types/post"
import matter from 'gray-matter'
import fs from 'fs'
export const getPostsMetaData = (): IPostContent[] => {
    const folder = "posts/"
    const files = fs.readdirSync(folder)
    const markdownposts = files.filter((file) => file.endsWith(".md"))
    const matterresult = markdownposts.map((file) => {
        const filecontent = fs.readFileSync(`${folder}${file}`, "utf-8")
        const _matter = matter(filecontent)
        return {
            date: _matter.data.date,
            subtitle: _matter.data.subtitle,
            title: _matter.data.title,
            slug: file.replace(".md", "")
        } as IPostContent
    })
    return matterresult
}