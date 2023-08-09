# gRPC Communication Between Two Servers

This repository showcases a practical implementation of communication between two servers using gRPC, a powerful remote procedure call (RPC) framework.

## Overview

This project features two servers:

1. **Authentication Server**: This server generates authentication tokens based on user credentials.
2. **Resource Server**: This server requests authentication tokens from the Authentication Server and processes them.

Communication between these servers is established using the gRPC protocol.

## Prerequisites

Before getting started, ensure you have the following prerequisites installed:

- Node.js (version x.x.x)
- `@grpc/grpc-js` package
- `@grpc/proto-loader` package

## Usage

1. **Clone this repository**:

    ```sh
    git clone https://github.com/mohamedouf501/Node.JS-gRPC.git
    cd grpc-two-servers
    ```

2. **Install Dependencies**:

    ```sh
    npm install
    ```

3. **Run the Authentication Server**:

    ```sh
    node authServer.js
    ```

4. **Run the Resource Server**:

    ```sh
    node resourceServer.js
    ```

5. **Run the Client to Test Communication**:

    ```sh
    node client.js
    ```

## How It Works

1. The `auth.proto` file contains service definitions for both the Authentication Server and the Resource Server.
2. The Authentication Server listens for requests to generate authentication tokens.
3. The Resource Server sends a request to the Authentication Server to generate a token for user credentials.
4. The Authentication Server processes the request and generates a token.
5. The Authentication Server responds to the Resource Server with the generated token.
6. The Resource Server receives the token and processes it.

## Customization

Feel free to customize this example to match your use case. You can modify the `.proto` file to define additional services and messages or add more functionality to the servers.

## Credits

This example was created by [mohamed Ouf] and is shared for educational purposes. Feel free to expand on it and use it as a foundation for your own projects.

