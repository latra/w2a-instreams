import React from 'react';
import cx from 'classnames';
import styles from '@/assets/styles/index.module.scss';
import { pickPlaceholders, isValidPick } from '../picks/utils/placeholders';

interface PickProps {
  champion: {
    loadingImg: string;
    name: string;
  };
  isActive: boolean;
  displayName: string;
  spell1?: {
    icon: string;
  };
  spell2?: {
    icon: string;
  };
  config: {
    spellsEnabled: boolean;
  };
  position: number;
  onDragStart?: (e: React.DragEvent, position: number) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, position: number) => void;
  teamColor: 'blue' | 'red';
}

const Pick: React.FC<PickProps> = ({ 
  champion, 
  isActive, 
  displayName, 
  spell1, 
  spell2, 
  config, 
  position,
  onDragStart,
  onDragOver,
  onDrop,
  teamColor
}) => (
  <div 
    className={cx(styles.Pick, { [styles.Active]: isActive })}
    draggable={isValidPick({champion})}
    onDragStart={(e) => onDragStart?.(e, position)}
    onDragOver={(e) => {
      e.preventDefault();
      onDragOver?.(e);
    }}
    onDrop={(e) => onDrop?.(e, position)}
    data-team={teamColor}
  >
    {spell1 && spell2 && config.spellsEnabled && isValidPick({champion}) && !isActive && (
      <div className={cx(styles.SummonerSpells)}>
        <img src={spell1.icon} alt="Spell 1" />
        <img src={spell2.icon} alt="Spell 2" />
      </div>
    )}
    <div className={cx(styles.PickImage, { [styles.Active]: isActive })}>
      <img 
        src={isValidPick({champion}) ? champion.loadingImg : pickPlaceholders[position]} 
        alt={isValidPick({champion}) ? champion.name : `Position ${position + 1}`} 
      />
    </div>
    <div className={cx(styles.PlayerName)}>
      <span>{displayName}</span>
    </div>
  </div>
);

export default Pick; 