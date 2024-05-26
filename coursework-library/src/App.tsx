import AppHeader from "./components/AppHeader";
import {AppShell, Group, SegmentedControl} from "@mantine/core";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {routes} from "./config/routes.tsx";
import AppFooter from "./components/AppFooter";
import {AuthService} from "./service/AuthService.ts";
import {LinkTo} from "./config/links.ts";
import {useEffect, useState} from "react";
import {IUser, UserServiceApi} from "./service/UserService.ts";

function App() {
    const auth = new AuthService()
    const token = auth.getToken()
    const navigate = useNavigate()
    const location = useLocation();

    const [user, setUser] = useState<IUser | null>(null);

    console.log('token in app = ', token)
    useEffect(() => {
        UserServiceApi.getOperatorById(setUser)
    }, [token]);
    console.log('userFromApp = ', user)

    const menu = [
        {
            title: 'Клиенты',
            link: LinkTo.CLIENTS(),
            authority: ['OPERATOR', 'ADMIN']
        },
        {
            title: 'Операции',
            link: LinkTo.OPERATIONS(),
            authority: ['OPERATOR', 'ADMIN']
        },
        {
            title: 'Тарифы',
            link: LinkTo.TARIFFS(),
            authority: ['ADMIN']
        },
        {
            title: 'Операторы',
            link: LinkTo.OPERATORS(),
            authority: ['ADMIN']
        },
    ]

    return (
        <AppShell padding="md" footer={{height: 60}}
                  style={{fontFamily: 'Gilroy, sans-serif, inherit', display: 'flex', minHeight: '100hv'}}>
            <AppShell.Header style={{width: '100%'}}>
                <Group>
                    <AppHeader user={user}/>
                </Group>
            </AppShell.Header>

            <AppShell.Main style={{width: '100%', padding: '100px 50px 60px 50px', display: 'flex'}}>
                {user ?
                    <AppShell.Navbar style={{position: 'relative', zIndex: 1, width: '20%', height: '100%', border: 0, padding: '50px'}}>
                        <SegmentedControl
                            withItemsBorders={false}
                            orientation="vertical" size="xl"
                            onChange={(value) => navigate(value)}
                            color={'#0056b3'}
                            defaultValue={location.pathname}
                            data={menu.filter(it => it.authority.includes(user?.role.name)).map(it => {
                                return {
                                    label:
                                        <span>
                                            {it.title}
                                        </span>,
                                    value: it.link
                                }
                            })}
                        />
                    </AppShell.Navbar>
                    :
                    <></>
                }

                <Routes>
                    {
                        routes.find(it => it.path === '/')?.children?.map((route) => {
                            return (
                                <Route key={route.path} path={route.path} element={route.element}/>
                            )
                        })
                    }
                </Routes>
            </AppShell.Main>
            <AppShell.Footer style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <AppFooter/>
            </AppShell.Footer>
        </AppShell>
    );
}

export default App
