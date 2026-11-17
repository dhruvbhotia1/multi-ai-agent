import {auth} from "@/lib/auth";
import {authClient} from "@/lib/authClient";


export type ApiResponse<T = unknown> = {

    status: "success";
    message: string;
    data: T,
} | {

    status: "error",
    errorMessage: string,
    data: null,
}

export type serverSession = typeof auth.$Infer.Session

export type clientSession = typeof authClient.$Infer.Session

export type user = typeof auth.$Infer.Session.user

