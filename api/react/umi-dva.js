// ---- umi
import Link from 'umi/link';
import NavLink from 'umi/navlink';
// https://reacttraining.com/react-router/web/api/NavLink
<Link to="/">Go to</Link>

import router from 'umi/router';
// path is "/list?a=b" {pathname:"/list", query: {a: 'b'}}
router.push(path);
router.replace(path);
router.go(n);
router.goBack();

import Redirect from 'umi/redirect';
<Redirect to="/login" />

import Prompt from 'umi/prompt';
// https://reacttraining.com/react-router/core/api/Prompt
<Prompt
    when={true}
    message={(location) => {
        return window.confirm(`confirm to leave to ${location.pathname}`);
    }}
/>

// withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
import withRouter from 'umi/withRouter';
withRouter(connect()(Component))

// react-loadable
import dynamic from 'umi/dynamic';
const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
const App = dynamic({
  loader: async function() {
    await delay(/* 1s */1000);
    return () => <div>I will render after 1s</div>;
  },
});

// ---- dva
import { connect } from 'dva';
import { Router, Route, routerRedux } from 'dva/router';
import { fetch } from 'dva/fetch';
import { dynamic } from 'dva/dynamic';

const UserPageComponent = dynamic({
    app,
    model: () => [import("./models/users")],
    component:()=>import('./routes/UserPage')
})

const app = dva({
    history,
    initialState,
    onError,
    onAction,
    onStateChange,
    onReducer,
    onEffect,
    onHmr,
    extraReducers,
    extraEnhancers
})


// state
let state = {
    loading: {
        effects: {},
        global: false,
        models: {},
        routing: {
            location: {
                pathname: "/",
                search: "",
                hash: "",
                query: {},
                state:undefined
            }
        }
    },
};

// props
let props = {
    children: null,
    computedMatch: {
        path: "/",
        url: "/",
        isExact: true,
        params: {}
    },
    dispatch: f(),
    history: {
        action: "POP",
        block: f(),
        createHref: f(),
        go: f(),
        goBack: f(),
        goForward: f(),
        length: 7,
        listen: f(),
        location: {},
        push: f(),
        replace: f()
    },
    location: {},
    match: {
        url:"",
        params: {}
    },
    route: {
        component: DynamicComponent(),
        exact: true,
        path: "/",
        _title: "umi-test",
        _title_default:"umi-test"
    },
    staticContext: undefined,
    ...varGlobal
};

// DvaContainer => Provider => RouterWrapper => ConnectRouter => Router =>
// Switch => RouteWithProps(key, path) => Route(path) =>
// DynamicComponent => withRouter => Route => Connect