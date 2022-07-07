import React, {useState} from 'react';

function SignIn({onRouteChange, registration, loadUser}) {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [error, setError] = useState(null);

    const user = {
        email: signInEmail,
        password: signInPassword
    }

    const onSubmitSignIn = (e) => {
        e.preventDefault()

        fetch('https://dazzling-redwood-70962.herokuapp.com/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(user => {
                console.log(user)
                if(user.id) {
                    loadUser(user)
                    onRouteChange()
                } else {
                    setError('hmm, something about those credentials isn\'t quite right')
                }
            })
    }

    return (
        <main className="black-80 pt5">
            <form className="measure center pa4 ba b--black-50 br3 shadow-4">
                <fieldset className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                    {error && <p className={"red"}>{error}</p>}
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={(e) => setSignInEmail(e.target.value)}
                               className="pa2 input-reset ba bg-transparent hover-bg-black-50 hover-white w-100"
                               type="email" name="email-address" autoComplete={'off'}/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={(e) => setSignInPassword(e.target.value)}
                               className="b pa2 input-reset ba bg-transparent hover-bg-black-50 hover-white w-100"
                               type="password" name="password" autoComplete={'off'}/>
                    </div>
                </fieldset>
                <div className="">
                    <input onClick={onSubmitSignIn}
                           className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                           type="submit" value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                    <a onClick={registration} className="f6 link pointer dim black db">Register</a>
                </div>
            </form>
        </main>

    );
}

export default SignIn;