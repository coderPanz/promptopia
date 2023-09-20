import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { inputValue } = await req.json();

  try {
    await connectToDB();

    // 构建正则表达式对象，用于模糊匹配
    const regex = new RegExp(inputValue, "i"); // 此处的 'i' 表示不区分大小写

    if(!inputValue) {
      const prompts = await Prompt.find({}).populate("creator")
      return new Response(JSON.stringify(prompts), { status: 200 });
    } else {
      const prompts = await Prompt.find({
        $or: [
          { prompt: regex },
          { tag: regex }
        ]
      }).populate("creator"); // 填充createor指向的字段数据
      return new Response(JSON.stringify(prompts), { status: 200 });
    }

  } catch (error) {
    console.log(error);
    return new Response("查找失败!", { status: 500 });
  }
};
