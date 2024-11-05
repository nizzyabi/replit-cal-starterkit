export const stripCalOAuthClientIdFromText = (str: string) => {
  if (!str) return str;
  if (!process.env.NEXT_PUBLIC_CAL_OAUTH_CLIENT_ID) return str;

  const split = str.split(`-${process.env.NEXT_PUBLIC_CAL_OAUTH_CLIENT_ID}`);
  return split?.[0] ? split[0].replace(".", " ") : str;
};

export const stripCalOAuthClientIdFromEmail = (str: string) => {
  if (!str) return str;
  if (!process.env.NEXT_PUBLIC_CAL_OAUTH_CLIENT_ID) return str;

  return str.replace(`+${process.env.NEXT_PUBLIC_CAL_OAUTH_CLIENT_ID}`, "");
};

export const isCalSandbox = 
  process.env.NEXT_PUBLIC_CAL_OAUTH_CLIENT_ID === "cm26pj93b0009p21m9iv96zuf" &&
  process.env.NEXT_PUBLIC_CAL_API_URL === "https://api.cal.dev/v2";