import React, { Fragment, useEffect, useState } from 'react';
import Button from '@atlaskit/button';
import Modal, { ModalBody, ModalHeader, ModalTransition } from '@atlaskit/modal-dialog';
import Form, { Field, FormSection } from '@atlaskit/form';
import { message } from 'antd';
import PostStore from '../../service/post/store/postStore';
import { convertDateFormat } from '../../util/util';
import { PostType } from '../../type/post';
import TextArea from '@atlaskit/textarea';
import CommentStore from '../../service/comment/store/commentStore';
import { CommentType } from '../../type/comment';
import CommentList from '../../components/CommentList';
import { useTranslation } from 'react-i18next';

interface UserModalProps {
  postId: number;
  isOpen: boolean;
  closeModal: () => void;
}

const PostModal = (props: UserModalProps) => {
  const { t, i18n } = useTranslation();
  const { postId, isOpen, closeModal } = props;
  const { getPostDetail, updatePost } = PostStore();
  const { getCommnetByPostId } = CommentStore();
  const [postInfo, setPostInfo] = useState<PostType>();
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<CommentType[]>([]);

  useEffect(() => {
    fetch();
  }, []);

  /**
   * 게시물 상세 조회
   */
  const fetch = async () => {
    const { data }: any = await getPostDetail(postId);
    setPostInfo(data);

    fetchComment();
  };

  /**
   * 댓글 조회
   */
  const fetchComment = async () => {
    const commentData = await getCommnetByPostId(postId);
    if (commentData) {
      setCommentList(commentData.data);
    }
  };

  /**
   * 게시물 수정
   */
  const update = async (data: PostType) => {
    updatePost(postId, data).then(() => {
      let messageStr = '';
      if (i18n.resolvedLanguage === 'ko') {
        messageStr = '게시물이 수정되었습니다.';
      } else {
        messageStr = 'Posts has been updated.';
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
          <Modal onClose={closeModal}>
            <ModalHeader>
              <h3>{t('post.get_detail')}</h3>
            </ModalHeader>
            <ModalBody>
              <Form<PostType>
                onSubmit={(data) => {
                  update(data);
                }}
              >
                {({ formProps, submitting }) => (
                  <form {...formProps}>
                    <FormSection>
                      <div>
                        <div className="self-center font-semibold">{t('post.subject')}</div>
                        {!updateFlag ? (
                          <div className="mt-2">{postInfo?.title}</div>
                        ) : (
                          <div>
                            <Field aria-required={true} name="title" isRequired defaultValue={postInfo?.title}>
                              {({ fieldProps }: any) => (
                                <Fragment>
                                  <TextArea {...fieldProps} />
                                </Fragment>
                              )}
                            </Field>
                          </div>
                        )}
                      </div>
                    </FormSection>
                    <FormSection>
                      <div>
                        <div className="self-center font-semibold">{t('post.content')}</div>
                        {!updateFlag ? (
                          <div className="mt-2">{postInfo?.content}</div>
                        ) : (
                          <div>
                            <Field aria-required={true} name="content" isRequired defaultValue={postInfo?.content}>
                              {({ fieldProps }: any) => (
                                <Fragment>
                                  <TextArea {...fieldProps} />
                                </Fragment>
                              )}
                            </Field>
                          </div>
                        )}
                      </div>
                    </FormSection>

                    <div className="flex justify-end mt-6">
                      <div className="self-center">{t('common.createdAt')}</div>
                      <div className="ml-2">{convertDateFormat(postInfo?.createdAt)}</div>
                    </div>

                    <div className="flex justify-end mt-1">
                      <div className="self-center">{t('common.updatedAt')}</div>
                      <div className="ml-2">{convertDateFormat(postInfo?.updatedAt)}</div>
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
                    {t('btn.update_post')}
                  </Button>
                  <Button className="ml-4" appearance="default" onClick={cancelBtn}>
                    {t('btn.close')}
                  </Button>
                </div>
              )}

              {/* 댓글 목록 */}
              {commentList.length > 0 && <CommentList commentList={commentList} fetchComment={fetchComment} />}
            </ModalBody>
          </Modal>
        )}
      </ModalTransition>
    </>
  );
};

export default PostModal;
