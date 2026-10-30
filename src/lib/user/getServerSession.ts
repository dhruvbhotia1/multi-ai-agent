import {ApiResponse, serverSession} from "@/lib/types/ApiResponse";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {cache} from "react";
import {setRedisKey} from "@/lib/setRedisKey";


export const getServerSession = cache(async (): Promise<ApiResponse<serverSession>> => {


    try {

        const data = await auth.api.getSession({
            headers: await headers()
        });

        if(!data) {

            return {
                status: "error",
                errorMessage: "NO_SESSION_FOUND",
                data: null
            }
        }

        await setRedisKey(data.session.id as string, JSON.stringify(data.user))

        return {

            status: "success",
            message: "VALID_SESSION_FOUND",
            data: data
        }


    } catch (error) {

        console.log(error); //REMOVE_THIS

        return {

            status: "error",
            errorMessage: "INTERNAL_SERVER_ERROR",
            data: null
        }


    }


})