import axios from 'axios';

export function TodoApi() {
  /**
   * 할일 목록 조회
   */
  const getTodoListApi = async () => {
    const data = await axios.get(`https://koreanjson.com/todos`);
    return data;
  };

  return { getTodoListApi };
}

export default TodoApi;
