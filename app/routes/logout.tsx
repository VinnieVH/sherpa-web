import type {LoaderFunctionArgs} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/services/session.server";

export let loader = async ({ request }: LoaderFunctionArgs) => {
    const session = await getSession(request.headers.get("Cookie"));
    const logoutURL = new URL(process.env.AUTH0_BASE_URL! + '/logout'); // i.e https://YOUR_TENANT.us.auth0.com/v2/logout

    logoutURL.searchParams.set("client_id", process.env.AUTH0_CLIENT_ID!);
    logoutURL.searchParams.set("returnTo", process.env.AUTH0_BASE_URL!);

    return redirect(logoutURL.toString(), {
        headers: {
            "Set-Cookie": await destroySession(session),
        },
    });
};