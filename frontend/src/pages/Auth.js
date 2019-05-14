import React, { Component } from 'react' 

import AuthContext from '../context/auth-context'
import './Auth.css'

class AuthPage extends Component {
    state = { isLogin: true }

    static contextType = AuthContext

    constructor(props) {
        super(props) 
        this.emailEl = React.createRef() 
        this.passwordEl = React.createRef() 
    }

    switchModeHandler = () => {
        this.setState(prevState => { 
            return { isLogin: !prevState.isLogin }
        })
    }

    submitHandler = async (e) => {
        e.preventDefault() 
        const email = this.emailEl.current.value 
        const password = this.passwordEl.current.value

        if(email.trim().length === 0 || password.trim().length === 0) {
            return 
        }

        let reqBody = {
            query: `
                query LoginUser($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `,
            variables: {
                email,
                password
            }
        } 

        if(!this.state.isLogin) {
            reqBody = {
                query: `
                    mutation CreateUser($email: String!, $password: String!) {
                        createUser(userInput: { email: $email, password: $password }) {
                            _id
                            email
                        }
                    }
                `,
                variables: {
                    email,
                    password 
                }
            }
        }

        try {
            const res = await fetch('http://localhost:5000/graphql', {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!')
            }
            const resData = await res.json() 

            if(resData.data.login.token) {
                this.context.login(
                    resData.data.login.token, 
                    resData.data.login.userId, 
                    resData.data.login.tokenExpiration
                )
            }
        }
        catch(err) { console.log(err) }
    }

    render() {
        return (
            <form className='auth-form' onSubmit={this.submitHandler}>
                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' ref={this.emailEl} />
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' ref={this.passwordEl} />
                </div>
                <div className='form-actions'>
                    <button type='button' onClick={this.switchModeHandler}>
                        Switch to {this.state.isLogin ? 'Signup' : 'Login'}
                    </button>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        )
    }
}

export default AuthPage