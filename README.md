# Certificate Generator Rest API

A certificate generate rest api which takes name and generate certificate with unique id.# REST API

The REST API to the example app is described below.

## Create Certificate

### Request

`GET /generate/:name`

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
## Installation and Deployment

To deploy this project run

```bash
  npm install
```


```bash
  npm start
```


## Screenshots

![Certificate Screenshot](https://github.com/SanjaySRocks/CertificateGenerator/blob/main/screenshot/GreenIndiaCert-1694541456.jpg?raw=true)


## Authors

- [@sanjaysrocks](https://www.github.com/sanjaysrocks)

## License

[MIT](https://choosealicense.com/licenses/mit/)

This is free to use license# Contribute

Feel free to contribute 
