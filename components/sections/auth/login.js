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
            <div className="row login-form my-md-5">
                <div className="col-sm-22 col-md-12 col-xl-6 mx-auto">
                    <form onSubmit={ this.login }>
                        <legend>Let's go to the pictures!</legend>
                        {
                            this.state.mode === 'signup' ?
                                <div className="form-group">
                                    <input name="name"
                                           type="text"
                                           className="form-control"
                                           placeholder="display name"
                                           value={ this.state.login.name }
                                           onChange={ this.updateField }
                                    />
                                </div> :
                                null
                        }
                        <div className="form-group">
                            <input name="email"
                                   type="text"
                                   className="form-control"
                                   placeholder="email"
                                   value={ this.state.login.email }
                                   onChange={ this.updateField }
                            />
                        </div>
                        <div className="form-group">
                            <input name="password"
                                   type="password"
                                   className="form-control"
                                   placeholder="password"
                                   value={ this.state.login.password }
                                   onChange={ this.updateField }
                            />
                        </div>
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

        let url;
        if (this.state.mode === 'login') {
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
            error: (error) => {
                this.setState({ error: error });
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