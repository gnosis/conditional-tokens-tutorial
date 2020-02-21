import React, { useState } from 'react'
import Web3 from 'web3'
import Web3ConnectButton from 'src/components/Web3Connect'
import Market from 'src/components/Market'
import { getWeb3Account } from 'src/utils/web3'
import styles from './style.module.css'

const App: React.FC = () => {
  const [web3, setWeb3] = useState<any>(undefined)
  const [account, setAccount] = useState<string>('')

  const setProviderData = async (provider: any) => {
    let newWeb3, newAccount
    if (provider) {
      newWeb3 = new Web3(provider)
      newAccount = await getWeb3Account(newWeb3)
    } else {
      newWeb3 = null
      newAccount = null
    }
    setWeb3(newWeb3)
    setAccount(newAccount)
  }

  return (
    <div className={styles.container}>
      <h1>Conditional Tokens Tutorial: Categorical Market Example</h1>
      {process.env.REACT_APP_ORACLE_ADDRESS && process.env.REACT_APP_OPERATOR_ADDRESS ? (
        <>
          <Web3ConnectButton account={account} setProviderData={setProviderData} />
          {web3 && account && <Market web3={web3} account={account} />}
        </>
      ) : (
        <div>Configuration error</div>
      )}
    </div>
  )
}

export default App
