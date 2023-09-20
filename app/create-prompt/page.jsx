"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import Form from "@components/Form"
import { useRouter } from "next/navigation"

const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [ submitting, setSubmitting ] = useState(false)
  const [ post, setPost ] = useState({
    prompt: '',
    tag: ''
  })

  const createPrompt = async (e) => {
    // 阻止提交表单时重新加载整个界面
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      })

      // res.ok 是 Fetch API 返回的一个布尔值，用于表示请求是否成功。
      if(res.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }

  }
  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}
export default CreatePrompt