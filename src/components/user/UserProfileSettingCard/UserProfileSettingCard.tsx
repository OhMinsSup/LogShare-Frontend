import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdClose, MdModeEdit } from 'react-icons/md';
import defaultThumbnail from '../../../static/default.jpg';
import TextareaAutosize from 'react-autosize-textarea';
import { defaultCoverBg } from 'src/lib/common';
import { UserEditProfileState } from 'src/store/modules/user';

const styles = require('./UserProfileSettingCard.scss');
const cx = classNames.bind(styles);

const ProfileInput: React.StatelessComponent<{
  title: string;
  name: string;
  value: string;
  placeholder: string;
  onChange(e: any): void;
}> = ({ title, value, placeholder, name, onChange }) => (
  <div className={cx('input-wrapper')}>
    <label className={cx('name')}>{title}</label>
    <TextareaAutosize
      maxRows={10}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    />
  </div>
);

const UserProfileSettingCard: React.StatelessComponent<{
  editProfile: UserEditProfileState;
  onProfile(): void;
  onChange(e: any): void;
  onUploadClickThumbnail(): void;
  onSubmit(): void;
  onUploadClickCover(): void;
}> = ({
  onProfile,
  editProfile,
  onChange,
  onUploadClickCover,
  onSubmit,
  onUploadClickThumbnail,
}) => {
  return (
    <div className={cx('user-profile-setting-card')}>
      <div className={cx('profile-card')}>
        <button className={cx('dismiss-btn')} onClick={onProfile}>
          <MdClose />
        </button>
        <h3>유저 프로필 수정</h3>
        <div className={cx('content')}>
          <div className={cx('thumbnail')}>
            <img src={editProfile.thumbnail || defaultThumbnail} />
            <button onClick={onUploadClickThumbnail}>
              <MdModeEdit />
            </button>
          </div>
          <div className={cx('cover-bg')}>
            <img src={editProfile.cover || defaultCoverBg} />
            <button onClick={onUploadClickCover}>
              <MdModeEdit />
            </button>
          </div>
          <div className={cx('input')}>
            <ProfileInput
              title="유저명"
              value={editProfile.username}
              name="username"
              onChange={onChange}
              placeholder="유저명을 입력해주세요"
            />
            <ProfileInput
              title="소개"
              value={editProfile.shortBio}
              name="shortBio"
              onChange={onChange}
              placeholder="자신을 간단하게 소개해주세요"
            />
          </div>
          <div className={cx('edit-btn')}>
            <button className={cx('btn')} onClick={onSubmit}>
              수정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettingCard;
