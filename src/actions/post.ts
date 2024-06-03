import { Post } from './dto/post';
import { AxiosMethod, sendRequest } from './sendRequest';

export const createPost = async (description: string, files: File[]) => {
  const createPostUrl = `${import.meta.env.VITE_API_BASE_URL}/students/posts`;
  const formData = new FormData();
  formData.append('description', description);
  for (const image of files) {
    formData.append('files', image);
  }

  return await sendRequest(createPostUrl, AxiosMethod.POST, true, formData);
};

export const getPosts = async () => {
  const getPostsUrl = `${import.meta.env.VITE_API_BASE_URL}/posts`;
  return await sendRequest(getPostsUrl, AxiosMethod.GET, false);
};

export const getPostById = async (id: number) => {
  const getPostUrl = `${import.meta.env.VITE_API_BASE_URL}/posts/${id}`;
  return await sendRequest<Post>(getPostUrl, AxiosMethod.GET, false);
};