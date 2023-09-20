import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {

  try {
    await connectToDB()

    const prompt = await Prompt.findById(params.id).populate('creator')

    if(!prompt) return new Response("查找失败!", {status: 404})
    return new Response(JSON.stringify(prompt), {status: 200})

  } catch (error) {
    return new Response("服务器异常!", {status: 404})
  }
}

export const PATCH = async (req, { params }) => {
  
  const { prompt, tag } = await req.json()

  try {
    await connectToDB()

    const promptUpdate = await Prompt.findById(params.id)
    
    if(!promptUpdate) return new Response("更新失败!", {status: 404})

    promptUpdate.prompt = prompt
    promptUpdate.tag = tag

    await promptUpdate.save()

    return new Response("更新成功!", {status: 200})

  } catch (error) {
    return new Response("更新失败!", {status: 500})
  }
}

export const DELETE = async (req, { params }) => {
  try {

    await connectToDB()
    await Prompt.findByIdAndDelete(params.id)

    return new Response("删除成功!", {status: 200})
  } catch (error) {
    return new Response("删除失败!", {status: 500})
  }
}