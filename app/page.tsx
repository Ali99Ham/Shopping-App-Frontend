export default function Home() {
  return <>Hello</>;
}

// Note: Next.js on the server side by default will not save any cookie received from api, we have to set it manually
// we can intercept the response in a server side and read the token
// but on the client side (browser), we will not get it even if we try to intercept the response
/// middleware is still able to read the cookie because it is executed on the server side
