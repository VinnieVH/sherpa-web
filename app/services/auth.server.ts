import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { User } from "~/services/User";
import {Auth0Profile, Auth0Strategy} from "remix-auth-auth0";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<Auth0Profile>(sessionStorage);

console.log(process.env.AUTH0_BASE_URL);

let auth0Strategy = new Auth0Strategy(
{
    callbackURL: process.env.AUTH0_BASE_URL + "/auth/auth0/callback",
    clientID: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    domain: process.env.AUTH0_ISSUER_BASE_URL!
}, async ({refreshToken, extraParams, profile}) => 
    {
        return profile;
    }
);

authenticator.use(auth0Strategy);