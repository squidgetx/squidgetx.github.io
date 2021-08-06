const { passphrase } = require("./config");
const { selectQuery, updateQuery, upsertQuery } = require("./dbUtils");

const authorization = (req, res, next) => {
  if (req.headers["authorization"]) {
    // single user simple auth scheme
    if (req.headers["authorization"] == passphrase) {
      return next();
    }
    return res.status(403).send({ error: "gtfo" });
  } else {
    return res.status(401).send({ error: "improper login header" });
  }
};

const recordVisit = () => {
  return (req, res, next) => {
    if (req.method != "GET") {
      next();
      return;
    }
    const pathArr = req.path.split("/");
    if (pathArr[1] == "index.html") {
      setVisit("");
    } else if (
      pathArr.length > 2 &&
      pathArr[pathArr.length - 1].split(".")[1] == "html"
    ) {
      setVisit("");
      setVisit(req.path);
    }
    next();
  };
};

const setVisit = (site) => {
  upsertQuery(
    "visits",
    {
      site: site,
      num_visits: 1,
      last_visited: new Date(),
    },
    {
      num_visits: "visits.num_visits + 1",
      last_visited: "current_timestamp",
    },
    { site }
  );
};

module.exports = {
  authorization,
  recordVisit,
};
