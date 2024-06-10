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

export const getCommentsByPost = async (
  id: number,
  page: number = 0,
  offset: number = 3
) => {
  const getCommentsUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }/comments/posts/${id}?pages=${page}&offset=${offset}`;
  return await sendRequest<Post>(getCommentsUrl, AxiosMethod.GET, true);
};

export const commentPost = async (id: number, comment: string) => {
  const commentPostUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }/comments/posts/${id}`;
  return await sendRequest<void>(commentPostUrl, AxiosMethod.PUT, true, {
    comment,
  });
};
