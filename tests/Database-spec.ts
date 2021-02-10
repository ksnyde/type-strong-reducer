import { arrayToObject } from "~/arrayToObject";
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

describe("arrayToObject => ", () => {
  it("array of relatively simple name/value objects with different types for 'value'", () => {
    const foo = { name: "foo", value: 123 };
    const bar = { name: "bar", value: "bar" };
    const baz = { name: "baz", value: new Date() };

    const arr = [foo, bar, baz];
    const result = arrayToObject(arr);

    expect(typeof result).toBe("object");

    expect(typeof result.foo).toBe("object");
    expect(typeof result.foo.value).toBe("number");
    expect(result.foo.value.toFixed(2)).toBe(foo.value.toFixed(2));

    expect(typeof result.bar).toBe("object");
    expect(typeof result.bar.value).toBe("string");
    expect(result.bar.name).toBe("bar");
    expect(result.bar.value.toUpperCase()).toBe(bar.value.toUpperCase());
  });

  it("array of objects which carry type info in generics", () => {
    const song = Table(Song);
    const playlist = Table(Playlist);

    // here we can see the type inference working
    expect(song.select("artist")).toBe("this is just a test");

    const arr = [song, playlist];
    const result = arrayToObject(arr);

    expect(result.Song.name).toBe("Song");
    // type guards of the given type are preserved
    // due to `io-ts` run-time def
    expect(result.Song.is(mySong)).toBe(true);
    expect(result.Song.is({ id: "not-a-song" })).toBe(false);

    // type inference fails to provide non-io-ts properties
    expect(result.Song.select("artist")).toBe("this is just a test");
  });
});
