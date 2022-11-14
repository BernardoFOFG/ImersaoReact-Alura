import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://annbbupcsuxgicyuyjnb.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFubmJidXBjc3V4Z2ljeXV5am5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NDk1MTEsImV4cCI6MTk4NDAyNTUxMX0._ns8knRRCD6q4Q8zt7-uEjGtkkylrtZOHQTkMMx-YLg";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video").select("*");
    },
  };
}
