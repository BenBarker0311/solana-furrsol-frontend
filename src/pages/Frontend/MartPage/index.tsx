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
import MartItem from './../../../components/molecules/MartItem'

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
        name: "Supplies",
        value:"supplies",
        enabled: true
      },
      {
        name: "Powerups",
        value:"powerups",
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
                <Grid container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={3}>
                  {nfts.map((nft, index) => {
                    return  <Grid item lg={4} md={6} key={index}>
                              <ItemBox>
                                <MartItem
                                  info={nft}
                                >

                                </MartItem>
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

export default MartPage;

