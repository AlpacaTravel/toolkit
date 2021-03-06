import nock from "nock";
import * as embed from "../../../src/window/embed";

test("default export", () => {
  expect(embed);
  expect(typeof embed.attach).toBe("function");
  expect(typeof embed.obtainIFrameElement).toBe("function");
});

test("obtainIFrameElement() calls oembed", () => {
  nock("https://embed.alpacamaps.com:443", { encodedQueryParams: true })
    .get("/oembed")
    .query({
      url: "https%3A%2F%2Fembed.alpacamaps.com%2Fexample",
    })
    .reply(200, { html: "<iframe />" }, [
      "Access-Control-Allow-Origin",
      "*",
      "Content-Type",
      "application/json; charset=utf-8",
    ]);

  const url = "https://embed.alpacamaps.com/example";
  const options = {};
  return new Promise((done) => {
    embed.obtainIFrameElement(url, options).then((element) => {
      expect(element);
      done();
    });
  });
});
