import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// Next.js 是一个 React 框架，用于构建服务器渲染的应用程序。它提供了路由功能，允许你定义各种 HTTP 请求的处理函数，并根据请求的 URL 调用相应的处理函数。

// 通过将该函数导出，可以在 Next.js 的路由中引入并使用该处理函数。
export const POST = async (req) => {
  // req.json() 是 Next.js 提供的方法，用于将请求体解析为 JSON 格式的 JavaScript 对象。
  const { prompt, userId, tag } = await req.json();

  try {
    // 连接数据库并添加prompt
    await connectToDB();

    const newPrompt = new Prompt({
      // ES6对象字面量简写。这意味着当对象字面量的属性名和变量名相同的时候，可以只写变量名，并省略掉 : 和 value 部分。
      creator: userId,
      prompt,
      tag,
    })

    await newPrompt.save()

    return new Response(JSON.stringify(newPrompt), {status: 201})
  } catch (error) {
    console.log(error);
    return new Response("创建提示失败!", {status: 500})
  }
};
