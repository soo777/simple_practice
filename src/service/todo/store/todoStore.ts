import { message } from 'antd';
import { TodoApi } from '../api/todoApi';

export function TodoStore() {
  const { getTodoListApi } = TodoApi();

  /**
   * 할일 목록 조회
   */
  const getTodoList = async () => {
    try {
      const data = await getTodoListApi();
      return data;
    } catch (e: any) {
      message.error(e.message);
      return false;
    }
  };

  return { getTodoList };
}

export default TodoStore;
