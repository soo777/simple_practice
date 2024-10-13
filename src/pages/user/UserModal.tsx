import React, { useEffect, useState } from 'react';
import Button from '@atlaskit/button';
import Modal, { ModalBody, ModalHeader, ModalTransition } from '@atlaskit/modal-dialog';
import UserStore from '../../service/user/store/userStore';
import { UserType } from '../../type/user';
import Textfield from '@atlaskit/textfield';
import Form, { Field, FormSection } from '@atlaskit/form';
import { message } from 'antd';
import { convertDateFormat } from '../../util/util';
import { useTranslation } from 'react-i18next';

interface UserModalProps {
  userId: number;
  isOpen: boolean;
  closeModal: () => void;
}

const UserModal = (props: UserModalProps) => {
  const { t, i18n } = useTranslation();
  const { userId, isOpen, closeModal } = props;
  const { getUserDetail, updateUser } = UserStore();
  const [userInfo, setUserInfo] = useState<UserType>();
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);

  useEffect(() => {
    fetch();
  }, []);

  /**
   * 사용자 상세 조회
   */
  const fetch = async () => {
    const { data }: any = await getUserDetail(userId);
    setUserInfo(data);
  };

  /**
   * 사용자 수정
   */
  const update = async (data: UserType) => {
    updateUser(userId, data).then(() => {
      let messageStr = '';
      if (i18n.resolvedLanguage === 'ko') {
        messageStr = '사용자 정보가 수정되었습니다.';
      } else {
        messageStr = 'User detail has been updated.';
      }
      message.success(messageStr);
      fetch();
      setUpdateFlag(false);
    });
  };

  /**
   * 수정 버튼 클릭 이벤트
   */
  const clickUpdateBtn = () => {
    if (!updateFlag) {
      setUpdateFlag(true);
    }
  };

  /**
   * 취소, 닫기 클릭 이벤트
   */
  const cancelBtn = () => {
    if (updateFlag) {
      setUpdateFlag(false);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal} width={'450px'}>
            <ModalHeader>
              <h3>{t('user.get_detail')}</h3>
            </ModalHeader>
            <ModalBody>
              <Form<UserType>
                onSubmit={(data) => {
                  update(data);
                }}
              >
                {({ formProps, submitting }) => (
                  <form {...formProps}>
                    <FormSection>
                      <div className="flex justify-between">
                        <div className="self-center">{t('user.name')}</div>
                        {!updateFlag ? (
                          <div>{userInfo?.name}</div>
                        ) : (
                          <div className="w-60">
                            <Field aria-required={true} name="username" isRequired defaultValue={userInfo?.name}>
                              {({ fieldProps, error }) => (
                                <Textfield className="h-8" autoComplete="off" {...fieldProps} />
                              )}
                            </Field>
                          </div>
                        )}
                      </div>
                    </FormSection>
                    <FormSection>
                      <div className="flex justify-between">
                        <div className="self-center">{t('user.email')}</div>
                        {!updateFlag ? (
                          <div>{userInfo?.email}</div>
                        ) : (
                          <div className="w-60">
                            <Field aria-required={true} name="email" isRequired defaultValue={userInfo?.email}>
                              {({ fieldProps, error }) => (
                                <Textfield className="h-8" autoComplete="off" {...fieldProps} />
                              )}
                            </Field>
                          </div>
                        )}
                      </div>
                    </FormSection>
                    <FormSection>
                      <div className="flex justify-between">
                        <div className="self-center">{t('user.phone')}</div>
                        {!updateFlag ? (
                          <div>{userInfo?.phone}</div>
                        ) : (
                          <div className="w-60">
                            <Field aria-required={true} name="phone" isRequired defaultValue={userInfo?.phone}>
                              {({ fieldProps, error }) => (
                                <Textfield className="h-8" autoComplete="off" {...fieldProps} />
                              )}
                            </Field>
                          </div>
                        )}
                      </div>
                    </FormSection>
                    <FormSection>
                      <div className="flex justify-between">
                        <div className="self-center">{t('user.website')}</div>
                        {!updateFlag ? (
                          <div>{userInfo?.website}</div>
                        ) : (
                          <div className="w-60">
                            <Field aria-required={true} name="website" isRequired defaultValue={userInfo?.website}>
                              {({ fieldProps, error }) => (
                                <Textfield className="h-8 w-150" autoComplete="off" {...fieldProps} />
                              )}
                            </Field>
                          </div>
                        )}
                      </div>
                    </FormSection>
                    <FormSection>
                      <div className="flex justify-between">
                        <div className="self-center">{t('user.zipcode')}</div>
                        {!updateFlag ? (
                          <div>{userInfo?.zipcode}</div>
                        ) : (
                          <div className="w-60">
                            <Field aria-required={true} name="zipcode" isRequired defaultValue={userInfo?.zipcode}>
                              {({ fieldProps, error }) => (
                                <Textfield className="h-8" autoComplete="off" {...fieldProps} />
                              )}
                            </Field>
                          </div>
                        )}
                      </div>
                    </FormSection>
                    <FormSection>
                      <div className="flex justify-between">
                        <div className="self-center">{t('user.province')}</div>
                        {!updateFlag ? (
                          <div>{userInfo?.province}</div>
                        ) : (
                          <div className="w-60">
                            <Field aria-required={true} name="province" isRequired defaultValue={userInfo?.province}>
                              {({ fieldProps, error }) => (
                                <Textfield className="h-8" autoComplete="off" {...fieldProps} />
                              )}
                            </Field>
                          </div>
                        )}
                      </div>
                    </FormSection>
                    <FormSection>
                      <div className="flex justify-between">
                        <div className="self-center">{t('user.city')}</div>
                        {!updateFlag ? (
                          <div>{userInfo?.city}</div>
                        ) : (
                          <div className="w-60">
                            <Field aria-required={true} name="city" isRequired defaultValue={userInfo?.city}>
                              {({ fieldProps, error }) => (
                                <Textfield className="h-8" autoComplete="off" {...fieldProps} />
                              )}
                            </Field>
                          </div>
                        )}
                      </div>
                    </FormSection>
                    <FormSection>
                      <div className="flex justify-between">
                        <div className="self-center">{t('user.district')}</div>
                        {!updateFlag ? (
                          <div>{userInfo?.district}</div>
                        ) : (
                          <div className="w-60">
                            <Field aria-required={true} name="district" isRequired defaultValue={userInfo?.district}>
                              {({ fieldProps, error }) => (
                                <Textfield className="h-8" autoComplete="off" {...fieldProps} />
                              )}
                            </Field>
                          </div>
                        )}
                      </div>
                    </FormSection>
                    <FormSection>
                      <div className="flex justify-between">
                        <div className="self-center">{t('user.street')}</div>
                        {!updateFlag ? (
                          <div>{userInfo?.street}</div>
                        ) : (
                          <div className="w-60">
                            <Field aria-required={true} name="street" isRequired defaultValue={userInfo?.street}>
                              {({ fieldProps, error }) => (
                                <Textfield className="h-8" autoComplete="off" {...fieldProps} />
                              )}
                            </Field>
                          </div>
                        )}
                      </div>
                    </FormSection>

                    <div className="flex justify-between mt-6">
                      <div className="self-center">{t('common.createdAt')}</div>
                      <div>{convertDateFormat(userInfo?.createdAt)}</div>
                    </div>

                    <div className="flex justify-between mt-1">
                      <div className="self-center">{t('common.updatedAt')}</div>
                      <div>{convertDateFormat(userInfo?.updatedAt)}</div>
                    </div>

                    {updateFlag && (
                      <div className="mt-6 mb-6 text-end">
                        <Button type="submit" appearance="primary">
                          {t('btn.confirm_update')}
                        </Button>
                        <Button className="ml-4" appearance="default" onClick={cancelBtn}>
                          {t('btn.cancel')}
                        </Button>
                      </div>
                    )}
                  </form>
                )}
              </Form>
              {!updateFlag && (
                <div className="mt-6 mb-6 text-end">
                  <Button appearance="warning" onClick={clickUpdateBtn}>
                    {t('btn.update')}
                  </Button>
                  <Button className="ml-4" appearance="default" onClick={cancelBtn}>
                    {t('btn.close')}
                  </Button>
                </div>
              )}
            </ModalBody>
          </Modal>
        )}
      </ModalTransition>
    </>
  );
};

export default UserModal;
