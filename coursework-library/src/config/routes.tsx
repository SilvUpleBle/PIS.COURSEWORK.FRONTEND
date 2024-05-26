import {Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import Authorization from "../pages/Authorization";
import {LinkTo} from "./links.ts";
import AccessDenied from "../pages/AccessDenied";
import App from "../App.tsx";
import {roles} from "../utils/roles.ts";
import NotFound from "../pages/NotFound";

export const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: LinkTo.AUTHORIZATION(),
                element: <Authorization/>,
            },
            {
                path: "*",
                element: <NotFound/>,
                authority: [
                    {
                        id: roles.ADMIN.id,
                        edit: true
                    },
                    {
                        id: roles.MODIFIER.id,
                        edit: true
                    }
                ],
            },
            // {
            //     path: LinkTo.CLIENTS(),
            //     element: <Clients/>,
            //     authority: [
            //         {
            //             id: roles.ADMIN.id,
            //             edit: true
            //         },
            //         {
            //             id: roles.MODIFIER.id,
            //             edit: true
            //         }
            //     ],
            // },
            // {
            //     path: LinkTo.OPERATIONS(),
            //     element: <Operations/>,
            //     authority: [
            //         {
            //             id: roles.ADMIN.id,
            //             edit: true
            //         },
            //         {
            //             id: roles.MODIFIER.id,
            //             edit: true
            //         }
            //     ],
            // },
            // {
            //     path: LinkTo.TARIFFS(),
            //     element: <Tariffs/>,
            //     authority: [
            //         {
            //             id: roles.ADMIN.id,
            //             edit: true
            //         },
            //     ],
            // },
            // {
            //     path: LinkTo.OPERATORS(),
            //     element: <Operators/>,
            //     authority: [
            //         {
            //             id: roles.ADMIN.id,
            //             edit: true
            //         },
            //     ],
            // },
            {
                path: LinkTo.ACCESS_DENIED(),
                element: <AccessDenied/>
            },
        ]
    },
]

const routers = routes.map(it => it.children ? <Route key={it.path} path={it.path} element={it.element}>
    {
        it.children.map(route => <Route key={it.path} path={route.path} element={route.element}/>)
    }
</Route> : <Route key={it.path} path={it.path} element={it.element}/>)

export const router = createBrowserRouter(
    createRoutesFromElements(<>{routers}</>)
)