import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
import http from "http";
import https from "https";
import express from "express";
import cors from "cors";
import axios from "axios";
import pg from "pg";

const app = express();
app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
const API_KEY = "awMXFC3RsKaQ3nNjELoXXh9XFJbZMnTSrSw7IVzdJj0";

app.use(cors(corsOptions));

const db = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "Collections",
  password: "453963",
  port: 5432,
});

async function testDbConnection() {
  try {
    const client = await db.connect(); // Try to get a client from the pool
    console.log("Successfully connected to PostgreSQL!");
    client.release(); // Release the client back to the pool
    return true;
  } catch (err) {
    console.error("Error connecting to PostgreSQL:", err.message);
    return false;
  }
}

testDbConnection().then((isConnected) => {
  if (!isConnected) {
    console.log(
      "Database connection failed at startup. Application may not function correctly."
    );
    // You might want to exit the process or take other actions here
  }
});

const port = 5000;

app.get("/api/photo", async (req, res) => {
  const query = req.query.searchValue;
  const perPage = req.query.perPage;
  const Page = req.query.Page;
  console.log(Page);
  console.log(perPage);

  if (query) {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: query,
            client_id: API_KEY,
            per_page: perPage,
            page: Page,
          },
        }
      );
      const array = response.data.results;
      return res.status(200).json({
        photosArray: array,
      });
    } catch (error) {
      console.log("Error occurred while fetching photos:", error);
    }
  } else {
    console.log("No query received");
  }
});

app.get("/api/sugg/:query", async (req, res) => {
  const { query } = req.params;

  if (query) {
    try {
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=${query}`,
        {
          headers: {
            "User-Agent": "MyAutocompleteApp/1.0 (jasonreacher47@gmail.com)",
          },
          httpAgent: new http.Agent({ family: 4 }),
          httpsAgent: new https.Agent({ family: 4 }),
        }
      );

      const response2 = await axios.get(
        `https://suggestqueries.google.com/complete/search?client=chrome&q=${query}`
      );

      const arrayOfSugg1 = response.data[1].slice(1);
      const arrayOfSugg2 = response2.data[1];
      const arrayOfSugg3 = [...arrayOfSugg1, ...arrayOfSugg2];
      arrayOfSugg3.sort((a, b) => a.length - b.length);
      const arrayOfSugg = arrayOfSugg3.slice(0, 5);
      return res.status(200).json({
        suggArray: arrayOfSugg,
      });
    } catch (error) {
      console.log("Error occurred while fetching suggestions:", error);
    }
  } else {
    console.log("No query received");
  }
});

app.get("/api/image/:query", async (req, res) => {
  const { query } = req.params;
  console.log(query);

  if (query) {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/${query}`,
        {
          params: {
            client_id: API_KEY,
          },
        }
      );

      const array = response.data;
      return res.status(200).json({
        imgArray: array,
      });
    } catch (error) {
      console.log("Error fetching image details:", error);
    }
  } else {
    console.log("No query received for specific image");
  }
});

app.get("/api/coll/:imgId", async (req, res) => {
  var { imgId } = req.params;
  const diff = "_diff";
  var imgArr = "";

  if (imgId.endsWith(diff)) {
    imgId = imgId.slice(0, -5);
    console.log(imgId);

    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/${imgId}`,
        {
          params: {
            client_id: API_KEY,
          },
        }
      );

      imgArr = response.data;
    } catch (error) {
      console.error("Error getting image details:", error);
    }
  }

  try {
    const response = await db.query("SELECT * FROM coll");
    // console.log(response.rows);
    const array1 = response.rows;

    const response2 = await db.query(
      "SELECT coll_id, coll_name FROM photo_coll WHERE img_id = $1",
      [imgId]
    );
    // console.log(response.rows);
    const array2 = response2.rows;

    const array = array1.filter(
      (arr1item) => !array2.some((arr2item) => arr2item.coll_id === arr1item.id)
    );
    // console.log(array);
    if (imgArr === "") {
      return res.status(200).json({ collArray: array });
    } else {
      return res.status(200).json({ collArray: array, imgArray: imgArr });
    }
  } catch (error) {
    console.log("Error fetching collections:", error);
  }
});

