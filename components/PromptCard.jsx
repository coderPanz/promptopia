"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

// usePathname：这个钩子函数用于获取当前页面的路径。它返回一个字符串，表示当前页面所对应的 URL 路径。例如，如果当前页面是 /blog/posts，那么 usePathname 的返回值就是 "/blog/posts"。

// useRouter：这个钩子函数用于进行路由导航的操作。它返回一个路由对象，提供了一系列与路由相关的方法和属性，例如 push、replace 和 query 等。通过调用这些方法，你可以在组件中进行路由导航的跳转、参数传递等操作。

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  // 设置已复制的状态
  const [copied, setCopied] = useState("");

  const { data: session } = useSession();
  const pathName = usePathname();

  // 点击复制处理函数
  const handleCopy = () => {
    setCopied(post.prompt);
    // 使用 navigator.clipboard.writeText 方法将 post.prompt 的值写入到剪贴板中。navigator.clipboard 是浏览器提供的 API，用于访问和操作剪贴板。
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        {/* 用户信息 */}
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          {/* 用户头像 */}
          <Image
            src={post?.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          {/* 用户名及邮箱 */}
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post?.creator?.email}
            </p>
          </div>
        </div>

        {/* 点击复制的icon图标 */}
        <div
          className="copy_btn"
          onClick={() => {
            handleCopy;
          }}
        >
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p 
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
        {post.tag}
      </p>

      {session?.user.id === post?.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};
export default PromptCard;
