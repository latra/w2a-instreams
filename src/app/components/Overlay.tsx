import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import Pick from './Pick';
import Ban from './Ban';
import styles from '@/assets/styles/index.module.scss';

interface OverlayProps {
  state: any;
  config: any;
  setState: any;
}

const Overlay: React.FC<OverlayProps> = ({ state, config, setState }) => {
  const [currentAnimationState, setCurrentAnimationState] = useState(styles.TheAbsoluteVoid);
  const [openingAnimationPlayed, setOpeningAnimationPlayed] = useState(false);

  const playOpeningAnimation = () => {
    setOpeningAnimationPlayed(true);
    setTimeout(() => {
      setCurrentAnimationState(styles.AnimationHidden);
      setTimeout(() => {
        setCurrentAnimationState(`${styles.AnimationTimer} ${styles.AnimationBansPick}`);
        setTimeout(() => {
          setCurrentAnimationState(`${styles.AnimationBansPick} ${styles.AnimationBansPickOnly}`);
          setTimeout(() => {
            setCurrentAnimationState(styles.AnimationPigs);
          }, 1000);
        }, 1450);
      }, 700);
    }, 500);
  };

  useEffect(() => {
    if (state.champSelectActive && !openingAnimationPlayed) {
      playOpeningAnimation();
    }
    if (!state.champSelectActive && openingAnimationPlayed) {
      setOpeningAnimationPlayed(false);
      setCurrentAnimationState(styles.TheAbsoluteVoid);
    }
  }, [state.champSelectActive, openingAnimationPlayed]);

  const handleDragStart = (e: React.DragEvent, position: number, team: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ position, team }));
  };

  const handleDrop = async (e: React.DragEvent, newPosition: number, team: string) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const oldPosition = data.position;
    const dragTeam = data.team;

    // Solo permitir intercambios dentro del mismo equipo
    if (team !== dragTeam) return;

    state.game.swapPositions(dragTeam, oldPosition, newPosition);
    setState(state);
  };

  const renderBans = (teamState: any) => {
    const list = teamState.bans.map((ban: any, idx: number) => (
      <Ban key={`ban-${idx}`} {...ban} />
    ));
    list.splice(3, 0, <div key="ban-spacer" className={styles.Spacing} />);
    return <div className={cx(styles.BansBox)}>{list}</div>;
  };

  const renderTeam = (teamName: string, teamConfig: any, teamState: any) => (
    <div className={cx(styles.Team, teamName)}>
      <div className={cx(styles.Picks)}>
        {(teamName === styles.TeamRed ? [...teamState.picks].reverse() : teamState.picks)
          .map((pick: any, idx: number) => (
            <Pick 
              key={`pick-${idx}`} 
              config={config} 
              position={teamName === styles.TeamRed ? 4 - idx : idx} 
              {...pick}
              onDragStart={(e, pos) => handleDragStart(e, pos, teamName === styles.TeamBlue ? 'blue' : 'red')}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e, pos) => handleDrop(e, pos, teamName === styles.TeamBlue ? 'blue' : 'red')}
              teamColor={teamName === styles.TeamBlue ? 'blue' : 'red'}
            />
        ))}
      </div>
      <div className={styles.BansWrapper}>
        <div className={cx(styles.Bans, {[styles.WithScore]: config.scoreEnabled})}>
          {teamName === styles.TeamBlue && config.scoreEnabled && (
            <div className={styles.TeamScore}>{teamConfig.score}</div>
          )}
          {renderBans(teamState)}
          <div className={cx(styles.TeamName, {[styles.WithoutCoaches]: !config.coachesEnabled})}>
            {config.coachesEnabled && (
              <div className={styles.CoachName}>Coach: {teamConfig.coach}</div>
            )}
          </div>
          {teamName === styles.TeamRed && config.scoreEnabled && (
            <div className={styles.TeamScore}>{teamConfig.score}</div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className={cx(styles.Overlay, styles.Europe, currentAnimationState)} 
      style={{"--color-red": "rgb(162,8,8)", "--color-blue": "rgb(25,173,208)"} as React.CSSProperties}
    >
      {Object.keys(state).length === 0 && (
        <div className={cx(styles.infoBox)}>Not connected to backend service!</div>
      )}
      {Object.keys(state).length !== 0 && (
        <>
          <div 
            className={cx(styles.ProgressBar, {
              [styles.Blue]: state.blueTeam.isActive,
              [styles.Red]: state.redTeam.isActive,
              [styles.Default]: !state.blueTeam.isActive && !state.redTeam.isActive
            })}
            style={{
              width: `${(parseInt(state.timer) / 30) * 100}%`,
              left: 0,
              zIndex: 1,
              marginTop: '701px',
              marginLeft: '81px',
              marginRight: '81px'
            }}
          />
          <div className={cx(styles.ChampSelect, {
            [styles.BlueBackground]: state.blueTeam.isActive && !state.redTeam.isActive,
            [styles.RedBackground]: state.redTeam.isActive && !state.blueTeam.isActive,
            [styles.DefaultBackground]: !state.blueTeam.isActive && !state.redTeam.isActive
          })}>
            <div className={cx(styles.MiddleBox, {
              [styles.Blue]: state.blueTeam.isActive && !state.redTeam.isActive,
              [styles.Red]: state.redTeam.isActive && !state.blueTeam.isActive,
              [styles.Default]: !state.blueTeam.isActive && !state.redTeam.isActive
            })}>
              <div className={cx(styles.Logo)}>
                {((!state.blueTeam.isActive && !state.redTeam.isActive) || 
                  (state.blueTeam.isActive && !state.redTeam.isActive && config.blueTeam.logo) || 
                  config.redTeam.logo) && (
                  <img 
                    src={!state.blueTeam.isActive && !state.redTeam.isActive ? './images/w2alogo.svg' :
                      state.blueTeam.isActive && !state.redTeam.isActive ? config.blueTeam.logo :
                      config.redTeam.logo
                    } 
                    alt="Team Logo" 
                  />
                )}
              </div>
              <div className={cx(styles.Patch)}>
                {!state.blueTeam.isActive && !state.redTeam.isActive ? config.tournamentName :
                  state.blueTeam.isActive && !state.redTeam.isActive ? config.blueTeam.name :
                  config.redTeam.name
                }
              </div>
            </div>
            {renderTeam(styles.TeamBlue, config.blueTeam, state.blueTeam)}
            {renderTeam(styles.TeamRed, config.redTeam, state.redTeam)}
          </div>
        </>
      )}
    </div>
  );
};

export default Overlay;