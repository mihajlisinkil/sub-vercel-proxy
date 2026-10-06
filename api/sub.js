export default async function handler(req, res) {
  try {
    const path = req.query.path || "";
    const url = `https://origin.speedest.sbs/sub/${path}`;

    const response = await fetch(url);

    const body = await response.arrayBuffer();

    res.status(response.status);
    res.setHeader(
      "content-type",
      response.headers.get("content-type") || "text/plain"
    );

    res.send(Buffer.from(body));
  } catch (error) {
    res.status(500).send(error.message);
  }
}
