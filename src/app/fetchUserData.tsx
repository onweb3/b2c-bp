'use client'

import { AppDispatch, RootState, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "@/redux/features/usersSlice";




const FetchUserData = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { jwtToken } = useAppSelector((state: RootState) => state.users);
    const { config } = useAppSelector((state) => state.initials)
    

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch(`${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/users/my-account`, {
                    next: { revalidate: 10 }, headers: {
                        authorization: `Bearer ${jwtToken}`,
                    },
                })

                dispatch(setUser({ user: await response.json(), jwtToken: jwtToken }));
            } catch (err: any) {
                console.log(err, "user-data");
            }
        }
        getUserData()

    }, [dispatch, config?.NEXT_PUBLIC_SERVER_URL])

    return <></>;

}

export default FetchUserData