import { updateSession } from '@/utils/supabase/middleware';
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname == "/") {
		const url = request.nextUrl.clone();
	
		url.pathname = '/agendamento';
	
		return NextResponse.redirect(url);
	}

	return await updateSession(request);
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
}