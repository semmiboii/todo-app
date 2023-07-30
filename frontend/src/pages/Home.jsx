import { useEffect, useState } from 'react'
import Homepage from '../components/Homepage'
import { useGetTodoQuery } from '../redux/services/Task';

const Home = () => {

const { data: allTodos, isSuccess, isLoading} = useGetTodoQuery();

const [todos,setTodos] = useState([])

useEffect(() => {
    if(isSuccess && !isLoading){
        setTodos(allTodos)
    }
},[isSuccess, isLoading, allTodos])

return(
    <Homepage todos={todos}/>
)
}
export default Home