import React, {useCallback, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {useJwt} from "react-jwt";

type Props = {
    children: React.ReactNode
}
export const PrivateRoute = ({children}:Props)=>{
    const [accessToken, setAccessToken] =useState(localStorage.getItem("access_token"))
    const [refreshToken, setRefreshToken]=useState( localStorage.getItem("refresh_token"))
    const {  isExpired: isAccessTokenExpired , } = useJwt(accessToken || "");
    const {isExpired: isRefreshTokenExpired} = useJwt(refreshToken || "")

    const onRefreshToken = useCallback( () => {
        fetch('https://icebrg.mehanik.me/api/login/refresh', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                access_token: accessToken,
                refresh_token: refreshToken
            })
        }).then((res)=> res.json()).then((res)=> {
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('refresh_token', res.refresh_token);
            setAccessToken(res.access_token);
            setRefreshToken(res.refresh_token);
        })
    },[accessToken, refreshToken])

    useEffect(()=>{
        if(isAccessTokenExpired && !isRefreshTokenExpired){
            onRefreshToken()
        }
    }, [isAccessTokenExpired, isRefreshTokenExpired, onRefreshToken])

    if( isRefreshTokenExpired){
        return <Navigate to={"/login"}  />
    }

    return <>{children}</>

}