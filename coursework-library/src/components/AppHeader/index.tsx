import {Button, Flex, Image} from "@mantine/core";
import {logOut} from "../../service/AuthService.ts";
import {LinkTo} from "../../config/links.ts";
import {useNavigate} from "react-router-dom";
import {IUser} from "../../service/UserService.ts";

const AppHeader = (props: {
    user: IUser | undefined | null
}) => {
    const {user} = props
    const navigate = useNavigate();
    return (
        <div style={{
            fontSize: 16,
            lineHeight: "1.5",
            width: '100%'
        }}>
            <Flex
                style={{
                    display: 'flex',
                    padding: 10,
                    paddingRight: 15,
                    paddingLeft: 15,
                    boxSizing: 'border-box',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    maxWidth: 1300,
                    justifyContent: 'space-between'
                }}>
                <Image src={'../../../logo/logo_header.svg'} style={{width: 98, display: 'flex'}}/>
                {user ?
                    <>
                            <Button
                                radius="md"
                                size={'md'}
                                style={{
                                    backgroundColor: '#f4b940',
                                    fontWeight: 400
                                }}
                                onClick={() => {
                                    logOut()
                                        .then(() => navigate(LinkTo.AUTHORIZATION()));
                                }}
                            >
                                ВЫЙТИ
                            </Button>
                    </>
                    :
                    <></>
                }
                {/*<Flex>Биллинг</Flex>*/}
            </Flex>

            <Flex style={{position: 'relative'}}>
                <div style={{
                    height: 25,
                    width: '100%',
                    paddingLeft: 15,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    justifyContent: 'center',
                    display: 'flex',
                    fontSize: 30
                }}>
                    Библиотечная система
                </div>
            </Flex>
        </div>
    )
}

export default AppHeader;