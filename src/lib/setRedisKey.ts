import {ApiResponse} from "@/lib/types/ApiResponse";
import {redis} from "@/lib/redis";

export const setRedisKey = async (key: string, value: string): Promise<ApiResponse<string>> => {

    try {


        const response = await redis.set(key, value, {ex: 24*60*60});

        if(!response) {

            return {

                status: "error",
                errorMessage: "REDIS_KEY_NOT_SET",
                data: null
            }
        }

        return {

            status: "success",
            message: "REDIS_KEY_LIVE",
            data: response,
        }
    } catch {

        return {

            status: "error",
            errorMessage: "INTERNAL_SERVER_ERROR",
            data: null,
        }
    }
}