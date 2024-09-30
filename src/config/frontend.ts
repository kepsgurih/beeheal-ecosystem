import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'
import ThirdPartyReact from 'supertokens-auth-react/recipe/thirdparty'
import SessionReact from 'supertokens-auth-react/recipe/session'
import { appInfo } from './appInfo'
import { useRouter } from "next/navigation";
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types'

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } =
  {};

export function setRouter(
  router: ReturnType<typeof useRouter>,
  pathName: string,
) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    getRedirectionURL: async (context) => {
      if (context.action === "SUCCESS" && context.newSessionCreated) {
        if (context.redirectToPath !== undefined) {
          // we are navigating back to where the user was before they authenticated
          return context.redirectToPath;
        }
        if (context.createdNewUser) {
          // user signed up
        } else {
          // user signed in
        }
        return "/dashboard";
      }
      return undefined;
    },
    recipeList: [
      ThirdPartyReact.init({
        signInAndUpFeature: {
          providers: [
            ThirdPartyReact.Google.init(),
            ThirdPartyReact.Facebook.init(),
            ThirdPartyReact.Github.init(),
            ThirdPartyReact.Apple.init(),
          ],
        },
      }),
      EmailPasswordReact.init(),
      SessionReact.init(),
    ],
    windowHandler: (original) => ({
      ...original,
      location: {
        ...original.location,
        getPathName: () => routerInfo.pathName!,
        assign: (url) => routerInfo.router!.push(url.toString()),
        setHref: (url) => routerInfo.router!.push(url.toString()),
      },
    }),
  }
}