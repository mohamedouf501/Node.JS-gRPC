const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "auth.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const authPackage = grpc.loadPackageDefinition(packageDefinition).authPackage;

const client = new authPackage.Auth(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const server = new grpc.Server();

server.addService(authPackage.Auth.service, {
  generateToken: (call, callback) => {
    console.log(
      "Received generateToken request on Resource Server:",
      call.request
    );
    // Pass the request to the Authentication Server for token generation
    client.generateToken(call.request, (err, response) => {
      if (err) {
        console.error("Error from Auth Server:", err);
        callback(err);
        return;
      }
      console.log("Received token from Auth Server:", response);
      callback(null, response);
    });
  },
});

const PORT = 50052;
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Error starting Resource Server:", err);
      return;
    }
    console.log(`Resource Server started, listening on port ${port}`);
    server.start();
  }
);
