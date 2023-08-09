const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "auth.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const authPackage = grpc.loadPackageDefinition(packageDefinition).authPackage;

const server = new grpc.Server();

server.addService(authPackage.Auth.service, {
  generateToken: (call, callback) => {
    console.log("Received generateToken request:", call.request);
    const tokenValue = `${call.request.username}-token`; // Simplified token generation
    callback(null, { value: tokenValue });
  },
});

const PORT = 50051;
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Error starting Auth Server:", err);
      return;
    }
    console.log(`Auth Server started, listening on port ${port}`);
    server.start();
  }
);
