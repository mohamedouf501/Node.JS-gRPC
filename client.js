const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "auth.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const authPackage = grpc.loadPackageDefinition(packageDefinition).authPackage;

const client = new authPackage.Auth(
  "localhost:50052",
  grpc.credentials.createInsecure()
);

const credentials = {
  username: "user123",
  password: "pass456",
};

client.generateToken(credentials, (err, response) => {
  if (err) {
    console.error("Error from Resource Server:", err);
    return;
  }
  console.log("Received token from Resource Server:", response);
});
