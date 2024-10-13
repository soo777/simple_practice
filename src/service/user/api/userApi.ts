import axios from 'axios';
import { UserType } from '../../../type/user';

export function UserApi() {
  /**
   * 사용자 리스트 조회
   */
  const getUserListApi = async () => {
    const data = await axios.get('https://koreanjson.com/users');
    return data;
  };

  /**
   * 사용자 상세 조회
   */
  const getUserDetailApi = async (userId: number) => {
    const data = await axios.get(`https://koreanjson.com/users/${userId}`);
    return data;
  };

  /**
   * 사용자 업데이트
   */
  const updateUserApi = async (userId: number, params: UserType) => {
    const data = await axios.put(`https://koreanjson.com/users/${userId}`, params);
    return data;
  };

  return { getUserListApi, getUserDetailApi, updateUserApi };
}

export default UserApi;
