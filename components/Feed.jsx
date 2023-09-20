"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState('') // 记录输入框的状态

  // 获取数据
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt", {
        method: 'POST',
        body: JSON.stringify({
          inputValue: inputValue
        })
      });
      const data = await res.json(); // 将响应体解析为 JSON 数据。
      setPosts(data);
    };
    fetchPosts();
  }, [inputValue]);

  // 输入关键字查询对应卡片
  const handleSearchCard = () => {
    const inputEl = document.getElementById("keywords")
    setInputValue(inputEl.value)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          id="keywords"
          type="text"
          placeholder="搜索标签或用户名"
          value={inputValue}
          onChange={handleSearchCard}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};
export default Feed;
