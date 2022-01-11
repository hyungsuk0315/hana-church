export interface Stream {
  id: number;
  title: string;
  url: string;
  tag: string;
  preacher: string;
  thumbnailUrl: string;
  date: string;
}

export interface StreamList {
  playlistName: string;
  playlistId: string;
}

export interface Meta {
  totalCount: number;
}

export interface PlayListItem {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
  };
  contentDetails: {
    videoId: string;
    startAt: string;
    endAt: string;
    note: string;
  };
  status: {
    privacyStatus: string;
  };
}
export interface PlaylistItemListResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: PlayListItem[];
}

export interface Verse {
  index: number;
  title: string;
  content: string;
}

export interface Comment {
  notation: string;
  content: string;
}
export interface Chapter {
  // notation: string;
  // bookId: number;
  // chapter: number;
  verses: Verse[];
  comments: Comment[];
}

export interface Schedule {
  bookId: number;
  chapter: number;
}

export interface ChapterResponse {
  [chapterId: string]: Chapter;
}

export interface ScheduleResponse {
  [chapterId: string]: Schedule[];
}
