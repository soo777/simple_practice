import React, { useEffect, useState } from 'react';
import PostStore from '../../service/post/store/postStore';
import Button from '@atlaskit/button';
import { PostType } from '../../type/post';
import DynamicTable from '@atlaskit/dynamic-table';
import PostModal from './PostModal';
import { convertDateFormat, sliceStr } from '../../util/util';
import Form, { Field, FormSection } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { commonState } from '../../service/common/commonAtom';

const BoardPage = () => {
  const { t } = useTranslation();
  const { getPostList } = PostStore();
  const commonStates = useRecoilValue(commonState);
  const [postHead, setPostHead] = useState<any>();
  const [postRows, setPostRows] = useState<any>({});
  const [searchedPostRows, setSearchedPostRows] = useState<any>({});
  const [postModalFlag, setPostModalFlag] = useState<boolean>(false);
  const [postId, setPostId] = useState<number>(0);

  useEffect(() => {
    fetch();
  }, [commonStates.language]);

  /**
   * 사용자 리스트 조회
   */
  const fetch = async () => {
    const { data }: any = await getPostList();

    const postHead = {
      cells: [
        {
          key: 'id',
          content: <>{t('table_header.id')}</>,
          isSortable: false,
          width: 10,
        },
        {
          key: 'title',
          content: <>{t('table_header.subject')}</>,
          isSortable: false,
          width: 60,
        },
        {
          key: 'createdAt',
          content: <>{t('table_header.createdAt')}</>,
          isSortable: false,
          width: 20,
        },
        {
          key: 'detail',
          content: '',
          isSortable: false,
          width: 10,
        },
      ],
    };
    setPostHead(postHead);

    const rows = data.map((post: PostType, index: number) => ({
      key: `row-${index}-${post.id}`,
      cells: [
        {
          key: post.id,
          content: post.id,
        },
        {
          key: post.title,
          content: sliceStr(post.title, 50),
        },
        {
          key: post.createdAt,
          content: convertDateFormat(post.createdAt),
        },
        {
          key: post.id,
          content: (
            <Button
              onClick={() => {
                setPostModalFlag(true);
                setPostId(post.id);
              }}
            >
              {t('btn.detail')}
            </Button>
          ),
        },
      ],
    }));

    setPostRows(rows);
    setSearchedPostRows(rows);
  };

  return (
    <>
      <div className="pl-10 pr-10">
        <div className="flex">
          <Form<{ title: string; startDate: any }>
            onSubmit={(data) => {
              let searchedRows =
                data.title !== '' ? postRows.filter((post: any) => post.cells[1].content === data.title) : postRows;

              if (data.startDate) {
                let searchDate = moment(data.startDate[`$d`]).format('YYYYMMDD');
                if (moment(searchDate).isValid()) {
                  searchedRows = searchedRows.filter(
                    (post: any) => moment(post.cells[2].content).format('YYYYMMDD') === searchDate,
                  );
                }
              }

              setSearchedPostRows(searchedRows);
            }}
          >
            {({ formProps, submitting }) => (
              <form {...formProps}>
                <div className="flex">
                  <FormSection>
                    <div className="flex">
                      <div className="w-60">
                        <Field aria-required={true} label={t('post.subject')} name="title" defaultValue="">
                          {({ fieldProps }) => <Textfield className="h-8" autoComplete="on" {...fieldProps} />}
                        </Field>
                      </div>
                      <div className="self-end ml-3 w-32">
                        <Field name="startDate" label={t('post.created')} isRequired={false} defaultValue="">
                          {({ fieldProps }) => (
                            <>
                              <DatePicker
                                className="ml-1"
                                placeholder={moment().format('YYYY-MM-DD')}
                                {...fieldProps}
                              />
                            </>
                          )}
                        </Field>
                      </div>
                    </div>
                  </FormSection>
                  <Button className="self-end ml-3" type="submit" appearance="primary">
                    {t('btn.search')}
                  </Button>
                </div>
              </form>
            )}
          </Form>
        </div>

        <div>
          <DynamicTable
            head={postHead}
            rows={searchedPostRows}
            rowsPerPage={10}
            defaultPage={1}
            caption={t('caption.post')}
          />
        </div>

        {postModalFlag && (
          <PostModal postId={postId} isOpen={postModalFlag} closeModal={() => setPostModalFlag(false)} />
        )}
      </div>
    </>
  );
};

export default BoardPage;
