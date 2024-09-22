import { createClient } from "@supabase/supabase-js";
import { env } from "../../env";

const supabaseClient = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default supabaseClient;
