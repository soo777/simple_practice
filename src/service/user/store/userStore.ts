import { message } from 'antd';
import UserApi from '../api/userApi';
import { UserType } from '../../../type/user';

export function UserStore() {
  const { getUserListApi, getUserDetailApi, updateUserApi } = UserApi();

  /**
   * 사용자 리스트 조회
   */
  const getUserList = async () => {
    try {
      const data = await getUserListApi();
      return data;
    } catch (e: any) {
      message.error(e.message);
      return false;
    }
  };

  /**
   * 사용자 상세 조회
   */
  const getUserDetail = async (userId: number) => {
    try {
      const data = await getUserDetailApi(userId);
      return data;
    } catch (e: any) {
      message.error(e.message);
      return false;
    }
  };

  /**
   * 사용자 업데이트
   */
  const updateUser = async (userId: number, params: UserType) => {
    try {
      const data = await updateUserApi(userId, params);
      return data;
    } catch (e: any) {
      message.error(e.message);
      return false;
    }
  };

  return { getUserList, getUserDetail, updateUser };
}

export default UserStore;
