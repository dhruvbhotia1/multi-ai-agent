"use server"
import {ApiResponse} from "@/lib/types/ApiResponse";
import {redis} from "@/lib/redis";

export const deleteRedisKey = async (sessionKey: string): Promise<ApiResponse<boolean>> => {

    try {

        console.log(sessionKey);

        await redis.del(sessionKey);


        return {

            status: "success",
            message: "SUCCESSFULLY_SIGNED_OUT",
            data: true
        }
    } catch {

        return {

            status: "error",
            errorMessage: "INTERNAL_SERVER_ERROR",
            data: false
        }
    }




}