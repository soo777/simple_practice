import axios from 'axios';
import { PostType } from '../../../type/post';

export function PostApi() {
  /**
   * 게시물 리스트 조회
   */
  const getPostListApi = async () => {
    const data = await axios.get('https://koreanjson.com/posts');
    return data;
  };

  /**
   * 게시물 상세 조회
   */
  const getPostDetailApi = async (postId: number) => {
    const data = await axios.get(`https://koreanjson.com/posts/${postId}`);
    return data;
  };

  /**
   * 게시물 업데이트
   */
  const updatePostApi = async (postId: number, params: PostType) => {
    const data = await axios.put(`https://koreanjson.com/posts/${postId}`, params);
    return data;
  };

  return { getPostListApi, getPostDetailApi, updatePostApi };
}

export default PostApi;
