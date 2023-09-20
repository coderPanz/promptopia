"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@components/Form"

const EditPrompt = () => {
  const router = useRouter()

  // 搜索url中的查询参数
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')
  
  const [ submitting, setSubmitting ] = useState(false)
  const [ post, setPost ] = useState({
    prompt: '',
    tag: ''
  })

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`)
      const data = await res.json()

      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    if(promptId) getPromptDetails()

  }, [promptId]) // 当promptId变化时才执行effect中的函数

  const updatePrompt = async (e) => {
    // 阻止提交表单时重新加载整个界面
    e.preventDefault()
    setSubmitting(true)

    if(!promptId) return alert("缺少查询参数!")

    try {
      const res = await fetch(`api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}
export default EditPrompt