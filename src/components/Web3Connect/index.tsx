import React, { useEffect } from 'react'
import Web3Connect from 'web3connect'
import Button from '@material-ui/core/Button'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { getCurrentNetworkName } from 'src/utils/web3'
import styles from '../style.module.css'

type Props = {
  account: string
  setProviderData: Function
}

let web3ConnectListenersAdded = false

const web3Connect = new Web3Connect.Core({
  network: getCurrentNetworkName() || 'rinkeby',
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.REACT_APP_INFURA_ID,
      },
    },
  },
})

const Web3ConnectButton: React.FC<Props> = ({ account, setProviderData }) => {
  const connectProvider = (provider: any) => setProviderData(provider)
  const disconnectProvider = () => setProviderData()

  useEffect(() => {
    if (!web3ConnectListenersAdded) {
      web3ConnectListenersAdded = true

      web3Connect.on('connect', (provider: any) => {
        connectProvider(provider)
      })

      web3Connect.on('disconnect', () => {
        disconnectProvider()
      })

      web3Connect.on('close', () => {})
    }
  })

  const getTypeOfAccount = () => {
    let type: string
    if (account === process.env.REACT_APP_OPERATOR_ADDRESS) {
      type = 'Operator'
    } else if (account === process.env.REACT_APP_ORACLE_ADDRESS) {
      type = 'Oracle'
    } else {
      type = 'Trader'
    }
    return type
  }

  return account ? (
    <div className={styles.header}>
      <div className={styles.bold}>{getTypeOfAccount()}:</div>
      <div>{account}</div>
      <div>
        <Button variant="contained" onClick={disconnectProvider}>
          Disconnect
        </Button>
      </div>
    </div>
  ) : (
    <Button variant="contained" onClick={() => web3Connect.toggleModal()}>
      Connect
    </Button>
  )
}

export default Web3ConnectButton
