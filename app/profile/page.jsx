"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { useRouter } from "next/navigation";

const MyProfile = () => {

  const { data: session } = useSession()

  const [myPosts, setMyPosts] = useState([]);

  const router = useRouter()
  // 获取特定用户的profile数据
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json(); // 将响应体解析为 JSON 数据。必须要加await否则setPosts还没接收到完整的格式化后的数据
      setMyPosts(data)
    };
    // 如果该用户存在, 如果不加判断会立即报错
    if(session?.user?.id) fetchPosts();
    
  }, [[session?.user.id]]);
  
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "你确定要删除这条提示吗?"
    );
    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        })

        const filteredPosts = myPosts.filter(item => item._id !== post.id);

        setMyPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  };

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
