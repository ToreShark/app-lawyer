import React from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from 'react-query';
import {BrowserRouter, Routes} from "react-router-dom";
import {CustomRoutes} from "./routes/Route";

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div>
                    <CustomRoutes />
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
