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

import styles from './index.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: alpha(`${theme.syscolor.light}`, 0.02),
      borderColor: alpha(`${theme.syscolor.light}`, 0.1),
      borderWidth: '2px',
      borderStyle: 'solid',
    },
    item: {

    },
    image: {
      
    },
    number: {
      color: theme.palette.text.primary,
      background: alpha(`${theme.syscolor.dark}`, 0.85)
    },
    title: {
      color: theme.palette.text.primary,
      
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
        name: "Supplies",
        value:"supplies",
        enabled: true
      },
      {
        name: "Powerups",
        value:"powerups",
        enabled: true
      },
      {
        name: "Fluff",
        value:"fluff",
        enabled: true
      }
    ]
  }
];

const nfts = [
  {
    image: 'images/nfts/001.png',
    title: 'Pearl',
    fluff: 5000,
    piece: 1,
    amount: 500,
    descript: [
      "Minimum of 5 pieces",
      "Conversion: 500 Pearls ~ 25000 FLUFF"
    ],
  },
  {
    image: 'images/nfts/002.png',
    title: "Pillow",
    fluff: 3500,
    piece: 1,
    amount: 5,
    descript: [
      "Minimum of 5 pieces",
      "Conversion: 5 Pillows ~ 50 FLUFF"
    ],
  },
  {
    image: 'images/nfts/003.png',
    title: "Soap",
    fluff: 2000,
    piece: 1,
    amount: 0,
    descript: [
      "Minimum of 5 pieces"
    ],
  },
  {
    image: 'images/nfts/004.png',
    title: "Ball",
    fluff: 4500,
    piece: 1,
    amount: 0,
    descript: [
      "Minimum of 5 pieces"
    ],
  },
  {
    image: 'images/nfts/001.png',
    title: "Ball",
    fluff: 4500,
    piece: 1,
    amount: 0,
    descript: [
      "Minimum of 5 pieces"
    ],
  },
];

const MartPage = () => {
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
              </FilterPart>

              <ContentPart>
                <div className={`${styles.root} ${classes.root}`}>
                  <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={3}>
                      {nfts.map((nft, index) => {
                        return  <Grid item lg={2} md={3} sm={3} key={index}>
                                  <div className={`imageWrapper`}>
                                    <div className={`imageOver ${styles.item} ${classes.item}`}>
                                        <img src={getImg(nft.image)} className={`${styles.image} ${classes.image}`} />
                                        <p className={`${styles.title} ${classes.title}`}>{nft.title}</p>
                                        <p className={`text-center ${styles.number} ${classes.number}`}>5</p>
                                    </div>
                                  </div>
                                </Grid>
                      })}
                  </Grid>
                </div>
              </ContentPart>
            </MainContent>
          </PrimaryLayout>
          
      }
    </>

  )
}

export default MartPage;

