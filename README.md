# mentions-api



### API URL
https://mentions-be.herokuapp.com/graphql

### Example Query
```
{
  records(message: "https://www.google.com @CHRIS4 @bob @john (success) ! Olympics are starting soon; https://www.nbcolympics.com such a cool feature") {
    mentions
    emoticons
    links {
      url
      title
    }
  }
}

```

Query Response
```

{
  "data": {
    "records": {
      "mentions": [
        "CHRIS4",
        "bob",
        "john"
      ],
      "emoticons": [
        "success"
      ],
      "links": [
        {
          "url": "https://www.google.com",
          "title": "Google"
        },
        {
          "url": "https://www.nbcolympics.com",
          "title": "Paris 2024 Olympic Games | NBC Olympics"
        }
      ]
    }
  }
}

```
