import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest, response: NextResponse) {

    const rawUrl = request.url
    const codeOne = rawUrl.split('code=')[1];
    const code = decodeURIComponent(codeOne.split('&')[0]);

    try {
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          // @ts-ignore
          body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code',
          }),
          
        });
    
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const userInfo = await userInfoResponse.json();

        console.log(userInfo);
        
        const token = jwt.sign({ email: userInfo.email, username: userInfo.name }, `${process.env.JWT_SECRET}`, { expiresIn: "1min" });

        const cookieStore = await cookies();
        cookieStore.set("token", token);
        cookieStore.set("username", userInfo.name);

        return NextResponse.redirect(new URL('/admin', request.url));
        
    } catch (error) {
        return NextResponse.json({ erro: 'Erro ao autenticar com o Google' }, { status: 400 });
      }

}


