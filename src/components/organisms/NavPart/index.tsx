import * as React from "react";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import type { LinkProps } from "react-router-dom";

import * as anchor from '@project-serum/anchor';
import { useConnection, useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import { getImg } from "../../../utils/Helper";

import {MARKET_PAGES} from "./../../../constants/routers";

import styles from './index.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderBottom: '20px solid rgba(0,0,0,0.3)'
    },
    tab: {
      '&.active': {
        background: 'rgba(0,0,0,0.3)'
      },
      '& a': {
        color: theme.palette.text.disabled,
        '&.active': {
          color: theme.syscolor.light,
        }
      }
    },
    collection: {
      color: theme.palette.text.primary
    },
    getCollection: {
      background: '#7D3CCF',
      color: theme.palette.text.primary,
      fontSize: '0.875rem',
      boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.25)',
      '&:hover': {
        opacity: 0.75,
        color: theme.palette.text.primary,
        background: '#7D3CCF'
      }
    }
  })
)

type Props = {
  children: React.ReactNode
  className?: string
}

const CustomNav = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const classes = useStyles();

  return (
    <div className={`${styles.tab} ${match && `active`} ${classes.tab}`}>
      <Link
        to={to}
        {...props}
        className={`font-quick font-700 ${match && `active`}`}
      >
        {children}
      </Link>
    </div>
  );
}

const HeaderPart = (props: Props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <section
      className={`d-flex align-items-center justify-content-between global-padding ${classes.root}`}
    >
      <div className={`d-flex align-items-center justify-content-between`}>
        {MARKET_PAGES.map((tab, index) => {
          return <CustomNav to={tab.url} key={index} >{tab.node}</CustomNav>
        })}
      </div>

      <div className={`d-flex align-items-center justify-content-between`}>
        <div className={`d-flex align-items-center justify-content-between mr-16`}>
          <p className={`font-quick ${classes.collection} ${styles.collection}`}>
            FLUFF Collected:&nbsp;&nbsp;
          </p>
          <p className={`font-quick ${classes.collection}`}>
            {86500} <span className={`${styles.collectionAmount}`}>FLUFF</span>
          </p>
        </div>

        <div className={`text-center`}>
          <Button variant="contained" disableElevation fullWidth className={`font-quick ${styles.getCollection} ${classes.getCollection}`}>
            Claim FLUFF
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeaderPart;
