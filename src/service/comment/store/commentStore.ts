import { message } from 'antd';
import { CommentType } from '../../../type/comment';
import CommentApi from '../api/commentApi';

export function CommentStore() {
  const { getCommentByPostIdApi, updateCommentApi } = CommentApi();

  /**
   * 게시물 댓글 조회
   */
  const getCommnetByPostId = async (postId: number) => {
    try {
      const data = await getCommentByPostIdApi(postId);
      return data;
    } catch (e: any) {
      message.error(e.message);
      return false;
    }
  };

  /**
   * 댓글 업데이트
   */
  const updateComment = async (commentId: number, params: CommentType) => {
    try {
      const data = await updateCommentApi(commentId, params);
      return data;
    } catch (e: any) {
      message.error(e.message);
      return false;
    }
  };

  return { getCommnetByPostId, updateComment };
}

export default CommentStore;
