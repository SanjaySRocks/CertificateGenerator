# Certificate Generator Rest API

A certificate generate rest api which takes name and generate certificate with unique id.
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
            "data": "QwY7bPSG57izCrys58hjqU9ZvMUOBysX02hBTvny3lfZYia+qlq58cVavLJ5kocgSCrylS8wMGRcbK5srYfGdwsbx2627ZB2YuTJFbX3+3znn/XrnL5fyo+gIRBWVPfdRIlMOc5dNCkRX6Kfi0SVw2OCyf2FK39FDtu0Fn/ZhvE7NL7i6B1yS2ubwtQBfzD2tUgNHkaOXc5YDNL+rl9RAf6+pmgNmbqo0BuHVYllVL6f022F4ur5ftjD8d2L7eXHdvnnZHk7vBdEMvRS9Bp4DsKpQS3SC7oVPr/W6vsBCerNw1dKMJitLmGlrtCrCvQdsi7cuf0rv6RwclMgmHy77y3KbM6zlOHqZ3V/vCGU7ase+N92fz8XaTcLYY+/55b1aKse+m92fl2PfW+..."
        }
    }
}
```
## Screenshots

![Certificate Screenshot](screenshot/GreenIndiaCert-1694541456.jpg?raw=true)


## Authors

- [@sanjaysrocks](https://www.github.com/sanjaysrocks)

## License

[MIT](https://choosealicense.com/licenses/mit/)

This is free to use license# Contribute

Feel free to contribute 
