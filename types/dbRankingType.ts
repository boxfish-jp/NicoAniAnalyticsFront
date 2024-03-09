type dbRankingJointType = {
  ch_title: string;
  ch_url: string;
  ch_LtstFree: number;
  ch_PrmFree: number;
  ch_thumb: string;
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

export type { dbRankingJointType };
