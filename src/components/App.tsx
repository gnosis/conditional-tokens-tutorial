import React, { useState } from 'react'
import Web3 from 'web3'
import Web3ConnectButton from 'src/components/Web3ConnectButton'
import { getReadOnlyWeb3Provider, getWeb3Account } from 'src/utils/web3'

const App: React.FC = () => {
  const [web3, setWeb3] = useState<any>(new Web3(getReadOnlyWeb3Provider()))
  const [account, setAccount] = useState<any>(null)

  const setProviderData = async (provider: any) => {
    if (provider) {
      const newWeb3 = new Web3(provider)
      const newAccount = await getWeb3Account(newWeb3)
      setWeb3(newWeb3)
      setAccount(newAccount)
    } else {
      const newWeb3 = new Web3(getReadOnlyWeb3Provider())
      setWeb3(newWeb3)
      setAccount(null)
    }
  }

  return (
    <div>
      <h1>Conditional Tokens Tutorial App Example</h1>
      <Web3ConnectButton account={account} setProviderData={setProviderData} />
    </div>
  )
}

export default App
