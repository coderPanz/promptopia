import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// 从请求中解析出的参数对象。
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id
    }).populate('creator')
    
    return new Response(JSON.stringify(prompts), {status: 200})
  } catch (error) {
    return new Response("查找失败!", {status: 500})
  }
};
