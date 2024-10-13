import axios from 'axios';
import { CommentType } from '../../../type/comment';

export function CommentApi() {
  /**
   * 게시물 댓글 조회
   */
  const getCommentByPostIdApi = async (postId: number) => {
    const data = await axios.get(`https://koreanjson.com/comments?postId=${postId}`);
    return data;
  };

  /**
   * 댓글 업데이트
   */
  const updateCommentApi = async (commentId: number, params: CommentType) => {
    const data = await axios.put(`https://koreanjson.com/comments/${commentId}`, params);
    return data;
  };

  return { getCommentByPostIdApi, updateCommentApi };
}

export default CommentApi;
