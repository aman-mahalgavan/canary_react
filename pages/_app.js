import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import initStore from '../redux/configureStore';
import { getCookie } from "../utils/cookie";
import { resetUser } from "../redux/actions/authActions";
import setAuthToken from "../utils/setAuthToken";
import { formatToken } from "../utils/formatToken";
import BaseLayout from "../components/layouts/BaseLayout.js"
class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let appProps = {};

        if (ctx.isServer) {
            if (ctx.req.headers.cookie) {
                let token = getCookie("authorization", ctx.req);

                if (token) {
                    token = formatToken(token);

                    setAuthToken(token);
                    await ctx.store.dispatch(resetUser());

                }
            }
        }
        console.log(ctx.isServer ? "On Server" : "On Client");

        if (Component.getInitialProps) {
            appProps = await Component.getInitialProps(ctx);
        }
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
