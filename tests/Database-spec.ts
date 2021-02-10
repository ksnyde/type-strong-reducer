import { arrayToObject } from "~/arrayToObject";
import { Table } from "~/Table";
import { mySong, Playlist, Song } from "./data";

describe("arrayToObject => ", () => {
  it("array of relatively simple name/value objects with different types for 'value'", () => {
    const foo = { name: "foo", value: 123 } as const;
    const bar = { name: "bar", value: "bar" } as const;
    const baz = { name: "baz", value: new Date() } as const;

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

  it("differently named objects with conflicting type definition ", () => {
    const foo = { name: "foo", select: "select" } as const;

    const arr = [foo, Table(Song), Table(Playlist)];
    const result = arrayToObject(arr);

    expect(result.foo.name).toBe("foo");
    expect(result.Song.name).toBe("Song");
    expect(result.Playlist.name).toBe("Playlist");

    expect(typeof result.foo.select).toBe("string");
    expect(typeof result.Song.select).toBe("function");
  });

  it("Table originated objects work too", () => {
    const foo = { name: "foo", value: 123 } as const;
    const song = Table(Song);

    const arr = [foo, song];
    const result = arrayToObject(arr);

    expect(result.Song.name).toBe("Song"); // "Song" is allowed but not strongly typed
    expect(result.Nonsense).toBe(undefined); // result is not strongly typed, allows any string
  });

  it("io-ts type guards retain full type fidelity", () => {
    const song = Table(Song);
    const playlist = Table(Playlist);

    const arr = [song, playlist];
    const result = arrayToObject(arr);

    expect(result.Song.is(mySong)).toBe(true);
    expect(result.Song.is({ id: "not-a-song" })).toBe(false);
  });

  it("type info in generics", () => {
    const song = Table(Song);
    const playlist = Table(Playlist);

    // here we can see the type inference working
    expect(song.select("artist")).toBe("this is just a test");

    const arr = [song, playlist];
    const result = arrayToObject(arr);

    expect(result.Song.name).toBe("Song");

    // type inference fails to provide non-io-ts properties
    // though hovering over result suggests that this is because
    // result has becoming a Union instead of a discriminated union
    expect(result.Song.select("artist")).toBe("this is just a test");
  });
});
