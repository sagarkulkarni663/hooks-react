import { useReducer, useEffect, useRef, createContext, useState } from 'react'
import Sample from './Sample'
import './App.css'
const initialState = {
	count: 0,
	status: true
}
const apiCall = async () => {
	try {
		const getApi = await fetch(
			'https://jsonplaceholder.typicode.com/posts',
			{
				method: 'POST',
				body: { a: 'hello' },
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		const data = await getApi.json()
		console.log(data)
	} catch (error) {
		console.log('error', error)
	}
}
const reducer = (state, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return { ...state, count: state.count + 1 }
		case 'STATUS':
			return { ...state, status: !state.status }
		default:
			return state
	}
}
export const userContext = createContext(null)
const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [name, setName] = useState('')
	const useRefDom = useRef()
	useEffect(() => {
		apiCall()
	}, [])
	const handleClick = () => {
		dispatch({ type: 'INCREMENT' })
		dispatch({ type: 'STATUS' })
	}
	const handlefocus = () => {
		console.log(useRefDom.current.focus())
	}
	return (
		<>
			<userContext.Provider value={{ name, setName }}>
				<p>{state.count}</p>
				<button onClick={handleClick}>increment</button>
				{state.status && <p>iam a toogle</p>}
				<input ref={useRefDom} />
				<button onClick={handlefocus}>focus</button>
				<Sample />
			</userContext.Provider>
		</>
	)
}
export default App
