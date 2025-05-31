import { useParams } from "react-router-dom"

const Room: React.FC = () => {

    const { id } = useParams()

    return(
        <div>
            Room : {id}
        </div>
    )  
}

export default Room