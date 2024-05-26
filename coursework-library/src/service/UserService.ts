import {restApiDomen} from "../config/envs.ts";
import {AuthService} from "./AuthService.ts";
import {SetStateAction} from "react";

export interface IUser {
    id: number,
    operatorInfo: IUserInfo,
    login: string,
    role: IRole,
    creatorId: number,
}

export interface IUserInfo {
    id: number,
    lastName: string,
    firstName: string,
    middleName: string,
    phoneNumber: string,
    birthData: string
}

export interface IRole {
    id: number,
    name: string
}

export namespace UserServiceApi {

    export const getOperatorById = (setOperator: React.Dispatch<SetStateAction<IUser | null>>) => {
        const operatorId = new AuthService().getOperatorId()
        if (operatorId) {
            UserServiceApi.getById(operatorId, operatorId)
                .then(response => {
                    console.log('GET operator by operator ID')
                    if (response) {
                        setOperator(response);
                    }
                })
                .catch(() => {
                        console.log('Error while GET operator by operator ID')
                    }
                )
        } else {
            setOperator(null)
        }
    }

    export async function getById(operatorId: number | string, targetId: number | string): Promise<IUser | null> {
        const auth = new AuthService();
        const res = await window.fetch(`${restApiDomen}/api/operator/getOperatorById?operatorId=${operatorId}&targetId=${targetId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth.getToken() ? `Bearer ${auth.getToken()}` : ''
            },
        })
        if (res.ok) {
            return await res.json();
        } else {
            return null;
        }
    }

}