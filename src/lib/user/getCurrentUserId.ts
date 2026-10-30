import {ApiResponse} from "@/lib/types/ApiResponse";
import {redis} from "@/lib/redis";
import {user} from "@/lib/types/ApiResponse"




export const getCurrentUserIdFromRedis = async (sessionId: string): Promise<ApiResponse<string>> => {

    try {

        const user = await redis.get<user>(sessionId)!;

        if(!user) {

            return {

                status: "error",
                errorMessage: "NO_REDIS_SESSION_FOUND!",
                data: null
            }
        }

        const userId = user.id;

        return {



            status: "success",
            message: "USER_SESSION_FOUND",
            data: userId
        }

    } catch {

        return {

            status: "error",
            errorMessage: "INTERNAL_SERVER_ERROR",
            data: null

        }
    }


}