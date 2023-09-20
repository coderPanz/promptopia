// 该文件渲染我们的主页, 在nextjs中不需要再导入react
// import React from "react"
import Feed from "@components/Feed"
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          AI-Powered Prompts
        </span> 
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  )
}
// 必须默认导出组件, 否则nextjs不识别
export default Home