import React, { useEffect } from 'react'
import Web3Connect from 'web3connect'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { getCurrentNetworkName } from '../utils/web3'

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

  return account ? (
    <>
      {account}
      <button onClick={disconnectProvider}>Disconnect</button>
    </>
  ) : (
    <button onClick={() => web3Connect.toggleModal()}>Connect</button>
  )
}

export default Web3ConnectButton
