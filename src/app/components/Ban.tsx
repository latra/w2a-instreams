import React from 'react';
import cx from 'classnames';
import styles from '@/assets/styles/index.module.scss';
import { banPlaceholderImage, isValidBan } from '../picks/utils/placeholders';

interface BanProps {
  champion: {
    squareImg: string;
    name: string;
  };
  isActive: boolean;
}

const Ban: React.FC<BanProps> = ({ champion, isActive }) => (
  <div className={cx(styles.Ban, { [styles.Active]: isActive })}>
    <div className={cx(styles.BanImage)}>
      <img 
        src={isValidBan({champion}) ? champion.squareImg : banPlaceholderImage} 
        alt={isValidBan({champion}) ? `Banned ${champion.name}` : 'Ban Placeholder'} 
      />
    </div>
  </div>
);

export default Ban; 