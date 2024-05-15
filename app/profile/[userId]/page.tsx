import apiClient from "@/app/lib/apiClient";
import { PostType, ProfileType } from "@/app/types";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import React from "react";

interface Data {
  profile: ProfileType | null;
  posts: PostType[] | null;
}

const getProfile = async (userId: string): Promise<Data> => {
  try {
    const response = await apiClient.get(`/users/profile/${userId}`);
    const postres = await apiClient.get(`/posts/${userId}`);
    const profile = response.data;
    const posts = postres.data;
    return {
      profile,
      posts,
    };
  } catch (err) {
    console.log(err);
    return {
      profile: null,
      posts: null,
    };
  }
};

const Userpage = async ({ params }: { params: Params }) => {
  const { userId } = params;
  const { profile, posts }: Data = await getProfile(userId);

  console.log(profile);
  console.log(posts);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* プロフィール画像 */}
              <img
                className="w-20 h-20 rounded-full mr-4"
                alt="User Avatar"
                src={profile?.profileImageUrl}
              />
              <div>
                <h2 className="text-2xl font-semibold mb-1">
                  {profile?.user.username}
                </h2>
                <p className="text-gray-600">{profile?.bio}</p>
              </div>
            </div>
            {/* 編集ボタン */}
            <Link
              href={`/setting/${userId}`}
              // as={`/setting/${userId}`}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              編集
            </Link>
          </div>
        </div>

        {posts?.map((post: PostType) => (
          <div className="bg-white shadow-md rounded p-4 mb-2" key={post.id}>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <img
                  className="w-10 h-10 rounded-full mr-2"
                  alt="User Avatar"
                  src={profile?.profileImageUrl}
                />
                <div>
                  <h2 className="font-semibold text-md">
                    {post.author.username}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Userpage;
