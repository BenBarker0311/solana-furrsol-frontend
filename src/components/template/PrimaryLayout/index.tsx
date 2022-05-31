import * as React from "react";

import * as anchor from '@project-serum/anchor';
import { useConnection, useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import {PRIMARY_LOGO} from "./../../config";

import HeaderPart from "./../../organisms/HeaderPart";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default
    },
  })
)

type Props = {
  children: React.ReactNode
  className?: string
}

const menues = [
  {
    node: "GAME GUIDE",
    url: "/guide",
  },
  {
    node: "MARKETPLACE",
    url: "/market",
  },
];

const PrimaryLayout = (props: Props) => {
  const { children, className } = props;
  const classes = useStyles();
  return (
    <section
      className={`root ${classes.root}`}
    >
      <HeaderPart 
        menu={menues}
        logo={PRIMARY_LOGO}
      >

      </HeaderPart>

      <>
        {children}
      </>
    </section>
  )
}

export default PrimaryLayout;
