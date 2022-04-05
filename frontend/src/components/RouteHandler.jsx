import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import { ROUTES } from '../js/Const';
import Login from './Login';
import Dashboard from './Dashboard';
import NavBar from './nav/NavBar';
import { GlobalContext } from '../context/providers/GlobalContextProvider';

export default function RouteHandler(props) {
    const context = useContext(GlobalContext);

    let { history } = props;
    context.setHistory(history);

    let { route, id } = useParams();
    route = route || ROUTES.HOME;
    let continueRender = false;
    let user = {
        id: "12345",
        fname: "james",
        lname: "gardo",
        role: 1234
    }


    if (route) {
        //check if data is ready

        //check if user is logged in, re-route to login if not
        if (user) {
            continueRender = true;
        } else {
            continueRender = false;
        }

        //check if user has permission for that route/component
        // switch (route) {
        //     case ROUTES.LOGIN:
        //     case ROUTES.REGISTER:
        //     case ROUTES.FORGOT_PASSWORD:
        //     case ROUTES.RESET_PASSWORD:
        //     case ROUTES.VERIFY:
        //     default:
        // }

        if (continueRender) {
            console.info({ route, contextRoute: context.route })
            switch (context.route || route) {
                case ROUTES.LOGIN:
                    return <>
                        <NavBar />
                        <Login />
                    </>
                case ROUTES.REGISTER:
                case ROUTES.FORGOT_PASSWORD:
                case ROUTES.RESET_PASSWORD:
                case ROUTES.VERIFY:
                case ROUTES.HOME:
                    return <>
                        <NavBar />
                        <Dashboard />
                    </>
                default:
                    return <>
                        <button onClick={() => {
                            history.push("/")
                        }}>ReRoute</button>
                        <NotFound history={history} />
                    </>

            }
        } else {
            //Render Login Page
            return <>
                <button onClick={() => {
                    history.push("/login")
                }}>ReRoute</button>
                <Login />
            </>
        }

    } else {
        return <NotFound />
    }

    // return (
    //     <div>
    //         <p> Page: {route || "Home"} </p>
    //         <p> Id: {id || ""} </p>
    //     </div>
    // )
}

