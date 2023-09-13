import dayjs from "dayjs";
import { supabase } from "./indexApi.js";

export const postParticipants = async (user) => {
  const { data, error } = await supabase
      .from("participants")
      .insert([
        {
          name: user.name,
          org_code: user.org_code,
          telegram_id: user.telegram_id,
          gender: user.gender,
        },
      ])
      .select();

  return { data, error };
};

//check if the user already registered within 1 week of current date
// eslint-disable-next-line camelcase
export const isAlreadyRegisteredInAWeek = async (telegram_id) => {
  /* eslint-disable new-cap */
  const currentDate = new dayjs();
  const sevenDaysAgo = currentDate.subtract(7, "day");

  const { data, error } = await supabase
      .from("participants")
      .select("*")
      .eq("telegram_id", telegram_id)
      .gt("created_at", sevenDaysAgo.toISOString());

  return { data, error };
};
