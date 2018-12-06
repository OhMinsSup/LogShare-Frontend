import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import {
  FaCode,
  FaCamera,
  FaTasks,
  FaPencilAlt,
  FaBookOpen,
  FaFileAlt,
  FaDog,
  FaWalking,
  FaMusic,
  FaEllipsisH,
} from 'react-icons/fa';

const styles = require('./CategoryMenu.scss');
const cx = classNames.bind(styles);

const CategoryItem: React.StatelessComponent<{
  to: string;
  icon: React.ReactNode;
  name: string;
}> = ({ to, icon, name }) => (
  <li>
    <Link to={to} className={cx('category')}>
      <span className={cx('icon')}>{icon}</span>
      <span className={cx('name')}>{name}</span>
    </Link>
  </li>
);

const CategoryMenu: React.StatelessComponent<{}> = () => (
  <ul className={cx('category-menu')}>
    <li className={cx('menu')}>
      <ul className={cx('list-wrapper')}>
        <CategoryItem to="/development" icon={<FaCode />} name="개발" />
        <CategoryItem to="/photography" icon={<FaCamera />} name="사진" />
        <CategoryItem to="/business" icon={<FaTasks />} name="비즈니스" />
        <CategoryItem to="/design" icon={<FaPencilAlt />} name="디자인" />
        <CategoryItem to="/music" icon={<FaMusic />} name="음악" />
        <CategoryItem
          to="/personal-development"
          icon={<FaBookOpen />}
          name="자기개발"
        />
        <CategoryItem
          to="/office-productivity"
          icon={<FaFileAlt />}
          name="사무"
        />
        <CategoryItem to="/lifestyle" icon={<FaDog />} name="라이프 스타일" />
        <CategoryItem
          to="/health-and-fitness"
          icon={<FaWalking />}
          name="건강및 운동"
        />
        <CategoryItem to="/etc" icon={<FaEllipsisH />} name="기타" />
      </ul>
    </li>
  </ul>
);

export default CategoryMenu;
