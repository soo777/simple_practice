import React, { useEffect, useState } from 'react';
import UserStore from '../../service/user/store/userStore';
import { UserType } from '../../type/user';
import DynamicTable from '@atlaskit/dynamic-table';
import Button from '@atlaskit/button';
import UserModal from './UserModal';
import Textfield from '@atlaskit/textfield';
import Form, { Field, FormSection } from '@atlaskit/form';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { commonState } from '../../service/common/commonAtom';

const UserPage = () => {
  const { t } = useTranslation();
  const { getUserList } = UserStore();
  const commonStates = useRecoilValue(commonState);
  const [userHead, setUserHead] = useState<any>();
  const [userRows, setUserRows] = useState<any>({});
  const [searchedUserRows, setSearchedUserRows] = useState<any>({});
  const [userModalFlag, setUserModalFlag] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    fetch();
  }, [commonStates.language]);

  /**
   * 사용자 리스트 조회
   */
  const fetch = async () => {
    const { data }: any = await getUserList();

    const userHead = {
      cells: [
        {
          key: 'id',
          content: <>{t('table_header.userId')}</>,
          isSortable: false,
          width: 10,
        },
        {
          key: 'name',
          content: <>{t('table_header.name')}</>,
          isSortable: false,
          width: 10,
        },
        {
          key: 'email',
          content: <>{t('table_header.email')}</>,
          isSortable: false,
          width: 20,
        },
        {
          key: 'phone',
          content: <>{t('table_header.phone')}</>,
          isSortable: false,
          width: 20,
        },
        {
          key: 'website',
          content: <>{t('table_header.website')}</>,
          isSortable: false,
          width: 40,
        },
        {
          key: 'detail',
          content: '',
          isSortable: false,
          width: 10,
        },
      ],
    };
    setUserHead(userHead);

    const rows = data.map((user: UserType, index: number) => ({
      key: `row-${index}-${user.id}`,
      cells: [
        {
          key: user.id,
          content: user.id,
        },
        {
          key: user.name,
          content: user.name,
        },
        {
          key: user.email,
          content: user.email,
        },
        {
          key: user.phone,
          content: user.phone,
        },
        {
          key: user.website,
          content: user.website,
        },
        {
          key: user.website,
          content: (
            <>
              <Button
                onClick={() => {
                  setUserModalFlag(true);
                  setUserId(user.id);
                }}
              >
                {t('btn.detail')}
              </Button>
            </>
          ),
        },
      ],
    }));

    setUserRows(rows);
    setSearchedUserRows(rows);
  };

  return (
    <>
      <div className="pl-10 pr-10">
        <div className="flex">
          <Form<{ name: string }>
            onSubmit={(data) => {
              let searchedRows = userRows.filter((user: any) => user.cells[1].content === data.name);
              if (data.name === '') {
                setSearchedUserRows(userRows);
              } else {
                setSearchedUserRows(searchedRows);
              }
            }}
          >
            {({ formProps, submitting }) => (
              <form {...formProps}>
                <div className="flex">
                  <FormSection>
                    <Field aria-required={true} name="name" label={t('name')} defaultValue="">
                      {({ fieldProps }) => <Textfield className="h-8" autoComplete="on" {...fieldProps} />}
                    </Field>
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
            head={userHead}
            rows={searchedUserRows}
            rowsPerPage={5}
            defaultPage={1}
            caption={t('caption.user')}
          />
        </div>

        {userModalFlag && (
          <UserModal userId={userId} isOpen={userModalFlag} closeModal={() => setUserModalFlag(false)} />
        )}
      </div>
    </>
  );
};

export default UserPage;
