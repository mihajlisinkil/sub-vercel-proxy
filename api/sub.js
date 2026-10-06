import https from "https";

export default async function handler(req, res) {
  const path = req.url.split("?")[0].replace(/^\/api\/sub/, "");

  const options = {
    hostname: "167.233.65.127",
    port: 443,
    path: `/sub${path}`,
    method: req.method,
    headers: {
      ...req.headers,
      host: "origin.speedest.sbs"
    },
    servername: "origin.speedest.sbs",
    rejectUnauthorized: false
  };

  const request = https.request(options, response => {
    res.status(response.statusCode);

    Object.entries(response.headers).forEach(([key, value]) => {
      if (value) res.setHeader(key, value);
    });

    response.pipe(res);
  });

  request.on("error", error => {
    res.status(502).send(error.message);
  });

  request.end();
}
