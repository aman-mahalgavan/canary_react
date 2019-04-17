import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import initStore from '../redux/configureStore';
import { getCookie } from "../utils/cookie";
import { resetUser, setToken } from "../redux/actions/authActions";
import NProgress from "next-nprogress/component";

import { formatToken } from "../utils/formatToken";
import BaseLayout from "../components/layouts/BaseLayout.js"
import axios from "axios";
class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let appProps = {};

        let token;
        let formattedToken
        if (ctx.isServer) {
            if (ctx.req.headers.cookie) {
                token = getCookie("authorization", ctx.req);
            }

        }
        else {
            token = getCookie("authorization");
        }
        if (token) {
            formattedToken = formatToken(token);

            // setAuthToken(formattedToken);

            await ctx.store.dispatch(resetUser(formattedToken));
            ctx.store.dispatch(setToken(formattedToken))
        }

        let pageProps = {}
        ctx.token = formattedToken;
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        appProps = { pageProps }

        return { ...appProps, token: formattedToken }
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <Container>
                <Provider store={store}>

                    <BaseLayout>
                        <NProgress color="#009E74"
                            options={{ trickleSpeed: 100 }}
                            showAfterMs={300}
                            spinner />
                        <Component {...pageProps} />
                    </BaseLayout>
                </Provider>
            </Container>
        )

    }
}


export default withRedux(initStore)(MyApp);
