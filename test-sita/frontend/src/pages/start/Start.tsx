import './_Start.scss'
import { useHistory } from "react-router-dom";
// Img
import Logo from '../../assets/images/StartLogo.png'
import { useEffect } from 'react';

function Start() {

    const history = useHistory();

    const handleEnterPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            start()

        }
    };

    const handleClick = (e: MouseEvent) => {
        if (e.button === 0) {
            start()
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleEnterPress);
        window.addEventListener('mousedown', handleClick);
    }, [])

    const start = () => {
        window.removeEventListener('keydown', handleEnterPress)
        window.removeEventListener('mousedown', handleClick)

        history.push('/list')
    }





    return (<div onKeyPress={(e) => {
        if (e.key === 'Enter') {
            alert("Pressed")
        } else {
            alert("not")
        }
    }} className='startScreen'>
        <img src={Logo} alt="" />
    </div>)
}

export default Start;