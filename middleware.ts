import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from '@/utils/supabase/server';


export async function middleware(request: NextRequest) {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/sign-up', request.url));

  }
  
}

export const config = {
  matcher: ['/dashboard', '/profile']

}