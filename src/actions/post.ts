import { Post } from './dto/post';
import { AxiosMethod, sendRequest } from './sendRequest';

/**
 * Creates a new post.
 * @async
 * @function createPost
 * @param {string} description post question
 * @param {File[]} files images from post [max 3]
 * @returns {Promise<{error: number | null, data: null}>}
 */
export const createPost = async (description: string, files: File[]) => {
  const createPostUrl = `${import.meta.env.VITE_API_BASE_URL}/students/posts`;
  const formData = new FormData();
  formData.append('description', description);
  for (const image of files) {
    formData.append('files', image);
  }

  return await sendRequest(createPostUrl, AxiosMethod.POST, true, formData);
};

/**
 * Retrieves all posts.
 * @async
 * @function getPosts
 * @returns {Promise<{error: number | null, data: Post[]}>}
 */
export const getPosts = async () => {
  const getPostsUrl = `${import.meta.env.VITE_API_BASE_URL}/posts`;
  return await sendRequest<Post[]>(getPostsUrl, AxiosMethod.GET, false);
};

/**
 * Retrieves a post by id.
 * @async
 * @function getPostById
 * @param {number} id post id
 * @returns {Promise<{error: number, data: Post}>}
 */
export const getPostById = async (id: number) => {
  const getPostUrl = `${import.meta.env.VITE_API_BASE_URL}/posts/${id}`;
  return await sendRequest<Post>(getPostUrl, AxiosMethod.GET, false);
};

/**
 * Retrieves the comments for a post.
 * @async
 * @function getCommentsByPost
 * @param {number} id post id
 * @param {number} [page=0] page number
 * @param {number} [offset=3] page offset
 * @returns {Promise<{error: number, data: Post}>}
 */
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

/**
 * Adds comment to post.
 * @async
 * @function commentPost
 * @param {number} id post id
 * @param {string} comment comment text
 * @returns {Promise<{error: number, data: null}>}
 */
export const commentPost = async (id: number, comment: string) => {
  const commentPostUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }/comments/posts/${id}`;
  return await sendRequest<void>(commentPostUrl, AxiosMethod.PUT, true, {
    comment,
  });
};

/**
 * Like post.
 * @async
 * @function likePost
 * @param {number} id post id
 * @returns {Promise<{error: number, data: null}>}
 */
export const likePost = async (id: number) => {
  const likePostUrl = `${import.meta.env.VITE_API_BASE_URL}/posts/${id}`;
  return await sendRequest<void>(likePostUrl, AxiosMethod.PUT, true);
};
