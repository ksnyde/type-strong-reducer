import { Database } from "~/Database";
import { Table } from "~/Table";
import { mySong, Playlist, Song } from "./data";

describe("Trouble with iterables => ", () => {
  // response structure is as expected
  it("tables property is an array of objects", () => {
    const db = Database(Table(Song), Table(Playlist));
    expect(typeof db.tables).toBe("object");
    expect(typeof db.tables2).toBe("object");
    expect(Array.isArray(db.tableNames)).toBe(true);
  });

  it("tables is strongly typed with simple reducer", () => {
    const db = Database(Table(Song), Table(Playlist));
    const tables = db.tables;
    expect(typeof tables.Song).toBe("object");
    expect(tables.Song.is(mySong)).toBe(true);
    expect(tables.Playlist.is(mySong)).toBe(false);
  });

  it("tables2 is strongly typed with typed initial value", () => {
    const db = Database(Table(Song), Table(Playlist));
    const tables = db.tables2;
    expect(typeof tables.Song).toBe("object");
    expect(typeof tables.Song.is).toBe("function");
    expect(tables.Song.is(mySong)).toBe(true);
    expect(tables.Playlist.is(mySong)).toBe(false);
  });

  it("tables3 is strongly typed with typed generic", () => {
    const db = Database(Table(Song), Table(Playlist));
    const tables = db.tables3;
    expect(typeof tables.Song).toBe("object");
    expect(typeof tables.Song.is).toBe("function");
    expect(tables.Song.is(mySong)).toBe(true);
    expect(tables.Playlist.is(mySong)).toBe(false);
  });

  it("tables4 is strongly typed with typed generic an no default value", () => {
    const db = Database(Table(Song), Table(Playlist));
    const tables = db.tables4;
    expect(typeof tables.Song).toBe("object");
    expect(typeof tables.Song.is).toBe("function");
    expect(tables.Song.is(mySong)).toBe(true);
    expect(tables.Playlist.is(mySong)).toBe(false);
  });

  it("tables5 is strongly typed with IDatabase generic", () => {
    const db = Database(Table(Song), Table(Playlist));
    const tables = db.tables5;
    expect(typeof tables.Song).toBe("object");
    expect(typeof tables.Song.is).toBe("function");
    expect(tables.Song.is(mySong)).toBe(true);
    expect(tables.Playlist.is(mySong)).toBe(false);
  });
});
