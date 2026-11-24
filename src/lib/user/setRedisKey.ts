import { ApiResponse } from "@/lib/types/ApiResponse";
import {redis} from "@/lib/redis";

export const setRedisKey = async (key: string, value: Record<string, unknown>): Promise<ApiResponse<number>> => {

    try {

        const pipeline = redis.pipeline();

        pipeline.hset(key, value);
        pipeline.expire(key, 24 * 60 * 60);

        const [fieldAdded] = await pipeline.exec<[number, number]>()

        if(typeof fieldAdded !== "number") {

            return {

                status: "error",
                errorMessage: "REDIS_KEY_NOT_SET",
                data: null
            }
        }

        return {

            status: "success",
            message: "REDIS_KEY_LIVE",
            data: fieldAdded,
        }
    } catch (error) {

        console.log(error);

        return {

            status: "error",
            errorMessage: "INTERNAL_SERVER_ERROR",
            data: null,
        }
    }
}
