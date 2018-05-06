# REST API

## Swagger
[Swagger](https://swagger.io/) is a tool for API Development. All http endpoints are described in **swagger.yml** file. It's recommended to use [Swagger Editor](https://swagger.io/swagger-editor/) to edit and define REST API.

### Code
Swagger provide a way to generate documentation based on swagger.yml description file using [swagger-node-codegen](https://github.com/fmvilas/swagger-node-codegen). The following command generates files in **api/code** directory
```
npm run api:code
```

### Documentation
Using [spectacle-docs](https://sourcey.com/spectacle/) it's easy to generate documentation for given swagger.yml file. The following command generates files in **api/docs** directory
```
npm run api:docs
```
Documentation is available at http://localhost:4400

**Note:** To clean all generated API code and doc files just run `npm run api:clean`

## How to run system locally
After successful installation we need the following steps to run system locally:

1. In the local `./scripts` directory, copy the `env.template.sh` file and fill in the values
2. run the script, on OSX its source env.template.sh
2. Run `npm start`
3. Open web browser at http://localhost:3000

That's all.
