type dbRankingJointType = {
  ch_title: string;
  ch_url: string;
  ch_LtstFree: number;
  ch_PrmFree: number;
  ch_thumb: string;
  current_ranking_id: number;
  current_ch_id: number;
  current_raddtime: Date;
  current_r_current_seq: number;
  current_r_total_view: number;
  current_r_total_comment: number;
  current_r_total_mylist: number;
  current_r_ave_view: number;
  current_r_ave_comment: number;
  current_r_ave_mylist: number;
  current_r_ave_view_rank: number;
  current_r_ave_comment_rank: number;
  current_r_ave_mylist_rank: number;
  current_r_diff_view: number;
  current_r_diff_comment: number;
  current_r_diff_mylist: number;
  previous_ranking_id: number;
  previous_raddtime: Date;
  previous_ch_id: number;
  previous_r_ave_view_rank: number;
  previous_r_ave_comment_rank: number;
  previous_r_ave_mylist_rank: number;
  syear: number;
  sseason: number;
};

type dbRankingType = {
  ranking_id: number;
  ch_id: number;
  raddtime: Date;
  r_current_seq: number;
  r_total_view: number;
  r_total_comment: number;
  r_total_mylist: number;
  r_ave_view: number;
  r_ave_comment: number;
  r_ave_mylist: number;
  r_ave_view_rank: number;
  r_ave_comment_rank: number;
  r_ave_mylist_rank: number;
  r_diff_view: number;
  r_diff_comment: number;
  r_diff_mylist: number;
};

export type { dbRankingJointType, dbRankingType };
