import { useContext } from 'react'
import { userContext } from './App'
const Sample = () => {
	const { name, setName } = useContext(userContext)
	const handleOnchange = (event) => {
		setName(event.target.value)
	}
	return (
		<div>
			<p>{name}</p>
			<input value={name} onChange={handleOnchange} />
		</div>
	)
}
export default Sample
