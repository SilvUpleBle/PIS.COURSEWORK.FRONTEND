import {useForm} from "@mantine/form";
import {Button, Container, Flex, Input, PasswordInput} from "@mantine/core";
import {logIn, logOut} from "../../service/AuthService.ts";
import {useLayoutEffect, useState} from "react";
import {notifications} from "@mantine/notifications";
import {useNavigate} from "react-router-dom";
import {LinkTo} from "../../config/links.ts";
import {IUser, UserServiceApi} from "../../service/UserService.ts";

const Authorization = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [refetch, setRefetch] = useState(false)

    useLayoutEffect(() => {
        UserServiceApi.getOperatorById(setUser)
        setRefetch(false)
    }, [refetch]);

    const navigate = useNavigate()
    if (!refetch && user) {
        navigate(LinkTo.CLIENTS())
    }

    const form = useForm({
        initialValues: {
            login: '',
            password: ''
        },
        validate: {
            login: (value) => {
                if (value.length > 0) {
                    return null;
                } else {
                    notifications.show({
                        title: 'Ошибка авторизации',
                        message: 'Логин не может быть пустыми',
                        color: 'red'
                    })
                    return ' '
                }
            },
            password: (value) => {
                if (value.length > 0) {
                    return null;
                } else {
                    notifications.show({
                        title: 'Ошибка авторизации',
                        message: 'Пароль не может быть пустыми',
                        color: 'red'
                    })
                    return ' '
                }
            }
        },
    });

    return (
        user ?
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                gap: 15,
            }}>
                <Container>
                    <Button
                        radius="md"
                        size={'lg'}
                        style={{
                            backgroundColor: '#f4b940',
                            fontWeight: 400
                        }}
                        onClick={() => logOut().then(() => {
                            setRefetch(true);
                        })}
                    >
                        ВЫЙТИ
                    </Button>
                </Container>
            </div>
            :
            <form
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    gap: 15,
                }}
                onSubmit={
                    form.onSubmit((values) => logIn(values.login, values.password)
                        .then(() => {
                            setRefetch(true)
                        })
                    )}
            >
                <Container miw={400}>
                    <Input
                        radius={'md'}
                        size={'lg'}
                        w={'100%'}
                        style={{fontWeight: 400}}
                        placeholder="Логин"
                        {...form.getInputProps('login')}
                    />
                </Container>
                <Container miw={400}>
                    <PasswordInput
                        radius={'md'}
                        w={'100%'}
                        size={'lg'}
                        style={{borderColor: 'black', fontWeight: 400}}
                        placeholder="Пароль"
                        {...form.getInputProps('password')}
                    />
                </Container>
                <Flex style={{alignItems: 'flex-start', justifyContent: 'flex-end', marginRight: 32, width: '100%'}}>
                    <Button
                        type="submit"
                        radius="md"
                        size={'lg'}
                        style={{backgroundColor: '#4043f4', fontWeight: 400}}
                    >
                        ВОЙТИ
                    </Button>
                </Flex>

            </form>
    )
        ;
};

export default Authorization;