import React, { useMemo, useEffect, useRef, useState } from "react";
import Countdown from 'react-countdown';

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import { getImg } from "../../../utils/Helper";

import StakeButton from "../../atoms/StakeButton"
import CollectButton from "../../atoms/CollectButton"
import DespawnButton from "../../atoms/DespawnButton"
import ReceiveButton from "../../atoms/ReceiveButton"
import PercentBar from "../../atoms/PercentBar"

import DetailModal from './../../../components/molecules/DetailModal/';

import styles from './index.module.scss';

interface MintCountdownRender {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const renderCountdown = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: MintCountdownRender) => {
  if (completed) {
    return '';
  } else {
    return (
      <>
         {days < 10 ? `0${days}` : days} : {hours < 10 ? `0${hours}` : hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
      </>
    );
  }
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
    },
    title: {
      color: theme.palette.text.primary
    },
    fluff: {
      color: theme.syscolor.light
    },
    remainTime: {
      color: theme.palette.text.primary
    },
    furr: {
      color: theme.palette.text.primary,
      background: alpha(`${theme.syscolor.dark}`, 0.85)
    },
    furrImg: {
      width: '12px !important',
      height: '12px !important'
    }
  })
)

type Props = {
  children: React.ReactNode,
  className?: string,
  info: {
    image: string,
    title: string,
    fluff: number,
    attr: any,
    remainTime: number,
    spawnState: number
  }
}

const NftItem = (props: Props) => {
  const { className, info } = props;
  const classes = useStyles();

  const [showCount, setShowCount] = useState(false);
  const [openNFTModal, setOpenNFTModal] = useState<boolean>(false);
  
  useEffect(() => {
    (async () => {
      const now = new Date().getTime();

      if(info.remainTime && (info.remainTime - now) > 0){
        setShowCount(true)
      }
    })();
  }, []);

  return (
        <div className={`col-12`}>
          <Grid container direction="row" justifyContent="space-between" alignItems="flex-start"  onClick={() => {setOpenNFTModal(true)}}>
            <Grid item md={5} className={`pr-16`}>
              <div className={`imageWrapper`}>
                  <div className={`imageOver`}>
                    <img src={getImg(info.image)} alt="Right Responsive image" />
                    <div className={`d-flex align-items-center justify-content-center ${styles.furr} ${classes.furr}`}>
                      <img src={getImg('images/icons/furrsol-active.png')} className={`${classes.furrImg}`} alt="Furr" />

                      <p className="pl-4 line-height-1">{0}</p>
                    </div>
                  </div>
              </div>
            </Grid>

            <Grid item md={7}>
              <p className={`mb-8 ${styles.title} ${classes.title}`}>{info.title}</p>
              <p className={`mb-16 ${styles.fluff} ${classes.fluff}`}>FLUFF: {info.fluff}</p>

              <Grid container direction="row" justifyContent="space-between" alignItems="stretch">
                {
                  Object.keys(info.attr).map((key, index) => {
                    const attr = info.attr;
                    return <React.Fragment key={index}>
                            <Grid item md={9} className={`mb-8 pr-8`}>
                              <PercentBar
                                info={attr[key]}
                                attr={key.toUpperCase()}
                              >

                              </PercentBar>
                            </Grid>
                            <Grid item md={3} className={`mb-8 text-right`}>
                              <StakeButton
                                className={`pt-4 pr-4 pb-4 pl-4 font-700 font-sm line-height-1`}
                              >
                                {key.toUpperCase()}
                              </StakeButton>
                              
                            </Grid>
                          </React.Fragment>
                  })
                }

              </Grid>
            </Grid>
          </Grid>

          <div className={`d-flex justify-content-between align-items-end mt-8`}  onClick={() => {setOpenNFTModal(true)}}>
            <div className={`d-flex align-items-center align-items-center`}>
              {info.spawnState == 1 && 
                <>
                  <CollectButton>
                    Collect FLUFF
                  </CollectButton>
                  <DespawnButton className={`ml-8`}>
                    Despawn
                  </DespawnButton>
                </>
              }

              {info.spawnState == 2 && 
                <>
                  <ReceiveButton>
                    Revive for 5000 FLUFF
                  </ReceiveButton>
                  <DespawnButton className={`ml-8`} enabled={false}>
                    Despawn
                  </DespawnButton>
                </>
              }

              {info.spawnState == 3 && 
                <>
                  <CollectButton enabled={false}>
                    Collect FLUFF
                  </CollectButton>
                  <CollectButton className={`ml-8`}>
                    Spawn
                  </CollectButton>
                </>
              }

              {info.spawnState == 4 && 
                <>
                  <CollectButton enabled={false}>
                    Collect FLUFF
                  </CollectButton>
                  <DespawnButton className={`ml-8`} enabled={false}>
                    Despawn
                  </DespawnButton>
                </>
              }

            </div>
            {showCount && 
              <div className={`d-flex align-items-center justify-content-center line-height-1 ${styles.remainTime} ${classes.remainTime}`}>
                <Countdown
                  date={info.remainTime}
                  onComplete={() => {setShowCount(false)}}
                  renderer={renderCountdown}
                />
              </div>
            }
          </div>

          <DetailModal 
              setOpenModal={setOpenNFTModal}
              openModal={openNFTModal}
              info={info}
          >

          </DetailModal>
        </div>
  )
}

export default NftItem;
