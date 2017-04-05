/**
 * login
 * Author: Barbara Goss
 * Created: 2017-04-04
 */
import React from 'react';
import $ from 'jquery';

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            mode: 'login',
            login: {
                name: "",
                email: "",
                password: ""
            },
            error: {}
        };

        this.updateField = this.updateField.bind(this);
        this.toggleMode = this.toggleMode.bind(this);
        this.login = this.login.bind(this);
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.login }>
                    {
                        this.state.mode === 'signup' ?
                            <input name="name"
                                   type="text"
                                   className="form-control"
                                   placeholder="username"
                                   value={ this.state.login.name }
                                   onChange={ this.updateField }
                            /> :
                            null
                    }
                    <input name="email"
                           type="text"
                           className="form-control"
                           placeholder="email"
                           value={ this.state.login.email }
                           onChange={ this.updateField }
                    />
                    <input name="password"
                           type="password"
                           className="form-control"
                           placeholder="password"
                           value={ this.state.login.password }
                           onChange={ this.updateField }
                    />
                    <button type="submit" className="btn btn-success">
                        { this.state.mode === 'login' ? 'Log In' : 'Sign Up' }
                    </button>
                    <button type="button"
                            className="button-transparent"
                            onClick={ this.toggleMode }
                    >
                        { this.state.mode === 'login' ? 'Sign Up' : 'Log In' }
                    </button>
                </form>
            </div>
        );
    }

    updateField(e) {
        let login = this.state.login;
        login[e.target.name] = e.target.value;
        this.setState({
            login: login
        });
    }

    toggleMode() {
        if (this.state.mode === 'login')
            this.setState({mode: 'signup'});
        else
            this.setState({mode: 'login'});
    }

    login(e) {
        e.preventDefault();

        var url;
        if (this.state.mode == 'login') {
            url = "/api/login";
        } else {
            url = "/api/signup";
        }

        $.ajax({
            method: 'POST',
            url: url,
            data: JSON.stringify(this.state.login),
            contentType: "application/json; charset=utf-8",
            success: (user) => {
                this.props.onLogin(user);
            },
            error: (err) => {
                this.setState({ error: "We couldn't log you in with those credentials." });
            }
        });

        /*
                let url = (this.state.mode === 'login') ? '/api/login' : '/api/signup';

                fetch(url, {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        name: this.state.login.name,
                        email: this.state.login.email,
                        password: this.state.login.password
                    })
                })
                    .then(user => this.props.onLogin(user))
                    .catch(err => this.setState({error: err}));
        */
    }

}

export default Login;