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
``` docker build -t cg . ```

## To run directly through uploaded docker image
``` docker run -d -p 3000:3000 sanjaysrocks/cg:v2 ```


# API Endpoints

The REST API to the example app is described below.

## To Create Certificate

### GET /generate/{name}

```
curl -i -H 'Accept: application/json' http://localhost:3000/generate/sanjaysingh
```
### Response

```json
{
    "status": "success",
    "message": "sanjaysingh",
    "certficateId": 1694541110,
    "certificateFile": "/download/GreenIndiaCert-1694541110.pdf"
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