app.get("/api/revcoll/:imgId", async (req, res) => {
  const { imgId } = req.params;
  try {
    const response2 = await db.query(
      "SELECT coll_id, coll_name FROM photo_coll WHERE img_id = $1",
      [imgId]
    );
    console.log(response2.rows);
    var array;

    if (response2.rows.length < 1) {
      array = "This image is not in any collection";
    } else {
      array = response2.rows;
    }
    // console.log(array);
    return res.status(200).json({ collArray: array });
  } catch (error) {
    console.log("Error fetching collections:", error);
  }
});

app.post("/api/imgcoll", async (req, res) => {
  const { collId, collName, imgId, imgUrl, imgH, imgW } = req.body;
  try {
    const response = await db.query(
      "INSERT INTO photo_coll (img_id, img_url, img_h, img_w, coll_id, coll_name) VALUES ($1, $2, $3, $4, $5, $6)",
      [imgId, imgUrl, imgH, imgW, collId, collName]
    );

    const response1 = await db.query("SELECT * FROM coll");
    const array1 = response1.rows;
    const response2 = await db.query(
      "SELECT coll_id, coll_name FROM photo_coll WHERE img_id = $1",
      [imgId]
    );
    // console.log(response.rows);
    const array2 = response2.rows;

    const array = array1.filter(
      (arr1item) => !array2.some((arr2item) => arr2item.coll_id === arr1item.id)
    );
    return res
      .status(200)
      .json({ collArray: array, message: "Succesfully added to collection" });
  } catch (error) {
    console.log("Error fetching collections:", error);
  }
});

app.post("/api/revimgcoll", async (req, res) => {
  const { collId, imgId } = req.body;
  try {
    const response = await db.query(
      "DELETE FROM photo_coll WHERE coll_id = $1 AND img_id = $2",
      [collId, imgId]
    );
    const response2 = await db.query(
      "SELECT coll_id, coll_name FROM photo_coll WHERE img_id = $1",
      [imgId]
    );
    // console.log(response.rows);
    var array;

    if (response2.rows.length < 0) {
      array = "This image is not in any collection";
    } else {
      array = response2.rows;
    }
    return res
      .status(200)
      .json({ collArray: array, message: "Succesfully added to collection" });
  } catch (error) {
    console.log("Error fetching collections:", error);
  }
});

app.get("/api/collname", async (req, res) => {
  try {
    const response = await db.query(
      "SELECT DISTINCT coll_id, coll_name FROM photo_coll"
    );
    console.log(response.rows);
    var array;

    if (response.rows.length < 0) {
      array = "No images has been added to any collection";
    } else {
      array = response.rows;
    }
    // console.log(array);
    return res.status(200).json({ collArray: array });
  } catch (error) {
    console.log("Error fetching collection names and ids:", error);
  }
});

app.get("/api/collimages/:colId", async (req, res) => {
  var { colId } = req.params;
  const diff = "_diff";

  if (colId.endsWith(diff)) {
    const colId1 = colId.slice(0, -5);
    colId = Number(colId1);
    console.log(colId);

    try {
      const response = await db.query(
        "SELECT * FROM photo_coll WHERE coll_id = $1 ORDER BY photocoll_id DESC",
        [colId]
      );
      console.log(response.rows);

      const array = response.rows;

      // console.log(array);
      return res.status(200).json({ collArray: array });
    } catch (error) {
      console.error("Error getting collection images:", error);
    }
  } else {
    try {
      const response = await db.query(
        "SELECT * FROM photo_coll WHERE coll_id = $1 ORDER BY photocoll_id DESC LIMIT 5",
        [colId]
      );
      console.log(response.rows);

      const array = response.rows;

      // console.log(array);
      return res.status(200).json({ collArray: array });
    } catch (error) {
      console.log("Error fetching collection images:", error);
    }
  }
});

app.get("/api/random", async (req, res) => {
  const count = 3;
  const topics = [
    "nature",
    "city",
    "objects",
    "abstract",
    "technology",
    "sport",
    "scene",
  ];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  try {
    const response = await axios.get(
      `https://api.datamuse.com/words?ml=${randomTopic}&max=${count}`
    );
    const array = response.data;
    console.log(array);
    return res.status(200).json({ ranArray: array });
  } catch (error) {
    console.log("Error fetching random words:", error);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
