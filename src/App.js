import './App.css';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import Rank from "./components/rank/Rank";
import {useEffect, useState} from "react";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import SignIn from "./components/signin/SignIn";
import Registration from "./components/registration/Registration";

function App() {
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [box, setBox] = useState({});
    const [route, setRoute] = useState('signin')
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    })

    const loadUser = (data) => {
        setUser(data)
    }

    const onInputChange = (e) => {
        setInput(e.target.value)
    }

    const onSubmit = () => {
        setImageUrl(input)
        fetch('https://dazzling-redwood-70962.herokuapp.com/imageurl', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: input
            })
        })
            .then(res => res.json())
            .then(response => {
                if (response) {
                    fetch('https://dazzling-redwood-70962.herokuapp.com/image', {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: user.id
                        })
                    }).then(res => res.json())
                        .then(count => {
                            setUser({...user, entries: count})
                        })
                        .catch(console.log)
                }
                displayFaceBox(calculateFaceLocation(response.outputs[0].data.regions[0].region_info.bounding_box))
            })
            .catch(err => console.log(err))
    }

    const calculateFaceLocation = (data) => {
        const clarifaiFace = data;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    const displayFaceBox = (box) => {
        setBox(box)
    }

    return (
        <div className="App pb5">
            {route === 'home' ?
                <>

                    <Navigation onSignOut={() => {
                        setRoute('signin')
                        setUser({
                            id: '',
                            name: '',
                            email: '',
                            entries: 0,
                            joined: ''
                        })
                        setImageUrl('')
                    }}/>
                    <Logo/>
                    <Rank user={user}/>
                    <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit}/>
                    <FaceRecognition imageUrl={imageUrl} box={box}/>
                </> : (route === 'signin' ?
                    <SignIn loadUser={loadUser} onRouteChange={() => setRoute('home')}
                            registration={() => setRoute('registration')}/> :
                    <Registration loadUser={loadUser} onRegister={() => setRoute('home')}
                                  signIn={() => setRoute('signin')}/>)
            }

        </div>
    );
}

export default App;
