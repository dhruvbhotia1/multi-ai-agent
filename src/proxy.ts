import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getServerSession} from "@/lib/user/getServerSession";

export default async function proxy(request: NextRequest) {

    const session = await getServerSession();

    if(session.status === "error") {

        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: '/',
}