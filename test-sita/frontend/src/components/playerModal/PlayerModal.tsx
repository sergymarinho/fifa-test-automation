import React from 'react';
import moment from 'moment'
import { Player } from '../../types/general/player';

import './_PlayerModal.scss';

// Path
import { baseURL } from "../../config/api";

// Icons
import SkillIcon from "../../assets/icons/dumbbell.svg";
import InfoIcon from "../../assets/icons/info.svg";
import RunIcon from "../../assets/icons/running.svg";
import StaminaIcon from "../../assets/icons/electric.svg";
import VisionIcon from "../../assets/icons/eye.svg";
import PositionIcon from "../../assets/icons/map.svg";
import LinkIcon from "../../assets/icons/pointer.svg";
import StarIcon from "../../assets/icons/star.svg";
import CrossIcon from "../../assets/icons/cross.svg";

// Img
import SofifaImg from "../../assets/images/sofifa.png";
import YoutubeImg from "../../assets/images/youtube.png";
import WikipediaImg from "../../assets/images/wikipedia.png";

interface ModalProps {
  title?: string;
  isOpen: boolean;
  player: Player;
  onClose: () => void;
}

function ProgressBar({ percentage }: { percentage: number }) {


  return (<div className='progressBar'>
    <div className='progress' style={{ right: ((100 - percentage).toString() + '%') }}></div>
  </div>)

}


function PlayerModal({
  isOpen,
  onClose,
  player
}: ModalProps) {
  const outsideRef = React.useRef(null);
  const handleCloseOnOverlay = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  };

  return isOpen ? (
    <div className={'modal'}>
      <div
        ref={outsideRef}
        className='overlay'
        onClick={handleCloseOnOverlay}
      />

      <div className='box'>
        <div onClick={() => { onClose() }} className='close'>
          <img src={CrossIcon} alt="" />
        </div>
        <div className='header'>
          <div className='left'>
            <div className="profilePicture">
              <img src={`${baseURL}players/${player.sofifa_id}/img`} alt="" />
            </div>
            <div className='info'>
              <span className="title">{player.long_name}</span>
              <span className="club">{player.club_name}</span>
            </div>
          </div>

          <div className='points'>
            <span className='value'>{player.overall}</span>
            <span className='desc'>OVERALL</span>
          </div>
        </div>
        <div className='modalContent'>
          <div className='playerInfo'>
            <div className='leftSide'>
              <span className='titleDiv'>
                <img src={InfoIcon} alt="" />
                <span className='title'>General Info</span>
              </span>

              <div className='generalInfo'>

                <div className='team'>
                  <div className='left'>Age</div>
                  <div className='right'>{player.age}</div>
                </div>
                <div className='team'>
                  <div className='left'>Current position</div>
                  <div className='right'>{player.team_position}</div>
                </div>
                <div className='team'>
                  <div className='left'>Joined</div>
                  <div className='right'>{moment(player.joined).format('MM-DD-YYYY')}</div>
                </div>
                <div className='team'>
                  <div className='left'>All positions</div>
                  <div className='right'>{player.player_positions}</div>
                </div>


              </div>
              <span className='titleDiv'>
                <img src={LinkIcon} alt="" />
                <span className='title'>Links</span>
              </span>

              <div className='links'>

                <div className='link'>
                  <a target='_blank' rel="noreferrer" href={player.player_url}>
                    <img src={SofifaImg} alt="" />
                    <span>SOFIFA</span>
                  </a>
                </div>

                <div className='link'>
                  <a target='_blank' rel="noreferrer" href={'https://www.youtube.com/results?search_query=' + player.long_name.replace(' ', '+')}>
                    <img src={YoutubeImg} alt="" />
                    <span>Youtube</span>
                  </a>
                </div>

                <div className='link'>
                  <a target='_blank' rel="noreferrer" href={`https://en.wikipedia.org/w/index.php?search=${player.long_name.replace(' ', '+')}&title=Special%3ASearch&go=Go&ns0=1`}>
                    <img src={WikipediaImg} alt="" />
                    <span>Wikipedia</span>
                  </a>
                </div>


              </div>
            </div>
            <div className='rightSide'>
              <span className='titleDiv'>
                <img src={SkillIcon} alt="" />
                <span className='title'>Skills</span>
              </span>
              <div className='skills'>
                <div className='skill'>
                  <span className='identification'>
                    <img src={RunIcon} alt="" />
                    <span className='name'>Speed</span>
                  </span>
                  <ProgressBar percentage={player.movement_sprint_speed} />
                  <div className='value'>{player.movement_sprint_speed}</div>
                </div>
                <div className='skill'>
                  <span className='identification'>
                    <img src={StaminaIcon} alt="" />
                    <span className='name'>Stamina</span>
                  </span>
                  <ProgressBar percentage={player.power_stamina} />
                  <div className='value'>{player.power_stamina}</div>
                </div>
                <div className='skill'>
                  <span className='identification'>
                    <img src={VisionIcon} alt="" />
                    <span className='name'>Vision</span>
                  </span>
                  <ProgressBar percentage={player.mentality_vision} />
                  <div className='value'>{player.mentality_vision}</div>
                </div>
                <div className='skill'>
                  <span className='identification'>
                    <img src={PositionIcon} alt="" />
                    <span className='name'>Position</span>
                  </span>
                  <ProgressBar percentage={player.mentality_positioning} />
                  <div className='value'>{player.mentality_positioning}</div>
                </div>
              </div>

              <span className='titleDiv'>
                <img src={StarIcon} alt="" />
                <span className='title'>Traits</span>
              </span>
              <div className='traits'>
                {player.player_traits.split(', ').map((trait, index) => {
                  return (
                    <span className='trait' key={'trait_' + index}>{trait}</span>
                  )
                })}
              </div>

            </div>
          </div>

        </div>


      </div>
    </div>
  ) : null;
}

export default PlayerModal;
