import ReactDOM from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import {router} from "./config/routes.tsx";
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import {Notifications} from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <MantineProvider>
            <Notifications position={'top-right'}/>
            <RouterProvider router={router}/>
        </MantineProvider>
    </QueryClientProvider>,
)
