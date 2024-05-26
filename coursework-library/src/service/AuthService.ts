// import {useQuery} from "@tanstack/react-query";
import {restApiDomen} from "../config/envs.ts";
import {notifications} from "@mantine/notifications";
import {UserServiceApi} from "./UserService.ts";
// import {router} from "../config/routes.tsx";
// import {LinkTo} from "../config/links.ts";
// import * as axios from "axios";

export const currUserKeys = {
    curr: ['currentUser'] as const,
    check: ['check'] as const,
}

export async function logIn(login: string, password: string) {
    await window.fetch(`${restApiDomen}/logIn?login=${login}&password=${password}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(value => value.json().then(value1 => {
            const auth = new AuthService();
            auth.setOperatorId(value1['operatorId'])
            auth.setToken(value1['token'])
            return true;
        }))
        .catch(() => {
            notifications.show({
                title: 'Ошибка авторизации',
                message: 'Неверные логин или пароль',
                color: 'red'
            })
        });
}

export async function logOut() {
    const auth = new AuthService();
    console.log('token for logout = ', auth.getToken())
    await window.fetch(`${restApiDomen}/logOut`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": auth.getToken() ? `Bearer ${auth.getToken()}` : ''
        },
    })
        .finally(() => {
            auth.setToken('')
            auth.setOperatorId('')
        });
}

export const useCurrentUser = () => {
    return new AuthService().currentUser()
}

// export const useCheck = () => {
//     return useQuery({
//         queryKey: currUserKeys.check,
//         queryFn: () => new AuthService().check(),
//         refetchIntervalInBackground: true,
//         refetchOnWindowFocus: "always",
//         refetchInterval: 7000
//     })
// }

export class AuthService {
    public getToken() {
        return sessionStorage.getItem("token")
    }

    public setToken(token: string) {
        sessionStorage.setItem("token", token)
    }

    public async currentUser() {
        const operatorId = this.getOperatorId()
        if (operatorId) {
            return await UserServiceApi.getById(operatorId, operatorId)
        } else {
            return null
        }
    }

    public getOperatorId() {
        return sessionStorage.getItem("operatorId")
    }

    public setOperatorId(operatorId: string) {
        sessionStorage.setItem("operatorId", operatorId)
    }

    // public logout() {
    //     return axios.get("/api/logout", {
    //         headers: {
    //             "Authorization": `Bearer ${this.getToken()}`
    //         }
    //     })
    //         .then(() => {
    //             sessionStorage.setItem("token", "")
    //             router.navigate(LinkTo.LOGIN())
    //         })
    //         .catch(() => {
    //             sessionStorage.setItem("token", "")
    //             router.navigate(LinkTo.LOGIN())
    //         })
    // }

    // public check() {
    //     return axios.get(`/api/token`, {
    //         headers: {
    //             "Authorization": `Bearer ${this.getToken()}`
    //         }
    //     })
    //         .then(res => {
    //             if (res.data) {
    //                 return true;
    //             } else {
    //                 sessionStorage.setItem("token", "")
    //                 this.setUser("")
    //                 router.navigate(LinkTo.LOGIN())
    //                 return false;
    //             }
    //         })
    //         .catch(() => {
    //             sessionStorage.setItem("token", "")
    //             router.navigate(LinkTo.LOGIN())
    //             this.setUser("")
    //             return false;
    //         })
    // }
}