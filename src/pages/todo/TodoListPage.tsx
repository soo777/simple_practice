import React, { useEffect, useState } from 'react';
import TodoStore from '../../service/todo/store/todoStore';
import { ToDoType } from '../../type/todo';
import DynamicTable from '@atlaskit/dynamic-table';
import CheckIcon from '@atlaskit/icon/glyph/check';
import { convertDateFormat } from '../../util/util';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { commonState } from '../../service/common/commonAtom';

const TodoListPage = () => {
  const { t } = useTranslation();
  const { getTodoList } = TodoStore();
  const commonStates = useRecoilValue(commonState);
  const [todoHead, setTodoHead] = useState<any>();
  const [todoRows, setTodoRows] = useState<any>([]);

  useEffect(() => {
    fetch();
  }, [commonStates.language]);

  /**
   * 할일 목록 조회
   */
  const fetch = async () => {
    const { data }: any = await getTodoList();

    const todoHead = {
      cells: [
        {
          key: 'completed',
          content: '',
          isSortable: false,
          width: 10,
        },
        {
          key: 'title',
          content: <>{t('table_header.subject')}</>,
          isSortable: false,
          width: 70,
        },
        {
          key: 'createdAt',
          content: <>{t('table_header.createdAt')}</>,
          isSortable: false,
          width: 30,
        },
      ],
    };
    setTodoHead(todoHead);

    const rows = data.map((item: ToDoType, index: number) => ({
      key: `row-${index}-${item.id}`,
      cells: [
        {
          key: item.completed,
          content: <>{item.completed && <CheckIcon label="" />}</>,
        },
        {
          key: item.title,
          content: item.title,
        },
        {
          key: item.createdAt,
          content: convertDateFormat(item.createdAt),
        },
      ],
    }));

    setTodoRows(rows);
  };

  return (
    <div className="pl-10 pr-10">
      <DynamicTable head={todoHead} rows={todoRows} rowsPerPage={20} defaultPage={1} caption={t('caption.todo')} />
    </div>
  );
};

export default TodoListPage;
