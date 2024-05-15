export interface UserType {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: PostType[];
  profile: ProfileType;
}

export interface PostType {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: UserType;
}

export interface ProfileType {
  id: number;
  bio: string;
  profileImageUrl: null | string;
  userId: number;
  user: UserType;
}
