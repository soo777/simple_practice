import { message } from 'antd';
import PostApi from '../api/postApi';
import { PostType } from '../../../type/post';

export function PostStore() {
  const { getPostListApi, getPostDetailApi, updatePostApi } = PostApi();

  /**
   * 게시물 리스트 조회
   */
  const getPostList = async () => {
    try {
      const data = await getPostListApi();
      return data;
    } catch (e: any) {
      message.error(e.message);
      return false;
    }
  };

  /**
   * 게시물 상세 조회
   */
  const getPostDetail = async (postId: number) => {
    try {
      const data = await getPostDetailApi(postId);
      return data;
    } catch (e: any) {
      message.error(e.message);
      return false;
    }
  };

  /**
   * 게시물 업데이트
   */
  const updatePost = async (postId: number, params: PostType) => {
    try {
      const data = await updatePostApi(postId, params);
      return data;
    } catch (e: any) {
      message.error(e.message);
      return false;
    }
  };

  return { getPostList, getPostDetail, updatePost };
}

export default PostStore;
