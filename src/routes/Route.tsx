import {SendPhone} from "../services/SendPhone";
import {SendCode} from "../services/SendCode";
import {useRoutes} from "react-router-dom";
import TestPage from "../screenPages/TestPage";
import Main from "../screenPages/Main";
import Header from "../header/Header";
import React from "react";
import {ProtectedRoute} from "./ProtectedRoute";
import {Case} from "../screenPages/Case";
import {SubcategoryContent} from "../screenPages/Subcategories";
import Profile from "../screenPages/Profile";

export const CustomRoutes = () => {
    const RoutesScreens = useRoutes([
        {
            path: "/",
            element: (
                <Header>
                    <Main/>
                </Header>
            ),
        },
        {
            path: "/signup",
            element: (
                <Header>
                    <SendPhone onCodeSent={() => {
                    }}/>
                </Header>
            ),
        },
        {
            path: "/category/:slug",
            element: (
                <Header>
                    <Case/>
                </Header>
            )
        },
        {
            path: "/subcategory/:slug",
            element: (
                <>
                    <Header/>
                    <ProtectedRoute>
                        <SubcategoryContent/>
                    </ProtectedRoute>
                </>
            )
        },
        {
            path: "/login",
            element: (
                <Header>
                    <SendCode onLoginSuccess={() => {
                    }}/>
                </Header>
            ),
        },
        {
            path: "/test",
            element: (
                <>
                    <Header/>
                    <ProtectedRoute>
                        <TestPage/>
                    </ProtectedRoute>
                </>
            ),
        },
        {
          path: "/profile",
          element: (
              <>
                <Header />
                  <ProtectedRoute>
                      <Profile />
                  </ProtectedRoute>
              </>
          )  
        },
    ]);

    return RoutesScreens;
};
