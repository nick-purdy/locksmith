import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Home from './app/screens/home/home'
import Seal from './app/screens/seal/seal'
import Unseal from './app/screens/seal/unseal'
import Authenticate from './app/screens/authenticate/authenticate'
import AuthenticateLdap from './app/screens/authenticate/ldap'
import AuthenticateToken from './app/screens/authenticate/token'
import Secret from './app/screens/secret/secret'
import SecretCreate from './app/screens/secret/create'
import SecretUpdate from './app/screens/secret/update'
import Policy from './app/screens/policy/policy'
import PolicyCreate from './app/screens/policy/create'
import PolicyUpdate from './app/screens/policy/update'
import AuditBackend from './app/screens/audit-backend/audit-backend'
import AuditBackendMount from './app/screens/audit-backend/mount'
import Config from './app/screens/config/config'
import AuthBackend from './app/screens/auth-backend/auth-backend'
import SecretBackend from './app/screens/secret-backend/secret-backend'
import Token from './app/screens/token/token'
import TokenLookup from './app/screens/token/lookup'
import TokenCreate from './app/screens/token/create'
import './assets/css/font-awesome.min.css'
import './assets/css/fonts-roboto.css'
import './assets/css/normalize.css'
import './assets/css/milligram.min.css'
import './assets/css/locksmith.css'
import './assets/css/popover-menu.css'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/seal" component={Seal} />
    <Route path="/unseal" component={Unseal} />
    <Route path="/authenticate" component={Authenticate} />
    <Route path="/authenticate/ldap" component={AuthenticateLdap} />
    <Route path="/authenticate/token" component={AuthenticateToken} />
    {/* <Route path="/secret/" component={Secret} /> */}
    <Route path="/secret/list/:path" component={Secret} />
    <Route path="/secret/create/:path" component={SecretCreate} />
    <Route path="/secret/update/:path" component={SecretUpdate} />
    <Route path="/policy" component={Policy} />
    <Route path="/policy/create" component={PolicyCreate} />
    <Route path="/policy/update/:path" component={PolicyUpdate} />
    <Route path="/audit-backend" component={AuditBackend} />
    <Route path="/audit-backend/mount" component={AuditBackendMount} />
    <Route path="/config" component={Config} />
    <Route path="/auth-backend" component={AuthBackend} />
    <Route path="/secret-backend" component={SecretBackend} />
    <Route path="/token" component={Token} />
    <Route path="/token/lookup/:path" component={TokenLookup} />
    <Route path="/token/create" component={TokenCreate} />
  </Router>,
  document.getElementById('page-contents')
)
