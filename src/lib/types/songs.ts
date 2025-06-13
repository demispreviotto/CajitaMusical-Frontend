export interface Song {
    id: number;
    title: string;
    artist: string;
    // ... other song fields
}
export interface Playlist {
    id: number;
    name: string;
    songs: Song[];
}