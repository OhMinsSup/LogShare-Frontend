import * as React from 'react';
import * as classNames from 'classnames/bind';
import ModalWrapper from '../ModalWrapper';
import Button from '../Button';

const styles = require('./QuestionModal.scss');
const cx = classNames.bind(styles);

const QuestionModal: React.StatelessComponent<{
  title?: string;
  description: string;
  confirmText?: string;
  open: boolean;
  onConfirm(): void;
  onCancel(): void;
}> = ({ title, description, confirmText, open, onCancel, onConfirm }) => (
  <ModalWrapper open={open}>
    <div className={cx('question-modal')}>
      <div className={cx('modal-content')}>
        {title && <h4>{title}</h4>}
        <p>{description}</p>
        <div className={cx('button-area')}>
          <Button onClick={onCancel} theme="default">
            취소
          </Button>
          <Button onClick={onConfirm} theme="default">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  </ModalWrapper>
);

export default QuestionModal;
