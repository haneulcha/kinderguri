const GOOGLE_AUTH_ENDPOINT = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENDPOINT ?? "";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ?? "";

const query = {
  client_id: GOOGLE_CLIENT_ID,
  redirect_uri: GOOGLE_REDIRECT_URI,
  scope: "openid profile email",
  response_type: "code",
};

export async function signIn() {
  const queryParams = new URLSearchParams(query);

  document.location.href = `${GOOGLE_AUTH_ENDPOINT}?${queryParams.toString()}`;
  //   window.open(`${GOOGLE_AUTH_ENDPOINT}?${queryParams.toString()}`);
}
