import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import initStore from '../redux/configureStore';
import { getCookie } from "../utils/cookie";
import { resetUser } from "../redux/actions/authActions";
import setAuthToken from "../utils/setAuthToken";
import { formatToken } from "../utils/formatToken";
import BaseLayout from "../components/layouts/BaseLayout.js"
import axios from "axios";
class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let appProps = {};

        let token;
        if (ctx.isServer) {
            if (ctx.req.headers.cookie) {
                token = getCookie("authorization", ctx.req);
            }

        }
        else {
            token = getCookie("authorization");
        }
        if (token) {
            let formattedToken = formatToken(token);

            // setAuthToken(formattedToken);

            await ctx.store.dispatch(resetUser(formattedToken));
        }

        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        appProps = { pageProps }

        return { ...appProps }
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <BaseLayout>
                        <Component {...pageProps} />
                    </BaseLayout>
                </Provider>
            </Container>
        )

    }
}


export default withRedux(initStore)(MyApp);
