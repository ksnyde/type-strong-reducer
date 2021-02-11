import { Database, Table } from "../src";
import { Playlist, Song } from "./data";

describe("Database wrapper works as expected", () => {
  it("Song and Playlist result in discriminated union", () => {
    const db = Database([Table(Song), Table(Playlist)]);

    expect(db.tables.Song.select("album")).toBe("this is just a test");
    expect(db.tables.Playlist.select("playlist")).toBe("this is just a test");
  });
});
