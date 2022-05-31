import React, { useMemo, useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';

import * as anchor from '@project-serum/anchor';
import { useConnection, useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import { useToasts } from 'react-toast-notifications'

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import CONFIG from './../../../config';
import { SolanaClient, SolanaClientProps } from './../../../helpers/solana';
import { sendTransactions } from '../../../helpers/solana/connection';
import {getImg, getProvider, makeATokenAccountTransaction} from './../../../utils/Helper';

import PrimaryLayout from './../../../components/template/PrimaryLayout';
import NavPart from './../../../components/organisms/NavPart';
import MainContent from './../../../components/organisms/MainContent';
import FilterPart from './../../../components/organisms/FilterPart';
import ContentPart from './../../../components/organisms/ContentPart';

import ItemBox from './../../../components/atoms/ItemBox';
import NftItem from './../../../components/molecules/NftItem'

import styles from './index.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
    },
    infoList: {
      borderBottomColor: alpha(`${theme.syscolor.light}`, 0.1),
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px'
    },
    info: {
      color: theme.palette.text.primary
    }
  })
)

const filterOptions = [
  {
    title: "Filters",
    filters: [
      {
        name: "All",
        value:"-1",
        enabled: true
      },
      {
        name: "Spawned",
        value:"spawned",
        enabled: true
      },
      {
        name: "Not Spawned",
        value:"notspawned",
        enabled: true
      }
    ]
  },
  {
    title: "Classes",
    filters: [
      {
        name: "All",
        value:"-1",
        enabled: true
      },
      {
        name: "Winter",
        value:"winter",
        enabled: true
      },
      {
        name: "Spring",
        value:"spring",
        enabled: false
      },
      {
        name: "Summer",
        value:"summer",
        enabled: true
      },
      {
        name: "Autumn",
        value:"autumn",
        enabled: true
      }
    ]
  },
  {
    title: "Status",
    filters: [
      {
        name: "All",
        value:"-1",
        enabled: true
      },
      {
        name: "Alive",
        value:"alive",
        enabled: true
      },
      {
        name: "Dead",
        value:"dead",
        enabled: true
      }
    ]
  }
];

const nfts = [
  {
    title: '️☀ FurrSols #23',
    image: 'images/nfts/001.png',
    fluff: 5000,
    attr: {
      feed: {total: 100, current: 90},
      rest: {total: 100, current: 96},
      groom: {total: 100, current: 94},
      play: {total: 100, current: 92}
    },
    remainTime: new Date().getTime() + 3600 * 24 * 1000,
    spawnState: 1
  },
  {
    title: '❄ FurrSols #315',
    image: 'images/nfts/002.png',
    fluff: 3500,
    attr: {
      feed: {total: 100, current: 0},
      rest: {total: 100, current: 0},
      groom: {total: 100, current: 0},
      play: {total: 100, current: 0}
    },
    remainTime: 0,
    spawnState: 2,
  },
  {
    title: '❄ FurrSols #50',
    image: 'images/nfts/003.png',
    fluff: 0,
    attr: {
      feed: {total: 100, current: 90},
      rest: {total: 100, current: 82},
      groom: {total: 100, current: 76},
      play: {total: 100, current: 80}
    },
    remainTime: 0,
    spawnState: 3,
  },
  {
    title: '🍂 FurrSols #11',
    image: 'images/nfts/004.png',
    fluff: 0,
    attr: {
      feed: {total: 100, current: 90},
      rest: {total: 100, current: 92},
      groom: {total: 100, current: 88},
      play: {total: 100, current: 72}
    },
    remainTime: new Date().getTime() + 3600 * 24 * 1000,
    spawnState: 4,
  },
  {
    title: '❄ FurrSols #03',
    image: 'images/nfts/005.png',
    fluff: 0,
    attr: {
      feed: {total: 100, current: 86},
      rest: {total: 100, current: 72},
      groom: {total: 100, current: 80},
      play: {total: 100, current: 92}
    },
    remainTime: 0,
    spawnState: 1,
  },  
];

const Dashboard = () => {
  const anchorWallet = useAnchorWallet();
  const wallet = useWallet();
  const classes = useStyles();

  useEffect(() => {
    (async () => {

    })()
  }, []);
  

  return (
    <>
      {true && 
          <PrimaryLayout>
            <NavPart> </NavPart>

            <MainContent>
              <FilterPart
                options={filterOptions}
              >
                <Grid container direction="row" justifyContent="space-between" alignItems="center"  className={`pb-16 mb-16 ${classes.infoList}`}>
                  <Grid item md={7} sm={3} className={`pt-8 ${classes.info}`}>
                    Current Season
                  </Grid>
                  <Grid item md={5} sm={3} className={`pt-8 ${classes.info}`}>
                    : {`❄ Winter`}
                  </Grid>
                  <Grid item md={7} sm={3} className={`pt-8 ${classes.info}`}>
                    Your FurrSols
                  </Grid>
                  <Grid item md={5} sm={3} className={`pt-8 ${classes.info}`}>
                    : {5}
                  </Grid>
                </Grid>
              </FilterPart>

              <ContentPart>
                <Grid container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={3} className={`${styles.NftItem}`}>
                  {nfts.map((nft, index) => {
                    return  <Grid item lg={6} md={8} sm={8} key={index}>
                              <ItemBox>
                                <NftItem
                                  info={nft}
                                >

                                </NftItem>
                              </ItemBox>
                            </Grid>
                  })}
                </Grid>
              </ContentPart>
            </MainContent>
          </PrimaryLayout>
          
      }
    </>

  )
}

export default Dashboard;

