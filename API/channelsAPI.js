import { supabase } from "./indexApi.js";

export const getChannels = async () => {
  const { data, error } = await supabase
      .from("channels")
      .select("*");
  return { data, error };
};

export const isChannelExist = async (channelAlias) => {
  const { data, error } = await supabase
      .from("channels")
      .select("*")
      .eq("channel_alias", channelAlias);
  return { data, error };
};
