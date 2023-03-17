import fs from 'fs'
import React from 'react'
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Markdown from 'markdown-to-jsx'
import matter from 'gray-matter'
import { getPostsMetaData } from '@/utils/getPostsMetaData'
import { getSinglePostData } from '@/utils/getSinglePostData'
interface PostProps {
    slug: string | string[] | undefined,
    content: string
}
const Post: NextPage<PostProps> = ({ content, slug }) => {
    return (
        <div>
            <h1>{slug}</h1>
            <article className="prose prose-invert lg:prose-xl w-max m-auto prose-img:mx-auto  bg-black">
                <Markdown>{content}</Markdown>
            </article>
        </div >
    )
}

export default Post
export const getStaticPaths: GetStaticPaths = async () => {
    const metadata = getPostsMetaData()

    return {
        paths: metadata.map((data) => ({ params: { slug: data.slug } })),
        fallback: false, // can also be true or 'blocking'
    }
}

export const getStaticProps: GetStaticProps<PostProps> = (ctx) => {
    const slug = ctx.params?.slug

    let content = ""
    if (slug) {
        content = getSinglePostData(slug)
    }
    return {
        props: {
            content: content,
            slug: slug
        }
    }
}
