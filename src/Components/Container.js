
import { useSelector } from "react-redux";

function Container() {

    const data = useSelector((state) => state);
    return (
        console.log(data)
    )
}

export default Container
