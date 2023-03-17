import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import fs from 'fs'
import Link from 'next/link'
import matter from 'gray-matter'
import { getPostsMetaData } from '@/utils/getPostsMetaData'
import { IPostContent } from '@/types/post'

interface HomeProps {
  data: IPostContent[]
}
const Home: NextPage<HomeProps> = (props) => {
  console.log({ props })
  return (
    <div>
      {
        props.data.map((val, index) => (
          <div key={index}>
            <Link href={`/post/${val.slug}`} className='text-blue-600 underline underline-offset-4'>{val.slug}</Link>
            <h5>{val.title}</h5>
            <h6>{val.date}</h6>
            <p>{val.subtitle}</p>
          </div>
        ))
      }
    </div>
  )
}
export default Home
export const getServerSideProps: GetServerSideProps<HomeProps> = async (ctx) => {
  const postMetaData = getPostsMetaData()
  return {
    props: {
      data: postMetaData
    }
  }
}