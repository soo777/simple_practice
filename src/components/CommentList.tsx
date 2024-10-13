import Button from '@atlaskit/button';
import React, { Fragment, useEffect, useState } from 'react';
import { CommentType } from '../type/comment';
import Form, { Field, FormSection } from '@atlaskit/form';
import TextArea from '@atlaskit/textarea';
import CommentStore from '../service/comment/store/commentStore';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

interface CommentListProps {
  commentList: CommentType[];
  fetchComment: () => void;
}

const CommentList = (props: CommentListProps) => {
  const { t, i18n } = useTranslation();
  const { commentList, fetchComment } = props;
  const { updateComment } = CommentStore();
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);
  const [updateCommentId, setUpdateCommentId] = useState<number>(0);

  /**
   * 댓글 수정
   */
  const update = async (data: CommentType) => {
    updateComment(updateCommentId, data).then(() => {
      let messageStr = '';
      if (i18n.resolvedLanguage === 'ko') {
        messageStr = '댓글이 수정되었습니다.';
      } else {
        messageStr = 'Comment has been updated.';
      }
      message.success(messageStr);
      fetchComment();
      setUpdateFlag(false);
    });
  };

  /**
   * 수정 버튼 클릭 이벤트
   */
  const clickUpdateBtn = (commentId: number) => {
    if (!updateFlag) {
      setUpdateFlag(true);
      setUpdateCommentId(commentId);
    }
  };

  return (
    <>
      <hr className="mt-5" />
      <div className="mt-2">{t('comment.list')}</div>
      {commentList.map((comment: CommentType) => {
        return (
          <div className="mt-1" key={comment.id}>
            <Form<CommentType>
              onSubmit={(data) => {
                update(data);
              }}
            >
              {({ formProps, submitting }) => (
                <form {...formProps}>
                  <FormSection>
                    <div>
                      {updateFlag && updateCommentId === comment.id ? (
                        <div>
                          <Field aria-required={true} name="content" isRequired defaultValue={comment?.content}>
                            {({ fieldProps }: any) => (
                              <Fragment>
                                <TextArea {...fieldProps} />
                              </Fragment>
                            )}
                          </Field>
                        </div>
                      ) : (
                        <div>{comment?.content}</div>
                      )}
                    </div>
                  </FormSection>
                  <div className="text-end mt-1">
                    {updateFlag && updateCommentId === comment.id && (
                      <Button type="submit" appearance="primary">
                        {t('btn.confirm_update')}
                      </Button>
                    )}
                    {updateFlag && updateCommentId === comment.id && (
                      <Button className="ml-2" onClick={() => setUpdateFlag(false)}>
                        {t('btn.cancel')}
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </Form>
            <div className="text-end mb-6">
              {!updateFlag && (
                <Button
                  appearance="warning"
                  onClick={() => {
                    clickUpdateBtn(comment.id);
                  }}
                >
                  {t('btn.update_comment')}
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CommentList;
