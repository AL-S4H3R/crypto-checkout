import React from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

//Web3 stuff
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import Portis from '@portis/web3'

var coinApi = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2&page=1&sparkline=false`

const PaymentTest: React.FC = () => {
	
	const [completePayment, setCompletePayment] = React.useState(false)
	
	const providerOptions = {
		portis: {
			package: Portis, // required
			options: {
			  id: "4795aa60-5914-42f2-bc7d-7dacb6e192cf" // required
			}
		}
	}

	const web3modal = new Web3Modal({
		providerOptions
	})

	
	const connectToPortis = async () => {
		const provider = await web3modal.connect()
		const web3 = new Web3(provider)
		console.log(web3)
		const accounts = await web3.eth.getAccounts()
		console.log('Account', accounts[0])
		if(accounts){
			setCompletePayment(true)
		}
	}

	return(
		<>
		<div style={{fontFamily:"'Quicksand', sans-serif"}} className="bg-gray-200 h-screen w-screen lg:space-y-8">
			<nav className="px-8 py-4 lg:px-16">
				<NavLink to="/" style={{fontFamily:"'Krub', sans-serif"}} className="text-3xl">axios</NavLink>
			</nav>
			<section className="px-8 lg:px-16 space-y-4">
				<h1 className="font-bold text-3xl text-gray-800">1-click crypto checkouts for e-commerce.</h1>
			    <p className="text-xl">Easily accept cryptocurrencies and tokens for your ecommerce store.</p>
			</section>
			<div className="px-8 py-4 lg:px-16">
				<button onClick={connectToPortis} className="bg-gray-800 p-2 text-gray-200">Checkout with Crypto</button>
			</div>
		</div>
			{
				completePayment && <TransactionModal />
			}
		</>
	)
}

const TransactionModal: React.FC = () => {
	
	const [priceInEth, setPriceInEth] = React.useState<number | null>(null)
	const [loading, setLoading] = React.useState(true)

	const amount = 396.60

	React.useEffect(() => {
		getEthPrice()
	},[])
	
	const getEthPrice = async () => {
		var res = await axios.get(coinApi)
		var ethPrice = res.data[1].current_price
		console.log(ethPrice)
		var price = parseFloat((amount/ethPrice).toFixed(3))
		console.log(price)
		setPriceInEth(price)
		setLoading(false)
	}

	return(
		<>
			<div
            	className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none"
          	>
            <div className="relative w-md mx-auto max-w-md">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Finish Payment
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Total order : <span className="text-blueGray-800 font-semibold"> ${amount} </span> 
                  </p>
				  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Amount in ETH: <span className="text-blueGray-800 font-semibold"> {priceInEth} </span> 
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {}}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {}}
                  >
                    CONFIRM
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
	)
}

export default PaymentTest