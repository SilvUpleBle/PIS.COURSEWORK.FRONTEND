import {Button, Container} from "@mantine/core";
import {logOut} from "../../service/AuthService.ts";
import {useNavigate} from "react-router-dom";
import {LinkTo} from "../../config/links.ts";

const AccessDenied = () => {
    const navigate = useNavigate();
    return (
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
                    onClick={() => navigate(LinkTo.CLIENTS())}
                >
                    НА ГЛАВНУЮ
                </Button>
            </Container>
            <Container>
                <Button
                    radius="md"
                    size={'lg'}
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
            </Container>
        </div>
    );
};

export default AccessDenied;