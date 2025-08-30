import { createClient } from "@supabase/supabase-js"

const supabaseURL = "https://ebzuumwltmmtlhwviust.supabase.co"
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVienV1bXdsdG1tdGxod3ZpdXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NDcyMzgsImV4cCI6MjA3MTAyMzIzOH0.kgNmPiLRKI5daSCep_ov3ow7hT81mwPgak7MOnfHM7E"


export const supabase = createClient(supabaseURL, apikey)