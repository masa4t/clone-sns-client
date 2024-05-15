"use client";
import { useAuth } from "@/app/context/auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { useState, useEffect, useRef } from "react";

const Page = ({ params }: { params: Params }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    imageFile: "",
  });
  const [formValues, setFormValues] = useState({
    name: "",
    bio: "",
    imageFile: null,
  });
  const [imagePreview, setImagePreview] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      const { username, profile } = user;
      setUserData({
        name: username || "",
        bio: profile?.bio || "",
        imageFile: profile?.profileImageUrl || "",
      });
      setFormValues({
        name: username || "",
        bio: profile?.bio || "",
        imageFile: null,
      });
      setImagePreview(profile?.profileImageUrl || "");
      setLoading(false);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        imageFile: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("bio", formValues.bio);
    if (formValues.imageFile) {
      formData.append("image", formValues.imageFile);
    }

    const userId = user?.id;

    try {
      const response = await fetch(
        `http://localhost:4000/api/profile/update/${userId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setUserData({
          name: result.username,
          bio: result.profile?.bio || "",
          imageFile: result.profile?.profileImageUrl || "",
        });
        setImagePreview(result.profile?.profileImageUrl || "");

        window.location.reload();

        // ユーザー情報を再設定して更新を反映
        // setUser((prevUser) => ({
        //   ...prevUser,
        //   username: result.username,
        //   profile: {
        //     ...prevUser.profile,
        //     bio: result.profile?.bio || "",
        //     profileImageUrl: result.profile?.profileImageUrl || "",
        //   },
        // }));

        console.log("Profile updated successfully");
      } else {
        console.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-4xl font-bold">Loading...</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center  overflow-hidden">
      <div className="mt-24 mb-10"></div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div style={{ position: "relative" }}>
          <label htmlFor="fileInput">
            <img
              className="w-40 h-40 rounded-full mb-4 cursor-pointer"
              alt="User Avatar"
              name="image"
              src={imagePreview}
            />
          </label>
          <input
            id="fileInput"
            type="file"
            name="imageFile"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            名前
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="bio"
          >
            自己紹介
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bio"
            name="bio"
            type="text"
            value={formValues.bio}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-7"
          type="submit"
        >
          変更
        </button>
      </form>
    </div>
  );
};

export default Page;
