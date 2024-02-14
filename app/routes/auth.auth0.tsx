// app/routes/auth/auth0.tsx
import {ActionFunctionArgs, redirect} from "@remix-run/node";

import { authenticator } from "~/services/auth.server";

export let loader = () => redirect("/login");

export let action = ({ request }: ActionFunctionArgs) => {
    return authenticator.authenticate("auth0", request);
};