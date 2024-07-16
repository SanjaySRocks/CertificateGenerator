# Certificate Generator Rest API

A certificate generate rest api which takes name and generate certificate with unique id.

[![Docker Build](https://github.com/SanjaySRocks/CertificateGenerator/actions/workflows/docker-image.yml/badge.svg)](https://github.com/SanjaySRocks/CertificateGenerator/actions/workflows/docker-image.yml)

## Installation and Deployment

To deploy this project run

```bash
  npm install
```


```bash
  npm start
```

# Run in Docker
## To build image locally
``` docker build -t cgv2 . --no-cache```

## To run directly through uploaded docker image
``` docker run -d -p 3000:3000 cgv2 ```


# API Endpoints

The REST API to the example app is described below.

## To Create Certificate

### POST /generate/{name}

```
curl -i -H 'Accept: application/json' http://localhost:3000/generate

body:
{
  fullName: string
  phoneNo: numbers
  email: string
}
```
### Response

```json
{
    "status": "success",
    "CertificateDetails": {
        "fullName": "Sanjay Singh",
        "phoneNo": 232455123889213,
        "email": "sanjadsadasdasjgj@gmail.com",
        "_id": "65f88fda0a4a48b12f0d5744",
        "createdAt": "2024-03-18T19:02:50.308Z",
        "updatedAt": "2024-03-18T19:02:50.308Z",
        "__v": 0
    },
    "file": {
        "pdf": {
            "fileName": "65f88fda0a4a48b12f0d5744.pdf",
            "contentType": "application/pdf",
            "data": "QwY7bPSG57izCrys58hjqU9ZvMUOBysX02hBTvny3lfZYia..."
        }
    }
}
```
## Screenshots

![Certificate Screenshot](screenshot/65f9c49b23d98c2defdc550c.jpg?raw=true)


## Authors

- [@sanjaysrocks](https://www.github.com/sanjaysrocks)

## License

[MIT](https://choosealicense.com/licenses/mit/)

This is free to use license# Contribute

Feel free to contribute 
