export default async function handler(req, res) {
  const path = req.url.replace(/^\/api\/sub/, "");
  const target = `https://origin.speedest.sbs/sub${path}`;

  const response = await fetch(target);

  res.status(response.status);

  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  const body = Buffer.from(await response.arrayBuffer());
  res.send(body);
}
