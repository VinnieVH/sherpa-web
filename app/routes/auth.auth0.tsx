// app/routes/auth/auth0.tsx
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { authenticator } from "~/services/auth.server";

export let loader = () => redirect("/login");

export let action = ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate("auth0", request);
};
