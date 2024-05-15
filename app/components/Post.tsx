import React, { memo } from "react";
import { PostType } from "../types";
import Link from "next/link";
import { useAuth } from "../context/auth";
import apiClient from "../lib/apiClient";

// eslint-disable-next-line react/display-name
const Post = memo(
  ({
    post,
    setLatestPosts,
  }: {
    post: PostType;
    setLatestPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  }) => {
    const { user } = useAuth();

    const onDelete = async (postId: number) => {
      try {
        // 投稿の削除APIを呼び出す
        await apiClient.delete(`/posts/delete/${postId}`);
        console.log("投稿が削除されました");
        // setLatestPosts を使用して latestPosts を更新
        setLatestPosts((prevPosts) =>
          prevPosts.filter((prevPost) => prevPost.id !== postId)
        );
      } catch (error) {
        console.error("投稿の削除中にエラーが発生しました", error);
      }
    };

    return (
      <div className="bg-white shadow-md rounded p-4 mb-4 relative">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Link href={`/profile/${post.authorId}`}>
              <img
                className="w-10 h-10 rounded-full mr-2"
                src={post.author.profile?.profileImageUrl || ""}
                alt="User Avatar"
              />
            </Link>
            <div>
              <h2 className="font-semibold text-md">{post.author?.username}</h2>
              <p className="text-gray-500 text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-gray-700">{post.content}</p>
        </div>
        {user && post.author && user.id === post.author.id && (
          <button
            onClick={() => onDelete(post.id)}
            className="p-1 absolute bottom-2 right-5 bg-red-200 text-red-500 font-semibold hover:text-red-900 rounded-md"
          >
            消去
          </button>
        )}
      </div>
    );
  }
);

export default Post;
