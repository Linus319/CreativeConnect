import { createBrowserClient } from '@supabase/ssr';

export function Supabase() {
  const SUPABASE_URL = 'https://skhxtmjbcfmytgqgdayj.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNraHh0bWpiY2ZteXRncWdkYXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyODc4ODksImV4cCI6MjA0NDg2Mzg4OX0.xtiyeanOVkSUYC5id8qG3eo3pJA3icrCSQA5yGUpbew';
  const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
  
  return supabase;
}
