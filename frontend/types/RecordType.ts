export type RecordType = {
  id: number;
  book_title: string;
  isbn: string;
  thumbnail_url?: string | null;
  date: string;
  first_page: number;
  final_page: number;
  impression: string;
  posted_at: string;
  user: number;
};

export type SubmissionRecordType = {
  book_title: string;
  isbn: string;
  date: string;
  first_page: string;
  final_page: string;
  impression: string;
}