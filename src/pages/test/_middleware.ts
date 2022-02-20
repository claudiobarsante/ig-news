import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

export async function middleware(req, ev: NextFetchEvent) {
	// 'secret' should be the same 'process.env.SECRET' use in NextAuth function
	const session = await getToken({
		req: req,
		secret: process.env.NEXTAUTH_SECRET,
	});
	console.log('session in middleware: ', session);

	if (!session) return NextResponse.redirect('http://localhost:3000');

	return NextResponse.next();
}
