import https from "https";

export default async function handler(req, res) {
  const path = req.query.path || "";

  const options = {
    hostname: "167.233.65.127",
    port: 443,
    path: `/sub/${path}`,
    method: "GET",
    headers: {
      Host: "origin.speedest.sbs"
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
